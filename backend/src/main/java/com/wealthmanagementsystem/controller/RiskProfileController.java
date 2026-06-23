package com.wealthmanagementsystem.controller;

import com.wealthmanagementsystem.dto.request.RiskProfileRequest;
import com.wealthmanagementsystem.dto.response.RiskProfileResponse;
import com.wealthmanagementsystem.entity.RiskProfile;
import com.wealthmanagementsystem.entity.User;
import com.wealthmanagementsystem.mapper.RiskProfileMapper;
import com.wealthmanagementsystem.service.RiskProfileService;
import com.wealthmanagementsystem.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST Controller for RiskProfile entity endpoints.
 * 
 * Provides HTTP endpoints for risk profile management operations.
 * Base path: /api/risk-profiles
 * 
 * Uses DTO layer for request/response conversion.
 * Service layer continues to use Entities.
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.5
 */
@RestController
@RequestMapping("/api/risk-profiles")
public class RiskProfileController {
    
    private final RiskProfileService riskProfileService;
    private final UserService userService;
    
    public RiskProfileController(RiskProfileService riskProfileService, UserService userService) {
        this.riskProfileService = riskProfileService;
        this.userService = userService;
    }
    
    /**
     * Create a new risk profile.
     * 
     * POST /api/risk-profiles
     */
    @PostMapping
    public ResponseEntity<RiskProfileResponse> createRiskProfile(@Valid @RequestBody RiskProfileRequest request) {
        Optional<User> userOpt = userService.getUserById(request.getUserId());
        if (userOpt.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        RiskProfile entity = RiskProfileMapper.toEntity(request, userOpt.get());
        RiskProfile created = riskProfileService.createRiskProfile(entity);
        RiskProfileResponse response = RiskProfileMapper.toResponse(created);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    /**
     * Get risk profile by ID.
     * 
     * GET /api/risk-profiles/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<RiskProfileResponse> getRiskProfileById(@PathVariable Long id) {
        return riskProfileService.getRiskProfileById(id)
                .map(profile -> {
                    RiskProfileResponse response = RiskProfileMapper.toResponse(profile);
                    return new ResponseEntity<>(response, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    /**
     * Get risk profile by user ID.
     * 
     * GET /api/risk-profiles/user/{userId}
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<RiskProfileResponse> getRiskProfileByUserId(@PathVariable Long userId) {
        return riskProfileService.getRiskProfileByUserId(userId)
                .map(profile -> {
                    RiskProfileResponse response = RiskProfileMapper.toResponse(profile);
                    return new ResponseEntity<>(response, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    /**
     * Get all risk profiles.
     * 
     * GET /api/risk-profiles
     */
    @GetMapping
    public ResponseEntity<List<RiskProfileResponse>> getAllRiskProfiles() {
        List<RiskProfile> profiles = riskProfileService.getAllRiskProfiles();
        List<RiskProfileResponse> responses = profiles.stream()
                .map(RiskProfileMapper::toResponse)
                .collect(Collectors.toList());
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }
    
    /**
     * Update existing risk profile.
     * 
     * PUT /api/risk-profiles/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<RiskProfileResponse> updateRiskProfile(@PathVariable Long id, @Valid @RequestBody RiskProfileRequest request) {
        Optional<RiskProfile> existingOpt = riskProfileService.getRiskProfileById(id);
        if (existingOpt.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        RiskProfile existing = existingOpt.get();
        RiskProfileMapper.updateEntity(existing, request);
        existing.setId(id);
        RiskProfile updated = riskProfileService.updateRiskProfile(existing);
        RiskProfileResponse response = RiskProfileMapper.toResponse(updated);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    /**
     * Delete risk profile by ID.
     * 
     * DELETE /api/risk-profiles/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRiskProfile(@PathVariable Long id) {
        riskProfileService.deleteRiskProfile(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
