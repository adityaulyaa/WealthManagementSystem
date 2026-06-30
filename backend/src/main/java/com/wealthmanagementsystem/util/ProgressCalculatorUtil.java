package com.wealthmanagementsystem.util;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class ProgressCalculatorUtil {

    private static final int DECIMAL_PLACES = 2;

    /**
     * Calculates the progress percentage of a financial goal.
     *
     * @param currentAmount The amount currently saved.
     * @param targetAmount The target amount for the goal.
     * @return The progress percentage (0-100), rounded to 2 decimal places. Returns 0 if targetAmount is 0.
     */
    public static BigDecimal calculateProgressPercentage(BigDecimal currentAmount, BigDecimal targetAmount) {
        if (targetAmount == null || targetAmount.compareTo(BigDecimal.ZERO) <= 0) {
            return BigDecimal.ZERO;
        }
        if (currentAmount == null) {
            currentAmount = BigDecimal.ZERO;
        }

        return currentAmount
                .divide(targetAmount, DECIMAL_PLACES + 2, RoundingMode.HALF_UP) // Divide with more precision first
                .multiply(BigDecimal.valueOf(100))
                .setScale(DECIMAL_PLACES, RoundingMode.HALF_UP); // Then set scale for final output
    }

    /**
     * Calculates the number of months remaining to reach the target amount.
     * If monthly contribution is zero or less, and target is not reached, returns -1 (indicating not achievable or infinite time).
     *
     * @param currentAmount The amount currently saved.
     * @param targetAmount The target amount for the goal.
     * @param monthlyContribution The amount contributed monthly.
     * @return The number of months remaining, rounded up to the nearest whole month. Returns 0 if goal is already met. Returns -1 if not achievable.
     */
    public static long calculateMonthsRemaining(BigDecimal currentAmount, BigDecimal targetAmount, BigDecimal monthlyContribution) {
        if (currentAmount == null) currentAmount = BigDecimal.ZERO;
        if (targetAmount == null) targetAmount = BigDecimal.ZERO;
        if (monthlyContribution == null) monthlyContribution = BigDecimal.ZERO;

        // If goal is already met or target amount is zero or less
        if (currentAmount.compareTo(targetAmount) >= 0 || targetAmount.compareTo(BigDecimal.ZERO) <= 0) {
            return 0;
        }

        BigDecimal remainingAmount = targetAmount.subtract(currentAmount);

        // If no monthly contribution or negative, and goal not met, it's not achievable
        if (monthlyContribution.compareTo(BigDecimal.ZERO) <= 0) {
            return -1;
        }

        BigDecimal months = remainingAmount.divide(monthlyContribution, RoundingMode.CEILING);
        return months.longValue();
    }

    /**
     * Determines the status of a financial goal based on the projected completion date versus the target date.
     *
     * @param targetDate The official target date for the goal.
     * @param monthsRemaining The calculated months remaining to achieve the goal.
     * @return A string indicating the status: "ON_TRACK", "AT_RISK", "OFF_TRACK", or "COMPLETED".
     */
    public static String determineGoalStatus(LocalDate targetDate, long monthsRemaining) {
        if (targetDate == null) {
            return "UNKNOWN"; // Should ideally not happen with proper validation
        }

        if (monthsRemaining == 0) {
            return "COMPLETED"; // Goal is already met
        }
        if (monthsRemaining == -1) {
            return "OFF_TRACK"; // Not achievable with current contribution
        }

        LocalDate now = LocalDate.now();
        long monthsToTargetDate = ChronoUnit.MONTHS.between(now, targetDate);

        // If target date is in the past, and goal not completed
        if (monthsToTargetDate < 0) {
            return "OFF_TRACK";
        }
        
        // Give a buffer of 1 month, considering current month as "in progress"
        // If projected completion is within target date + 1 month buffer, it's on track
        if (monthsRemaining <= monthsToTargetDate + 1) { // +1 for current month
            return "ON_TRACK";
        } else if (monthsRemaining <= monthsToTargetDate + 3) { // 3 month buffer for at risk
            return "AT_RISK";
        } else {
            return "OFF_TRACK";
        }
    }
}
