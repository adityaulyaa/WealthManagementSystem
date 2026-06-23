package com.wealthmanagementsystem.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Response DTO for User entity.
 * 
 * Flat structure - no nested objects
 * Used for REST API response body mapping.
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.6
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    
    private Long id;
    
    private String email;
    
    private String fullName;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}
