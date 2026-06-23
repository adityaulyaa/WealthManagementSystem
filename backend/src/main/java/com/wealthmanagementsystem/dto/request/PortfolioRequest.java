package com.wealthmanagementsystem.dto.request;

import com.wealthmanagementsystem.entity.RiskLevel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
    
    @NotNull(message = "User ID is required")
    private Long userId;
    
    @NotBlank(message = "Portfolio name is required")
    private String portfolioName;
    
    @NotBlank(message = "Portfolio type is required")
    private String portfolioType;
    
    @NotNull(message = "Risk level is required")
    private RiskLevel riskLevel;
}
