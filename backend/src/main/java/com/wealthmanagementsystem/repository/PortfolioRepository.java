package com.wealthmanagementsystem.repository;

import com.wealthmanagementsystem.entity.Portfolio;
import com.wealthmanagementsystem.entity.RiskLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Portfolio entity.
 * 
 * Provides CRUD operations and custom query methods for portfolio management.
 * Extends Spring Data JPA JpaRepository for automatic implementation.
 * 
 * Database table: portfolios
 * 
 * Business Rules:
 * - One user can have multiple portfolios (1:N relationship)
 * - Each portfolio references one user (foreign key: user_id)
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.3
 */
@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    
    /**
     * Find all portfolios for a specific user.
     * 
     * Used to retrieve user's portfolio list on dashboard or portfolio page.
     * Returns list sorted by creation date (most recent first via ORDER BY).
     * 
     * @param userId the user's ID
     * @return List of portfolios belonging to user (empty list if none found)
     * 
     * @example
     * List<Portfolio> userPortfolios = portfolioRepository.findByUserId(123L);
     */
    List<Portfolio> findByUserId(Long userId);
    
    /**
     * Find all portfolios for a user, sorted by creation date descending.
     * 
     * Used when user wants to see portfolios with newest first.
     * Query method with OrderBy clause (Spring Data derives ORDER BY).
     * 
     * @param userId the user's ID
     * @return List of portfolios sorted by creation date (newest first)
     * 
     * @example
     * List<Portfolio> recent = portfolioRepository.findByUserIdOrderByCreatedAtDesc(123L);
     */
    List<Portfolio> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    /**
     * Find portfolios with specific risk level for a user.
     * 
     * Used for filtering or analytics (e.g., show only conservative portfolios).
     * 
     * @param userId the user's ID
     * @param riskLevel the risk level to filter by (LOW, MEDIUM, HIGH)
     * @return List of portfolios matching risk level
     * 
     * @example
     * List<Portfolio> conservative = portfolioRepository
     *     .findByUserIdAndRiskLevel(123L, RiskLevel.LOW);
     */
    List<Portfolio> findByUserIdAndRiskLevel(Long userId, RiskLevel riskLevel);
    
    /**
     * Count portfolios for a specific user.
     * 
     * Used for checking if user has portfolios (UI display logic).
     * 
     * @param userId the user's ID
     * @return number of portfolios belonging to user
     * 
     * @example
     * long count = portfolioRepository.countByUserId(123L);
     */
    long countByUserId(Long userId);
}
