package com.wealthmanagementsystem.service;

import com.wealthmanagementsystem.entity.FinancialGoal;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

class InsightsServiceTest {

    private final InsightsService insightsService = new InsightsService();

    @Test
    @DisplayName("Generate insights - On Track")
    void testGenerateInsights_OnTrack() {
        FinancialGoal goal = new FinancialGoal();
        goal.setTargetAmount(new BigDecimal("1000"));
        goal.setCurrentSavings(new BigDecimal("500"));
        goal.setMonthlyContribution(new BigDecimal("100"));
        goal.setTargetDate(LocalDate.now().plusMonths(10));

        List<String> insights = insightsService.generateInsights(goal, 5, "ON_TRACK");

        assertEquals(1, insights.size());
        assertTrue(insights.get(0).contains("Target dapat tercapai dalam 5 bulan"));
    }

    @Test
    @DisplayName("Generate insights - Off Track (Insufficient Savings)")
    void testGenerateInsights_OffTrack() {
        FinancialGoal goal = new FinancialGoal();
        goal.setTargetAmount(new BigDecimal("1000"));
        goal.setCurrentSavings(new BigDecimal("100"));
        goal.setMonthlyContribution(new BigDecimal("50"));
        goal.setTargetDate(LocalDate.now().plusMonths(2)); // Goal in 2 months

        List<String> insights = insightsService.generateInsights(goal, 18, "OFF_TRACK");

        // Should have "Perlu menambah" and "Tabungan Anda terlalu kecil"
        assertEquals(2, insights.size());
        assertTrue(insights.get(0).contains("Perlu menambah tabungan"));
        assertTrue(insights.get(1).contains("Tabungan Anda saat ini terlalu kecil"));
    }

    @Test
    @DisplayName("Generate insights - Completed")
    void testGenerateInsights_Completed() {
        FinancialGoal goal = new FinancialGoal();
        
        List<String> insights = insightsService.generateInsights(goal, 0, "COMPLETED");

        assertEquals(1, insights.size());
        assertTrue(insights.get(0).contains("Selamat!"));
    }
}
