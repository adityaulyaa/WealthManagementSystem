package com.wealthmanagementsystem.dto.request;

import com.wealthmanagementsystem.entity.RiskLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request DTO for creating/updating Portfolio.
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
public class PortfolioRequest {
    
    private Long userId;
    
    private String portfolioName;
    
    private String portfolioType;
    
    private RiskLevel riskLevel;
}
