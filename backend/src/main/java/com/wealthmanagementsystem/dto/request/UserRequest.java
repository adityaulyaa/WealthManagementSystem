package com.wealthmanagementsystem.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request DTO for creating/updating User.
 * 
 * Flat structure - no nested objects
 * Used for REST API request body mapping.
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.6
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    
    private String email;
    
    private String passwordHash;
    
    private String fullName;
}
