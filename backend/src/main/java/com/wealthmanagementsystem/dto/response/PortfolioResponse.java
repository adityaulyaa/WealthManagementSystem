package com.wealthmanagementsystem.dto.response;

import com.wealthmanagementsystem.entity.RiskLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Response DTO for Portfolio entity.
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
public class PortfolioResponse {
    
    private Long id;
    
    private Long userId;
    
    private String portfolioName;
    
    private String portfolioType;
    
    private RiskLevel riskLevel;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}
