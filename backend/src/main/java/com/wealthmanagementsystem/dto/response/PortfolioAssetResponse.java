package com.wealthmanagementsystem.dto.response;

import com.wealthmanagementsystem.entity.AssetType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * Response DTO for PortfolioAsset entity.
 * 
 * Used for REST API response body mapping.
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 5.5
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioAssetResponse {
    
    private Long id;
    
    private Long assetId;
    
    private String assetName;
    
    private AssetType assetType;
    
    private String assetCode;
    
    private BigDecimal allocationPercentage;
    
    private BigDecimal currentPrice;
}