package com.wealthmanagementsystem.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * Request DTO for portfolio asset allocation.
 * 
 * Used for REST API request body mapping when creating/updating portfolio allocations.
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 5.5
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioAssetRequest {
    
    @NotNull(message = "Asset ID is required")
    private Long assetId;
    
    @NotNull(message = "Allocation percentage is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Allocation percentage must be >= 0")
    @DecimalMax(value = "100.0", inclusive = true, message = "Allocation percentage must be <= 100")
    private BigDecimal allocationPercentage;
}