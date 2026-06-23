package com.wealthmanagementsystem.service;

import com.wealthmanagementsystem.entity.RiskProfile;
import com.wealthmanagementsystem.entity.RiskLevel;
import com.wealthmanagementsystem.repository.RiskProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service layer for RiskProfile entity business logic.
 * 
 * Handles risk profile management operations including:
 * - Risk profile CRUD operations
 * - Risk assessment storage
 * - Risk level queries
 * 
 * This service uses RiskProfileRepository for data access.
 * Constructor injection is used for dependency management.
 * 
 * Business Rules:
 * - One user can have only one risk profile (enforced by DB UNIQUE constraint)
 * - Risk profile determines portfolio recommendation strategy
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.4
 */
@Service
@Transactional
public class RiskProfileService {
    
    private final RiskProfileRepository riskProfileRepository;
    
    /**
     * Constructor injection for RiskProfileRepository.
     * 
     * @param riskProfileRepository the risk profile repository
     */
    public RiskProfileService(RiskProfileRepository riskProfileRepository) {
        this.riskProfileRepository = riskProfileRepository;
    }
    
    /**
     * Create a new risk profile.
     * 
     * Validates that user doesn't already have a risk profile.
     * Use updateRiskProfile() to modify existing profile.
     * 
     * @param riskProfile the risk profile to create
     * @return the created risk profile with generated ID
     * @throws IllegalArgumentException if user already has a risk profile
     * 
     * @example
     * RiskProfile profile = new RiskProfile();
     * profile.setUser(user);
     * profile.setRiskLevel(RiskLevel.MEDIUM);
     * profile.setTimeHorizonYears(5);
     * RiskProfile created = riskProfileService.createRiskProfile(profile);
     */
    public RiskProfile createRiskProfile(RiskProfile riskProfile) {
        Long userId = riskProfile.getUser().getId();
        if (riskProfileRepository.existsByUserId(userId)) {
            throw new IllegalArgumentException("User already has a risk profile. Use update instead.");
        }
        return riskProfileRepository.save(riskProfile);
    }
    
    /**
     * Get risk profile by ID.
     * 
     * @param profileId the risk profile's ID
     * @return Optional containing risk profile if found, empty otherwise
     * 
     * @example
     * Optional<RiskProfile> profile = riskProfileService.getRiskProfileById(123L);
     */
    public Optional<RiskProfile> getRiskProfileById(Long profileId) {
        return riskProfileRepository.findById(profileId);
    }
    
    /**
     * Get risk profile by user ID.
     * 
     * Most common query - retrieve user's risk assessment results.
     * 
     * @param userId the user's ID
     * @return Optional containing risk profile if found, empty otherwise
     * 
     * @example
     * Optional<RiskProfile> profile = riskProfileService.getRiskProfileByUserId(123L);
     */
    public Optional<RiskProfile> getRiskProfileByUserId(Long userId) {
        return riskProfileRepository.findByUserId(userId);
    }
    
    /**
     * Get all risk profiles.
     * 
     * Note: Use with caution - may return large datasets.
     * Consider pagination for production use.
     * 
     * @return List of all risk profiles
     * 
     * @example
     * List<RiskProfile> allProfiles = riskProfileService.getAllRiskProfiles();
     */
    public List<RiskProfile> getAllRiskProfiles() {
        return riskProfileRepository.findAll();
    }
    
    /**
     * Get all risk profiles by risk level.
     * 
     * Used for analytics or filtering users by risk tolerance.
     * 
     * @param riskLevel the risk level to filter by (LOW, MEDIUM, HIGH)
     * @return List of risk profiles with matching risk level
     * 
     * @example
     * List<RiskProfile> highRisk = riskProfileService
     *     .getRiskProfilesByRiskLevel(RiskLevel.HIGH);
     */
    public List<RiskProfile> getRiskProfilesByRiskLevel(RiskLevel riskLevel) {
        return riskProfileRepository.findByRiskLevel(riskLevel);
    }
    
    /**
     * Update existing risk profile.
     * 
     * Used when user retakes risk assessment.
     * Risk profile must exist (has ID).
     * 
     * @param riskProfile the risk profile with updated information
     * @return the updated risk profile
     * @throws IllegalArgumentException if risk profile ID is null
     * 
     * @example
     * RiskProfile profile = riskProfileService.getRiskProfileByUserId(userId).orElseThrow();
     * profile.setRiskLevel(RiskLevel.HIGH);
     * profile.setTimeHorizonYears(10);
     * RiskProfile updated = riskProfileService.updateRiskProfile(profile);
     */
    public RiskProfile updateRiskProfile(RiskProfile riskProfile) {
        if (riskProfile.getId() == null) {
            throw new IllegalArgumentException("Cannot update risk profile without ID");
        }
        return riskProfileRepository.save(riskProfile);
    }
    
    /**
     * Delete risk profile by ID.
     * 
     * Deletes risk profile. User can then create a new one.
     * 
     * @param profileId the risk profile's ID to delete
     * 
     * @example
     * riskProfileService.deleteRiskProfile(123L);
     */
    public void deleteRiskProfile(Long profileId) {
        riskProfileRepository.deleteById(profileId);
    }
    
    /**
     * Check if user has a risk profile.
     * 
     * Used to determine if user needs to complete risk assessment.
     * 
     * @param userId the user's ID
     * @return true if risk profile exists, false otherwise
     * 
     * @example
     * if (!riskProfileService.existsByUserId(userId)) {
     *     // Redirect to risk assessment page
     * }
     */
    public boolean existsByUserId(Long userId) {
        return riskProfileRepository.existsByUserId(userId);
    }
    
    /**
     * Count total number of risk profiles.
     * 
     * Used for statistics and dashboard displays.
     * 
     * @return total risk profile count
     * 
     * @example
     * long totalProfiles = riskProfileService.countRiskProfiles();
     */
    public long countRiskProfiles() {
        return riskProfileRepository.count();
    }
}
