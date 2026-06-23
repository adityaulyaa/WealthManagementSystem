package com.wealthmanagementsystem.repository;

import com.wealthmanagementsystem.entity.Asset;
import com.wealthmanagementsystem.entity.AssetType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Asset entity.
 * 
 * Provides CRUD operations and custom query methods for asset master data.
 * Extends Spring Data JPA JpaRepository for automatic implementation.
 * 
 * Database table: assets
 * 
 * Business Rules:
 * - Assets are master data (seeded at application setup)
 * - Assets can be referenced by multiple portfolios via PortfolioAsset join table
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.3
 */
@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {
    
    /**
     * Find all assets of a specific type.
     * 
     * Used for filtering assets (e.g., show only stocks, only bonds).
     * Returns list of assets matching the specified type.
     * 
     * @param assetType the asset type to filter by (STOCK, BOND, CASH, MUTUAL_FUND, ETF)
     * @return List of assets with matching type (empty list if none found)
     * 
     * @example
     * List<Asset> stocks = assetRepository.findByAssetType(AssetType.STOCK);
     */
    List<Asset> findByAssetType(AssetType assetType);
    
    /**
     * Find all assets, sorted by asset name alphabetically.
     * 
     * Used for displaying asset selection in UI (dropdown, list).
     * Sorted alphabetically for better user experience.
     * 
     * @return List of all assets sorted by name (A-Z)
     * 
     * @example
     * List<Asset> allAssets = assetRepository.findAllByOrderByAssetNameAsc();
     */
    List<Asset> findAllByOrderByAssetNameAsc();
}
