package com.wealthmanagementsystem.dto.request;

import com.wealthmanagementsystem.entity.GoalCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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
    
    @NotNull(message = "User ID is required")
    private Long userId;
    
    @NotBlank(message = "Goal name is required")
    private String goalName;
    
    @NotNull(message = "Target amount is required")
    @Positive(message = "Target amount must be positive")
    private BigDecimal targetAmount;
    
    @NotNull(message = "Target date is required")
    private LocalDate targetDate;
    
    @NotNull(message = "Category is required")
    private GoalCategory category;
    
    private BigDecimal currentSavings;
    
    private BigDecimal monthlyContribution;
}
