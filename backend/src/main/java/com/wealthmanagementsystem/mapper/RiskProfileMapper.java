package com.wealthmanagementsystem.mapper;

import com.wealthmanagementsystem.dto.request.RiskProfileRequest;
import com.wealthmanagementsystem.dto.response.RiskProfileResponse;
import com.wealthmanagementsystem.entity.RiskProfile;
import com.wealthmanagementsystem.entity.User;

/**
 * Mapper class for RiskProfile entity and DTOs.
 * 
 * Manual mapping implementation (no MapStruct).
 * All methods are static for easy access.
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.6
 */
public class RiskProfileMapper {
    
    /**
     * Convert RiskProfileRequest DTO to RiskProfile entity.
     * 
     * @param request the RiskProfileRequest DTO
     * @param user the User entity to associate with
     * @return RiskProfile entity
     */
    public static RiskProfile toEntity(RiskProfileRequest request, User user) {
        if (request == null) {
            return null;
        }
        
        RiskProfile profile = new RiskProfile();
        profile.setUser(user);
        profile.setRiskLevel(request.getRiskLevel());
        profile.setTimeHorizonYears(request.getTimeHorizonYears());
        
        return profile;
    }
    
    /**
     * Convert RiskProfile entity to RiskProfileResponse DTO.
     * 
     * @param profile the RiskProfile entity
     * @return RiskProfileResponse DTO
     */
    public static RiskProfileResponse toResponse(RiskProfile profile) {
        if (profile == null) {
            return null;
        }
        
        RiskProfileResponse response = new RiskProfileResponse();
        response.setId(profile.getId());
        response.setUserId(profile.getUser() != null ? profile.getUser().getId() : null);
        response.setRiskLevel(profile.getRiskLevel());
        response.setTimeHorizonYears(profile.getTimeHorizonYears());
        response.setCreatedAt(profile.getCreatedAt());
        response.setUpdatedAt(profile.getUpdatedAt());
        
        return response;
    }
    
    /**
     * Update existing RiskProfile entity with data from RiskProfileRequest.
     * 
     * @param profile the RiskProfile entity to update
     * @param request the RiskProfileRequest DTO with new data
     */
    public static void updateEntity(RiskProfile profile, RiskProfileRequest request) {
        if (profile == null || request == null) {
            return;
        }
        
        if (request.getRiskLevel() != null) {
            profile.setRiskLevel(request.getRiskLevel());
        }
        if (request.getTimeHorizonYears() != null) {
            profile.setTimeHorizonYears(request.getTimeHorizonYears());
        }
    }
}
