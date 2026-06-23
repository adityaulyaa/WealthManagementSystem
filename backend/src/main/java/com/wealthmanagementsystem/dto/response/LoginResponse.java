package com.wealthmanagementsystem.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response DTO for user login.
 * 
 * Contains authentication token and user information.
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.8 Batch 3
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    
    private String token;
    
    private String tokenType = "Bearer";
    
    private Long userId;
    
    private String email;
}
