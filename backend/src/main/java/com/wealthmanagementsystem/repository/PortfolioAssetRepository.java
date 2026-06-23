package com.wealthmanagementsystem.repository;

import com.wealthmanagementsystem.entity.PortfolioAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for PortfolioAsset entity.
 * 
 * Provides CRUD operations and custom query methods for portfolio-asset allocations.
 * Extends Spring Data JPA JpaRepository for automatic implementation.
 * 
 * Database table: portfolio_assets (join table)
 * 
 * Business Rules:
 * - PortfolioAsset represents M:N relationship between Portfolio and Asset
 * - Contains allocation_percentage (business data)
 * - UNIQUE constraint on (portfolio_id, asset_id) - one asset per portfolio
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.3
 */
@Repository
public interface PortfolioAssetRepository extends JpaRepository<PortfolioAsset, Long> {
    
    /**
     * Find all asset allocations for a specific portfolio.
     * 
     * Used to get portfolio composition (what assets and their percentages).
     * Returns list of all assets allocated in the portfolio.
     * 
     * @param portfolioId the portfolio's ID
     * @return List of portfolio-asset allocations (empty list if portfolio has no assets)
     * 
     * @example
     * List<PortfolioAsset> composition = portfolioAssetRepository.findByPortfolioId(123L);
     */
    List<PortfolioAsset> findByPortfolioId(Long portfolioId);
    
    /**
     * Find all portfolios that contain a specific asset.
     * 
     * Used to analyze asset usage across portfolios.
     * 
     * @param assetId the asset's ID
     * @return List of portfolio-asset allocations containing this asset
     * 
     * @example
     * List<PortfolioAsset> usage = portfolioAssetRepository.findByAssetId(5L);
     */
    List<PortfolioAsset> findByAssetId(Long assetId);
    
    /**
     * Find specific allocation for a portfolio-asset combination.
     * 
     * Used to check if asset already exists in portfolio or get specific allocation.
     * Returns Optional because combination may not exist.
     * 
     * @param portfolioId the portfolio's ID
     * @param assetId the asset's ID
     * @return Optional containing allocation if found, empty otherwise
     * 
     * @example
     * Optional<PortfolioAsset> allocation = portfolioAssetRepository
     *     .findByPortfolioIdAndAssetId(123L, 5L);
     */
    Optional<PortfolioAsset> findByPortfolioIdAndAssetId(Long portfolioId, Long assetId);
    
    /**
     * Calculate total allocation percentage for a portfolio.
     * 
     * Used to validate that total allocations equal 100%.
     * Custom JPQL query to sum allocation percentages.
     * 
     * @param portfolioId the portfolio's ID
     * @return Sum of all allocation percentages (should be 100.00)
     * 
     * @example
     * BigDecimal total = portfolioAssetRepository.sumAllocationByPortfolioId(123L);
     * if (total.compareTo(BigDecimal.valueOf(100)) != 0) {
     *     throw new InvalidAllocationException("Total must equal 100%");
     * }
     */
    @Query("SELECT SUM(pa.allocationPercentage) FROM PortfolioAsset pa WHERE pa.portfolio.id = :portfolioId")
    BigDecimal sumAllocationByPortfolioId(@Param("portfolioId") Long portfolioId);
    
    /**
     * Delete all allocations for a specific portfolio.
     * 
     * Used when resetting portfolio composition.
     * Cascade delete should handle this, but explicit method available if needed.
     * 
     * @param portfolioId the portfolio's ID
     */
    void deleteByPortfolioId(Long portfolioId);
}
