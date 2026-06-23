package com.wealthmanagementsystem.controller;

import com.wealthmanagementsystem.dto.request.UserRequest;
import com.wealthmanagementsystem.dto.response.UserResponse;
import com.wealthmanagementsystem.entity.User;
import com.wealthmanagementsystem.mapper.UserMapper;
import com.wealthmanagementsystem.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * REST Controller for User entity endpoints.
 * 
 * Provides HTTP endpoints for user management operations.
 * Base path: /api/users
 * 
 * Uses DTO layer for request/response conversion.
 * Service layer continues to use Entities.
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.5
 */
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private final UserService userService;
    
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    /**
     * Create a new user.
     * 
     * POST /api/users
     * 
     * @param request the UserRequest DTO (from request body)
     * @return ResponseEntity with created user response and HTTP 201 (Created)
     */
    @PostMapping
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody UserRequest request) {
        User entity = UserMapper.toEntity(request);
        User created = userService.createUser(entity);
        UserResponse response = UserMapper.toResponse(created);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    /**
     * Get user by ID.
     * 
     * GET /api/users/{id}
     * 
     * @param id the user's ID
     * @return ResponseEntity with user response if found (200 OK), or 404 Not Found
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(user -> {
                    UserResponse response = UserMapper.toResponse(user);
                    return new ResponseEntity<>(response, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    /**
     * Get user by email.
     * 
     * GET /api/users/email/{email}
     * 
     * @param email the user's email
     * @return ResponseEntity with user response if found (200 OK), or 404 Not Found
     */
    @GetMapping("/email/{email}")
    public ResponseEntity<UserResponse> getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email)
                .map(user -> {
                    UserResponse response = UserMapper.toResponse(user);
                    return new ResponseEntity<>(response, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    /**
     * Get all users.
     * 
     * GET /api/users
     * 
     * @return ResponseEntity with list of user responses (200 OK)
     */
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        List<UserResponse> responses = users.stream()
                .map(UserMapper::toResponse)
                .collect(Collectors.toList());
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }
    
    /**
     * Update existing user.
     * 
     * PUT /api/users/{id}
     * 
     * @param id the user's ID
     * @param request the UserRequest DTO with updated information
     * @return ResponseEntity with updated user response (200 OK)
     */
    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @Valid @RequestBody UserRequest request) {
        User entity = UserMapper.toEntity(request);
        entity.setId(id);
        User updated = userService.updateUser(entity);
        UserResponse response = UserMapper.toResponse(updated);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    /**
     * Delete user by ID.
     * 
     * DELETE /api/users/{id}
     * 
     * @param id the user's ID to delete
     * @return ResponseEntity with no content (204 No Content)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
