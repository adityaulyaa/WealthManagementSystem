package com.wealthmanagementsystem.entity;

/**
 * Enum representing categories of financial goals.
 * 
 * Used in FinancialGoal entity to classify user's financial objectives.
 * 
 * Stored as VARCHAR in database via @Enumerated(EnumType.STRING)
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.2
 */
public enum GoalCategory {
    
    /**
     * Retirement savings goal
     * Long-term goal, typically 10+ years
     */
    RETIREMENT,
    
    /**
     * Education funding goal
     * Medium to long-term goal (e.g., college fund)
     */
    EDUCATION,
    
    /**
     * Property purchase goal
     * Medium-term goal (e.g., house down payment)
     */
    PROPERTY,
    
    /**
     * Emergency fund goal
     * Short-term, high-priority goal
     */
    EMERGENCY,
    
    /**
     * Other financial goals
     * Catch-all category for miscellaneous goals
     */
    OTHER
}
