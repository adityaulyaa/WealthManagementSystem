package com.wealthmanagementsystem.entity;

/**
 * Enum representing risk tolerance levels for users and portfolios.
 * 
 * Used in:
 * - RiskProfile: User's assessed risk tolerance
 * - Portfolio: Portfolio's risk classification
 * 
 * Mapping to database:
 * - Stored as VARCHAR in database via @Enumerated(EnumType.STRING)
 * - Values: 'LOW', 'MEDIUM', 'HIGH'
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.2
 */
public enum RiskLevel {
    
    /**
     * Low risk tolerance
     * - Conservative investment strategy
     * - Typical allocation: 70% bonds, 20% stocks, 10% cash
     * - Suitable for: Near-term goals, risk-averse investors
     */
    LOW,
    
    /**
     * Medium risk tolerance
     * - Balanced investment strategy
     * - Typical allocation: 50% stocks, 40% bonds, 10% cash
     * - Suitable for: Medium-term goals, moderate investors
     */
    MEDIUM,
    
    /**
     * High risk tolerance
     * - Aggressive investment strategy
     * - Typical allocation: 80% stocks, 15% bonds, 5% cash
     * - Suitable for: Long-term goals, growth-focused investors
     */
    HIGH
}
