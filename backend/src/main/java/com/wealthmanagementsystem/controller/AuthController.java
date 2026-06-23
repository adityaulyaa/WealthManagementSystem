package com.wealthmanagementsystem.controller;

import com.wealthmanagementsystem.dto.request.LoginRequest;
import com.wealthmanagementsystem.dto.response.LoginResponse;
import com.wealthmanagementsystem.entity.User;
import com.wealthmanagementsystem.exception.BusinessValidationException;
import com.wealthmanagementsystem.security.JwtUtil;
import com.wealthmanagementsystem.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * Authentication controller for login operations.
 * 
 * Provides JWT-based authentication endpoint.
 * Base path: /api/auth
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.8 Batch 3
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    
    public AuthController(UserService userService, 
                         PasswordEncoder passwordEncoder,
                         JwtUtil jwtUtil) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }
    
    /**
     * Login endpoint.
     * 
     * POST /api/auth/login
     * 
     * Authentication flow:
     * 1. Find user by email
     * 2. Verify password
     * 3. Generate JWT token
     * 4. Return token with user info
     * 
     * @param loginRequest login credentials
     * @return ResponseEntity with LoginResponse and JWT token
     * @throws BusinessValidationException if email or password is invalid
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        // Find user by email
        Optional<User> userOpt = userService.getUserByEmail(loginRequest.getEmail());
        
        // Check if user exists
        if (userOpt.isEmpty()) {
            throw new BusinessValidationException("Invalid email or password");
        }
        
        User user = userOpt.get();
        
        // Verify password
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPasswordHash())) {
            throw new BusinessValidationException("Invalid email or password");
        }
        
        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail());
        
        // Create login response
        LoginResponse response = new LoginResponse();
        response.setToken(token);
        response.setTokenType("Bearer");
        response.setUserId(user.getId());
        response.setEmail(user.getEmail());
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
