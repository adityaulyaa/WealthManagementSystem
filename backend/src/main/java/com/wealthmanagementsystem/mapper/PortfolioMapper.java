package com.wealthmanagementsystem.mapper;

import com.wealthmanagementsystem.dto.request.PortfolioRequest;
import com.wealthmanagementsystem.dto.response.PortfolioResponse;
import com.wealthmanagementsystem.entity.Portfolio;
import com.wealthmanagementsystem.entity.User;

/**
 * Mapper class for Portfolio entity and DTOs.
 * 
 * Manual mapping implementation (no MapStruct).
 * All methods are static for easy access.
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.6
 */
public class PortfolioMapper {
    
    /**
     * Convert PortfolioRequest DTO to Portfolio entity.
     * 
     * @param request the PortfolioRequest DTO
     * @param user the User entity to associate with
     * @return Portfolio entity
     */
    public static Portfolio toEntity(PortfolioRequest request, User user) {
        if (request == null) {
            return null;
        }
        
        Portfolio portfolio = new Portfolio();
        portfolio.setUser(user);
        portfolio.setPortfolioName(request.getPortfolioName());
        portfolio.setPortfolioType(request.getPortfolioType());
        portfolio.setRiskLevel(request.getRiskLevel());
        
        return portfolio;
    }
    
    /**
     * Convert Portfolio entity to PortfolioResponse DTO.
     * 
     * @param portfolio the Portfolio entity
     * @return PortfolioResponse DTO
     */
    public static PortfolioResponse toResponse(Portfolio portfolio) {
        if (portfolio == null) {
            return null;
        }
        
        PortfolioResponse response = new PortfolioResponse();
        response.setId(portfolio.getId());
        response.setUserId(portfolio.getUser() != null ? portfolio.getUser().getId() : null);
        response.setPortfolioName(portfolio.getPortfolioName());
        response.setPortfolioType(portfolio.getPortfolioType());
        response.setRiskLevel(portfolio.getRiskLevel());
        response.setCreatedAt(portfolio.getCreatedAt());
        response.setUpdatedAt(portfolio.getUpdatedAt());
        
        return response;
    }
    
    /**
     * Update existing Portfolio entity with data from PortfolioRequest.
     * 
     * @param portfolio the Portfolio entity to update
     * @param request the PortfolioRequest DTO with new data
     */
    public static void updateEntity(Portfolio portfolio, PortfolioRequest request) {
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
    }
}
