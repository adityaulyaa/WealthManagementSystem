package com.wealthmanagementsystem.mapper;

import com.wealthmanagementsystem.dto.request.PortfolioAssetRequest;
import com.wealthmanagementsystem.dto.request.PortfolioRequest;
import com.wealthmanagementsystem.dto.response.PortfolioAssetResponse;
import com.wealthmanagementsystem.dto.response.PortfolioResponse;
import com.wealthmanagementsystem.entity.Asset;
import com.wealthmanagementsystem.entity.Portfolio;
import com.wealthmanagementsystem.entity.PortfolioAsset;
import com.wealthmanagementsystem.entity.User;
import com.wealthmanagementsystem.exception.ResourceNotFoundException;
import com.wealthmanagementsystem.repository.AssetRepository;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Mapper class for Portfolio entity and DTOs.
 * 
 * Implemented as a Spring Component to allow dependency injection (e.g., AssetRepository).
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.6 (Updated for Phase 5.5)
 */
@Component
public class PortfolioMapper {

    private final AssetRepository assetRepository;

    public PortfolioMapper(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    public Portfolio toEntity(PortfolioRequest request, User user) {
        if (request == null) {
            return null;
        }
        
        Portfolio portfolio = new Portfolio();
        portfolio.setUser(user);
        portfolio.setPortfolioName(request.getPortfolioName());
        portfolio.setPortfolioType(request.getPortfolioType());
        portfolio.setRiskLevel(request.getRiskLevel());
        
        // Map asset allocations
        if (request.getAssets() != null) {
            List<PortfolioAsset> assets = request.getAssets().stream().map(assetReq -> {
                Asset asset = assetRepository.findById(assetReq.getAssetId())
                        .orElseThrow(() -> new ResourceNotFoundException("Asset not found: " + assetReq.getAssetId()));
                
                PortfolioAsset pa = new PortfolioAsset();
                pa.setPortfolio(portfolio);
                pa.setAsset(asset);
                pa.setAllocationPercentage(assetReq.getAllocationPercentage());
                return pa;
            }).collect(Collectors.toList());
            
            portfolio.setAssets(assets);
        }
        
        return portfolio;
    }
    
    public PortfolioResponse toResponse(Portfolio portfolio) {
        if (portfolio == null) {
            return null;
        }
        
        PortfolioResponse response = new PortfolioResponse();
        response.setId(portfolio.getId());
        response.setUserId(portfolio.getUser() != null ? portfolio.getUser().getId() : null);
        response.setPortfolioName(portfolio.getPortfolioName());
        response.setPortfolioType(portfolio.getPortfolioType());
        response.setRiskLevel(portfolio.getRiskLevel());
        
        // Map asset allocations
        if (portfolio.getAssets() != null) {
            List<PortfolioAssetResponse> assetResponses = portfolio.getAssets().stream().map(pa -> {
                PortfolioAssetResponse ar = new PortfolioAssetResponse();
                ar.setId(pa.getId());
                ar.setAssetId(pa.getAsset().getId());
                ar.setAssetName(pa.getAsset().getAssetName());
                ar.setAssetType(pa.getAsset().getAssetType());
                ar.setAssetCode("TBD");
                ar.setAllocationPercentage(pa.getAllocationPercentage());
                ar.setCurrentPrice(pa.getAsset().getCurrentPrice());
                return ar;
            }).collect(Collectors.toList());
            
            response.setAssets(assetResponses);
        }
        
        response.setCreatedAt(portfolio.getCreatedAt());
        response.setUpdatedAt(portfolio.getUpdatedAt());
        
        return response;
    }
    
    public void updateEntity(Portfolio portfolio, PortfolioRequest request) {
        if (portfolio == null || request == null) {
            return;
        }
        
        if (request.getPortfolioName() != null) {
            portfolio.setPortfolioName(request.getPortfolioName());
        }
        if (request.getPortfolioType() != null) {
            portfolio.setPortfolioType(request.getPortfolioType());
        }
        if (request.getRiskLevel() != null) {
            portfolio.setRiskLevel(request.getRiskLevel());
        }
        
        // Update assets: clear and add new
        if (request.getAssets() != null) {
            portfolio.getAssets().clear();
            List<PortfolioAsset> newAssets = request.getAssets().stream().map(assetReq -> {
                Asset asset = assetRepository.findById(assetReq.getAssetId())
                        .orElseThrow(() -> new ResourceNotFoundException("Asset not found: " + assetReq.getAssetId()));
                
                PortfolioAsset pa = new PortfolioAsset();
                pa.setPortfolio(portfolio);
                pa.setAsset(asset);
                pa.setAllocationPercentage(assetReq.getAllocationPercentage());
                return pa;
            }).collect(Collectors.toList());
            portfolio.getAssets().addAll(newAssets);
        }
    }
}