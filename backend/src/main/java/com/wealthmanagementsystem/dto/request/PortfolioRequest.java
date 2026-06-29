package com.wealthmanagementsystem.dto.request;

import com.wealthmanagementsystem.entity.RiskLevel;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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
    
    @Valid // Enable validation for nested objects
    @Size(min = 1, message = "At least one asset allocation is required")
    private List<PortfolioAssetRequest> assets;
}
