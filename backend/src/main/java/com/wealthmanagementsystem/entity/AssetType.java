package com.wealthmanagementsystem.entity;

/**
 * Enum representing types of investment assets.
 * 
 * Used in Asset entity to categorize available investment options.
 * 
 * Stored as VARCHAR in database via @Enumerated(EnumType.STRING)
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.2
 */
public enum AssetType {
    
    /**
     * Individual stocks
     * Example: AAPL, GOOGL, MSFT
     */
    STOCK,
    
    /**
     * Bond securities
     * Example: Government bonds, corporate bonds
     */
    BOND,
    
    /**
     * Cash and money market instruments
     * Example: Savings account, money market fund
     */
    CASH,
    
    /**
     * Mutual funds
     * Example: Index funds, actively managed funds
     */
    MUTUAL_FUND,
    
    /**
     * Exchange-traded funds
     * Example: VOO (Vanguard S&P 500), SPY (SPDR S&P 500)
     */
    ETF
}
