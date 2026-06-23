package com.wealthmanagementsystem.mapper;

import com.wealthmanagementsystem.dto.request.UserRequest;
import com.wealthmanagementsystem.dto.response.UserResponse;
import com.wealthmanagementsystem.entity.User;

/**
 * Mapper class for User entity and DTOs.
 * 
 * Manual mapping implementation (no MapStruct).
 * All methods are static for easy access.
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.6
 */
public class UserMapper {
    
    /**
     * Convert UserRequest DTO to User entity.
     * 
     * @param request the UserRequest DTO
     * @return User entity
     */
    public static User toEntity(UserRequest request) {
        if (request == null) {
            return null;
        }
        
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPasswordHash(request.getPassword());
        user.setFullName(request.getFullName());
        
        return user;
    }
    
    /**
     * Convert User entity to UserResponse DTO.
     * 
     * @param user the User entity
     * @return UserResponse DTO
     */
    public static UserResponse toResponse(User user) {
        if (user == null) {
            return null;
        }
        
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setFullName(user.getFullName());
        response.setCreatedAt(user.getCreatedAt());
        response.setUpdatedAt(user.getUpdatedAt());
        
        return response;
    }
    
    /**
     * Update existing User entity with data from UserRequest.
     * 
     * @param user the User entity to update
     * @param request the UserRequest DTO with new data
     */
    public static void updateEntity(User user, UserRequest request) {
        if (user == null || request == null) {
            return;
        }
        
        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }
        if (request.getPassword() != null) {
            user.setPasswordHash(request.getPassword());
        }
        if (request.getFullName() != null) {
            user.setFullName(request.getFullName());
        }
    }
}
