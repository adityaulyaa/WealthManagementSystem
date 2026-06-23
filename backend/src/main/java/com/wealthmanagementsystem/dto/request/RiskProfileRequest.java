package com.wealthmanagementsystem.dto.request;

import com.wealthmanagementsystem.entity.RiskLevel;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request DTO for creating/updating RiskProfile.
 * 
 * Flat structure - uses userId instead of nested User object
 * Used for REST API request body mapping.
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.6
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RiskProfileRequest {
    
    @NotNull(message = "User ID is required")
    private Long userId;
    
    @NotNull(message = "Risk level is required")
    private RiskLevel riskLevel;
    
    @NotNull(message = "Time horizon is required")
    @Min(value = 1, message = "Time horizon must be at least 1 year")
    @Max(value = 50, message = "Time horizon must not exceed 50 years")
    private Integer timeHorizonYears;
}
