package com.wealthmanagementsystem.service;

import com.wealthmanagementsystem.entity.FinancialGoal;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Service layer for generating financial goal insights.
 * 
 * Logic based on goal progress, remaining time, and contribution.
 */
@Service
public class InsightsService {

    /**
     * Generates a list of insights based on the goal's current progress and projection.
     */
    public List<String> generateInsights(FinancialGoal goal, long monthsRemaining, String status) {
        List<String> insights = new ArrayList<>();

        // Insight C: "Perlu menambah tabungan Rp X per bulan"
        if ("OFF_TRACK".equals(status) || "AT_RISK".equals(status)) {
            BigDecimal remainingAmount = goal.getTargetAmount().subtract(goal.getCurrentSavings());
            long monthsToTarget = java.time.temporal.ChronoUnit.MONTHS.between(java.time.LocalDate.now(), goal.getTargetDate());
            
            if (monthsToTarget > 0) {
                BigDecimal neededMonthly = remainingAmount.divide(BigDecimal.valueOf(monthsToTarget), java.math.RoundingMode.CEILING);
                BigDecimal additionalNeeded = neededMonthly.subtract(goal.getMonthlyContribution());
                
                if (additionalNeeded.compareTo(BigDecimal.ZERO) > 0) {
                    insights.add("Perlu menambah tabungan Rp " + additionalNeeded.setScale(0, java.math.RoundingMode.HALF_UP) + " per bulan untuk mencapai target tepat waktu.");
                }
            }
        }

        // Insight B: "Tabungan Anda terlalu kecil untuk mencapai target"
        if ("OFF_TRACK".equals(status)) {
            insights.add("Tabungan Anda saat ini terlalu kecil untuk mencapai target pada tanggal yang ditentukan.");
        }

        // Insight A: "Target dapat tercapai dalam X bulan"
        if ("ON_TRACK".equals(status) && monthsRemaining > 0) {
            insights.add("Target dapat tercapai dalam " + monthsRemaining + " bulan dengan tingkat tabungan saat ini.");
        } else if ("COMPLETED".equals(status)) {
            insights.add("Selamat! Anda sudah mencapai target keuangan ini.");
        }

        return insights;
    }
}
