package com.wealthmanagementsystem.controller;

import com.wealthmanagementsystem.entity.RiskProfile;
import com.wealthmanagementsystem.service.RiskProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for RiskProfile entity endpoints.
 * 
 * Provides HTTP endpoints for risk profile management operations.
 * Base path: /api/risk-profiles
 * 
 * Endpoints:
 * - POST   /api/risk-profiles           - Create new risk profile
 * - GET    /api/risk-profiles/{id}      - Get risk profile by ID
 * - GET    /api/risk-profiles/user/{userId} - Get risk profile by user ID
 * - GET    /api/risk-profiles           - Get all risk profiles
 * - PUT    /api/risk-profiles/{id}      - Update risk profile
 * - DELETE /api/risk-profiles/{id}      - Delete risk profile
 * 
 * Note: Authentication/Authorization not implemented yet (Phase 4.6)
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.5
 */
@RestController
@RequestMapping("/api/risk-profiles")
public class RiskProfileController {
    
    private final RiskProfileService riskProfileService;
    
    /**
     * Constructor injection for RiskProfileService.
     * 
     * @param riskProfileService the risk profile service
     */
    public RiskProfileController(RiskProfileService riskProfileService) {
        this.riskProfileService = riskProfileService;
    }
    
    /**
     * Create a new risk profile.
     * 
     * POST /api/risk-profiles
     * 
     * @param riskProfile the risk profile to create (from request body)
     * @return ResponseEntity with created risk profile and HTTP 201 (Created)
     * 
     * @example
     * POST /api/risk-profiles
     * Body: { "user": {...}, "riskLevel": "MEDIUM", "timeHorizonYears": 5 }
     * Response: 201 Created with created risk profile
     */
    @PostMapping
    public ResponseEntity<RiskProfile> createRiskProfile(@RequestBody RiskProfile riskProfile) {
        RiskProfile created = riskProfileService.createRiskProfile(riskProfile);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
    
    /**
     * Get risk profile by ID.
     * 
     * GET /api/risk-profiles/{id}
     * 
     * @param id the risk profile's ID
     * @return ResponseEntity with risk profile if found (200 OK), or 404 Not Found
     * 
     * @example
     * GET /api/risk-profiles/123
     * Response: 200 OK with risk profile data
     */
    @GetMapping("/{id}")
    public ResponseEntity<RiskProfile> getRiskProfileById(@PathVariable Long id) {
        return riskProfileService.getRiskProfileById(id)
                .map(profile -> new ResponseEntity<>(profile, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    /**
     * Get risk profile by user ID.
     * 
     * GET /api/risk-profiles/user/{userId}
     * 
     * @param userId the user's ID
     * @return ResponseEntity with risk profile if found (200 OK), or 404 Not Found
     * 
     * @example
     * GET /api/risk-profiles/user/123
     * Response: 200 OK with user's risk profile data
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<RiskProfile> getRiskProfileByUserId(@PathVariable Long userId) {
        return riskProfileService.getRiskProfileByUserId(userId)
                .map(profile -> new ResponseEntity<>(profile, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    /**
     * Get all risk profiles.
     * 
     * GET /api/risk-profiles
     * 
     * @return ResponseEntity with list of all risk profiles (200 OK)
     * 
     * @example
     * GET /api/risk-profiles
     * Response: 200 OK with array of risk profiles
     */
    @GetMapping
    public ResponseEntity<List<RiskProfile>> getAllRiskProfiles() {
        List<RiskProfile> profiles = riskProfileService.getAllRiskProfiles();
        return new ResponseEntity<>(profiles, HttpStatus.OK);
    }
    
    /**
     * Update existing risk profile.
     * 
     * PUT /api/risk-profiles/{id}
     * 
     * @param id the risk profile's ID
     * @param riskProfile the risk profile with updated information
     * @return ResponseEntity with updated risk profile (200 OK)
     * 
     * @example
     * PUT /api/risk-profiles/123
     * Body: { "id": 123, "riskLevel": "HIGH", "timeHorizonYears": 10, ... }
     * Response: 200 OK with updated risk profile
     */
    @PutMapping("/{id}")
    public ResponseEntity<RiskProfile> updateRiskProfile(@PathVariable Long id, @RequestBody RiskProfile riskProfile) {
        riskProfile.setId(id);
        RiskProfile updated = riskProfileService.updateRiskProfile(riskProfile);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }
    
    /**
     * Delete risk profile by ID.
     * 
     * DELETE /api/risk-profiles/{id}
     * 
     * @param id the risk profile's ID to delete
     * @return ResponseEntity with no content (204 No Content)
     * 
     * @example
     * DELETE /api/risk-profiles/123
     * Response: 204 No Content
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRiskProfile(@PathVariable Long id) {
        riskProfileService.deleteRiskProfile(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
