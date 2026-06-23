package com.wealthmanagementsystem.dto.response;

import com.wealthmanagementsystem.entity.RiskLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Response DTO for RiskProfile entity.
 * 
 * Flat structure - uses userId instead of nested User object
 * Used for REST API response body mapping.
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.6
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RiskProfileResponse {
    
    private Long id;
    
    private Long userId;
    
    private RiskLevel riskLevel;
    
    private Integer timeHorizonYears;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}
