package com.wealthmanagementsystem.service;

import com.wealthmanagementsystem.entity.Portfolio;
import com.wealthmanagementsystem.entity.RiskLevel;
import com.wealthmanagementsystem.repository.PortfolioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service layer for Portfolio entity business logic.
 * 
 * Handles portfolio management operations including:
 * - Portfolio CRUD operations
 * - Portfolio queries by user
 * - Risk level filtering
 * 
 * This service uses PortfolioRepository for data access.
 * Constructor injection is used for dependency management.
 * 
 * Business Rules:
 * - User can have multiple portfolios (1:N relationship)
 * - Each portfolio has allocation percentages via PortfolioAsset
 * - Total allocation should equal 100% (validated at PortfolioAsset level)
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.4
 */
@Service
@Transactional
public class PortfolioService {
    
    private final PortfolioRepository portfolioRepository;
    
    /**
     * Constructor injection for PortfolioRepository.
     * 
     * @param portfolioRepository the portfolio repository
     */
    public PortfolioService(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }
    
    /**
     * Create a new portfolio.
     * 
     * Validates portfolio data before creation.
     * 
     * @param portfolio the portfolio to create
     * @return the created portfolio with generated ID
     * @throws IllegalArgumentException if portfolio data is invalid
     * 
     * @example
     * Portfolio portfolio = new Portfolio();
     * portfolio.setUser(user);
     * portfolio.setPortfolioName("Conservative Retirement");
     * portfolio.setPortfolioType("Balanced");
     * portfolio.setRiskLevel(RiskLevel.LOW);
     * Portfolio created = portfolioService.createPortfolio(portfolio);
     */
    public Portfolio createPortfolio(Portfolio portfolio) {
        validatePortfolio(portfolio);
        return portfolioRepository.save(portfolio);
    }
    
    /**
     * Get portfolio by ID.
     * 
     * @param portfolioId the portfolio's ID
     * @return Optional containing portfolio if found, empty otherwise
     * 
     * @example
     * Optional<Portfolio> portfolio = portfolioService.getPortfolioById(123L);
     */
    public Optional<Portfolio> getPortfolioById(Long portfolioId) {
        return portfolioRepository.findById(portfolioId);
    }
    
    /**
     * Get all portfolios for a specific user.
     * 
     * Returns user's complete portfolio list.
     * 
     * @param userId the user's ID
     * @return List of portfolios belonging to user (empty list if none found)
     * 
     * @example
     * List<Portfolio> userPortfolios = portfolioService.getPortfoliosByUserId(123L);
     */
    public List<Portfolio> getPortfoliosByUserId(Long userId) {
        return portfolioRepository.findByUserId(userId);
    }
    
    /**
     * Get all portfolios for user, sorted by creation date (newest first).
     * 
     * Used for displaying portfolios in chronological order.
     * 
     * @param userId the user's ID
     * @return List of portfolios sorted by creation date (newest first)
     * 
     * @example
     * List<Portfolio> recent = portfolioService.getPortfoliosByUserIdSorted(123L);
     */
    public List<Portfolio> getPortfoliosByUserIdSorted(Long userId) {
        return portfolioRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
    
    /**
     * Get portfolios by user ID and risk level.
     * 
     * Used for filtering portfolios by risk tolerance.
     * 
     * @param userId the user's ID
     * @param riskLevel the risk level to filter by (LOW, MEDIUM, HIGH)
     * @return List of portfolios matching criteria
     * 
     * @example
     * List<Portfolio> conservative = portfolioService
     *     .getPortfoliosByUserIdAndRiskLevel(123L, RiskLevel.LOW);
     */
    public List<Portfolio> getPortfoliosByUserIdAndRiskLevel(Long userId, RiskLevel riskLevel) {
        return portfolioRepository.findByUserIdAndRiskLevel(userId, riskLevel);
    }
    
    /**
     * Get all portfolios.
     * 
     * Note: Use with caution - may return large datasets.
     * Consider pagination for production use.
     * 
     * @return List of all portfolios
     * 
     * @example
     * List<Portfolio> allPortfolios = portfolioService.getAllPortfolios();
     */
    public List<Portfolio> getAllPortfolios() {
        return portfolioRepository.findAll();
    }
    
    /**
     * Update existing portfolio.
     * 
     * Updates portfolio information. Portfolio must exist (has ID).
     * 
     * @param portfolio the portfolio with updated information
     * @return the updated portfolio
     * @throws IllegalArgumentException if portfolio ID is null or data invalid
     * 
     * @example
     * Portfolio portfolio = portfolioService.getPortfolioById(123L).orElseThrow();
     * portfolio.setPortfolioName("Updated Name");
     * Portfolio updated = portfolioService.updatePortfolio(portfolio);
     */
    public Portfolio updatePortfolio(Portfolio portfolio) {
        if (portfolio.getId() == null) {
            throw new IllegalArgumentException("Cannot update portfolio without ID");
        }
        validatePortfolio(portfolio);
        return portfolioRepository.save(portfolio);
    }
    
    /**
     * Delete portfolio by ID.
     * 
     * Deletes portfolio and all associated allocations (cascade delete).
     * 
     * @param portfolioId the portfolio's ID to delete
     * 
     * @example
     * portfolioService.deletePortfolio(123L);
     */
    public void deletePortfolio(Long portfolioId) {
        portfolioRepository.deleteById(portfolioId);
    }
    
    /**
     * Count total portfolios for a user.
     * 
     * Used for statistics and validation.
     * 
     * @param userId the user's ID
     * @return number of portfolios belonging to user
     * 
     * @example
     * long count = portfolioService.countPortfoliosByUserId(123L);
     */
    public long countPortfoliosByUserId(Long userId) {
        return portfolioRepository.countByUserId(userId);
    }
    
    /**
     * Count total number of portfolios.
     * 
     * Used for statistics and dashboard displays.
     * 
     * @return total portfolio count
     * 
     * @example
     * long totalPortfolios = portfolioService.countAllPortfolios();
     */
    public long countAllPortfolios() {
        return portfolioRepository.count();
    }
    
    /**
     * Validate portfolio data.
     * 
     * Private helper method to validate portfolio before save.
     * 
     * @param portfolio the portfolio to validate
     * @throws IllegalArgumentException if validation fails
     */
    private void validatePortfolio(Portfolio portfolio) {
        if (portfolio.getUser() == null) {
            throw new IllegalArgumentException("Portfolio must have a user");
        }
        if (portfolio.getPortfolioName() == null || portfolio.getPortfolioName().trim().isEmpty()) {
            throw new IllegalArgumentException("Portfolio name is required");
        }
        if (portfolio.getPortfolioType() == null || portfolio.getPortfolioType().trim().isEmpty()) {
            throw new IllegalArgumentException("Portfolio type is required");
        }
        if (portfolio.getRiskLevel() == null) {
            throw new IllegalArgumentException("Risk level is required");
        }
    }
}
