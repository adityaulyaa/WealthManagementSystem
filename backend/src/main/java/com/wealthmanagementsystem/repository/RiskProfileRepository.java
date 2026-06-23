package com.wealthmanagementsystem.repository;

import com.wealthmanagementsystem.entity.RiskProfile;
import com.wealthmanagementsystem.entity.RiskLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

/**
 * Repository interface for RiskProfile entity.
 * 
 * Provides CRUD operations and custom query methods for risk profile management.
 * Extends Spring Data JPA JpaRepository for automatic implementation.
 * 
 * Database table: risk_profiles
 * 
 * Business Rules:
 * - One user has exactly one risk profile (1:1 relationship)
 * - user_id has UNIQUE constraint enforcing this at DB level
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.3
 */
@Repository
public interface RiskProfileRepository extends JpaRepository<RiskProfile, Long> {
    
    /**
     * Find risk profile by user ID.
     * 
     * Used to retrieve user's risk assessment results.
     * Returns Optional because user may not have completed risk assessment yet.
     * 
     * @param userId the user's ID
     * @return Optional containing risk profile if found, empty otherwise
     * 
     * @example
     * Optional<RiskProfile> profile = riskProfileRepository.findByUserId(123L);
     */
    Optional<RiskProfile> findByUserId(Long userId);
    
    /**
     * Check if risk profile exists for given user.
     * 
     * Used to validate if user has completed risk assessment.
     * More efficient than findByUserId for existence checks.
     * 
     * @param userId the user's ID
     * @return true if risk profile exists for this user, false otherwise
     * 
     * @example
     * if (!riskProfileRepository.existsByUserId(userId)) {
     *     throw new RiskProfileNotFoundException();
     * }
     */
    boolean existsByUserId(Long userId);
    
    /**
     * Find all risk profiles by risk level.
     * 
     * Used for analytics or filtering users by risk tolerance.
     * Returns list of all profiles matching the specified risk level.
     * 
     * @param riskLevel the risk level to filter by (LOW, MEDIUM, HIGH)
     * @return List of risk profiles with matching risk level (empty list if none found)
     * 
     * @example
     * List<RiskProfile> highRiskUsers = riskProfileRepository.findByRiskLevel(RiskLevel.HIGH);
     */
    List<RiskProfile> findByRiskLevel(RiskLevel riskLevel);
}
