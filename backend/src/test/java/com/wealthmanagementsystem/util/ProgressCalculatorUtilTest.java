package com.wealthmanagementsystem.util;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import java.math.BigDecimal;
import java.time.LocalDate;
import static org.junit.jupiter.api.Assertions.*;

class ProgressCalculatorUtilTest {

    @Test
    @DisplayName("Calculate progress percentage - basic scenarios")
    void testCalculateProgressPercentage_basic() {
        assertEquals(new BigDecimal("50.00"), ProgressCalculatorUtil.calculateProgressPercentage(new BigDecimal("50"), new BigDecimal("100")));
        assertEquals(new BigDecimal("0.00"), ProgressCalculatorUtil.calculateProgressPercentage(new BigDecimal("0"), new BigDecimal("100")));
        assertEquals(new BigDecimal("100.00"), ProgressCalculatorUtil.calculateProgressPercentage(new BigDecimal("100"), new BigDecimal("100")));
        assertEquals(new BigDecimal("120.00"), ProgressCalculatorUtil.calculateProgressPercentage(new BigDecimal("120"), new BigDecimal("100")));
    }

    @Test
    @DisplayName("Calculate progress percentage - edge cases")
    void testCalculateProgressPercentage_edgeCases() {
        assertEquals(BigDecimal.ZERO.setScale(2), ProgressCalculatorUtil.calculateProgressPercentage(new BigDecimal("100"), BigDecimal.ZERO));
        assertEquals(BigDecimal.ZERO.setScale(2), ProgressCalculatorUtil.calculateProgressPercentage(new BigDecimal("100"), null));
        assertEquals(BigDecimal.ZERO.setScale(2), ProgressCalculatorUtil.calculateProgressPercentage(null, new BigDecimal("100")));
        assertEquals(new BigDecimal("33.33"), ProgressCalculatorUtil.calculateProgressPercentage(new BigDecimal("10"), new BigDecimal("30")));
        assertEquals(new BigDecimal("66.67"), ProgressCalculatorUtil.calculateProgressPercentage(new BigDecimal("20"), new BigDecimal("30")));
    }

    @Test
    @DisplayName("Calculate months remaining - basic scenarios")
    void testCalculateMonthsRemaining_basic() {
        // Goal not met, positive contribution
        assertEquals(5, ProgressCalculatorUtil.calculateMonthsRemaining(new BigDecimal("50"), new BigDecimal("100"), new BigDecimal("10")));
        // Goal already met
        assertEquals(0, ProgressCalculatorUtil.calculateMonthsRemaining(new BigDecimal("100"), new BigDecimal("100"), new BigDecimal("10")));
        assertEquals(0, ProgressCalculatorUtil.calculateMonthsRemaining(new BigDecimal("120"), new BigDecimal("100"), new BigDecimal("10")));
        // Remaining amount exactly divisible
        assertEquals(10, ProgressCalculatorUtil.calculateMonthsRemaining(BigDecimal.ZERO, new BigDecimal("100"), new BigDecimal("10")));
        // Remaining amount not exactly divisible, should round up
        assertEquals(10, ProgressCalculatorUtil.calculateMonthsRemaining(BigDecimal.ZERO, new BigDecimal("95"), new BigDecimal("10")));
    }

    @Test
    @DisplayName("Calculate months remaining - edge cases")
    void testCalculateMonthsRemaining_edgeCases() {
        // Zero or negative monthly contribution, goal not met
        assertEquals(-1, ProgressCalculatorUtil.calculateMonthsRemaining(BigDecimal.ZERO, new BigDecimal("100"), BigDecimal.ZERO));
        assertEquals(-1, ProgressCalculatorUtil.calculateMonthsRemaining(BigDecimal.ZERO, new BigDecimal("100"), new BigDecimal("-10")));
        // Null contributions
        assertEquals(-1, ProgressCalculatorUtil.calculateMonthsRemaining(BigDecimal.ZERO, new BigDecimal("100"), null));
        // Null target amount
        assertEquals(0, ProgressCalculatorUtil.calculateMonthsRemaining(new BigDecimal("50"), null, new BigDecimal("10")));
        // Null current savings
        assertEquals(10, ProgressCalculatorUtil.calculateMonthsRemaining(null, new BigDecimal("100"), new BigDecimal("10")));
    }

    @Test
    @DisplayName("Determine goal status - on track, at risk, off track, completed")
    void testDetermineGoalStatus() {
        LocalDate today = LocalDate.now();

        // COMPLETED
        assertEquals("COMPLETED", ProgressCalculatorUtil.determineGoalStatus(today.plusMonths(5), 0));

        // ON_TRACK - target in 6 months, need 5 months
        assertEquals("ON_TRACK", ProgressCalculatorUtil.determineGoalStatus(today.plusMonths(6), 5));
        // ON_TRACK - target in 1 month, need 1 month (considering current month)
        assertEquals("ON_TRACK", ProgressCalculatorUtil.determineGoalStatus(today.plusMonths(1), 1));
        // ON_TRACK - target in 0 months (today), need 0 months
        assertEquals("ON_TRACK", ProgressCalculatorUtil.determineGoalStatus(today, 0)); // Actually implies completed if 0 months remaining

        // AT_RISK - target in 6 months, need 7 months (within 3 months buffer)
        assertEquals("AT_RISK", ProgressCalculatorUtil.determineGoalStatus(today.plusMonths(6), 7));
        assertEquals("AT_RISK", ProgressCalculatorUtil.determineGoalStatus(today.plusMonths(6), 8));
        assertEquals("AT_RISK", ProgressCalculatorUtil.determineGoalStatus(today.plusMonths(6), 9));


        // OFF_TRACK - not achievable
        assertEquals("OFF_TRACK", ProgressCalculatorUtil.determineGoalStatus(today.plusMonths(5), -1));
        // OFF_TRACK - target date in past, goal not completed
        assertEquals("OFF_TRACK", ProgressCalculatorUtil.determineGoalStatus(today.minusMonths(1), 5));
        // OFF_TRACK - target in 6 months, need 10 months (outside 3 months buffer)
        assertEquals("OFF_TRACK", ProgressCalculatorUtil.determineGoalStatus(today.plusMonths(6), 10));

        // UNKNOWN - null target date
        assertEquals("UNKNOWN", ProgressCalculatorUtil.determineGoalStatus(null, 5));
    }
}
