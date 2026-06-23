package com.wealthmanagementsystem.dto.request;

import com.wealthmanagementsystem.entity.GoalCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Request DTO for creating/updating FinancialGoal.
 * 
 * Flat structure - uses userId instead of nested User object
 * Used for REST API request body mapping.
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.6
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinancialGoalRequest {
    
    private Long userId;
    
    private String goalName;
    
    private BigDecimal targetAmount;
    
    private LocalDate targetDate;
    
    private GoalCategory category;
    
    private BigDecimal currentSavings;
    
    private BigDecimal monthlyContribution;
}
