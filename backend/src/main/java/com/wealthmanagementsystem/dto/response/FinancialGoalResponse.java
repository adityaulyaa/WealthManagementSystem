package com.wealthmanagementsystem.dto.response;

import com.wealthmanagementsystem.entity.GoalCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Response DTO for FinancialGoal entity.
 * 
 * Flat structure - uses userId instead of nested User object
 * Used for REST API response body mapping.
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.6
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinancialGoalResponse {
    
    private Long id;
    
    private Long userId;
    
    private String goalName;
    
    private BigDecimal targetAmount;
    
    private LocalDate targetDate;
    
    private GoalCategory category;
    
    private BigDecimal currentSavings;
    
    private BigDecimal monthlyContribution;
    
    private BigDecimal progressPercentage;
    
    private Long monthsRemaining;
    
    private String status;
    
    private List<String> insights;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}
