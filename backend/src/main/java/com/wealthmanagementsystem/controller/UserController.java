package com.wealthmanagementsystem.controller;

import com.wealthmanagementsystem.entity.User;
import com.wealthmanagementsystem.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for User entity endpoints.
 * 
 * Provides HTTP endpoints for user management operations.
 * Base path: /api/users
 * 
 * Endpoints:
 * - POST   /api/users           - Create new user
 * - GET    /api/users/{id}      - Get user by ID
 * - GET    /api/users/email/{email} - Get user by email
 * - GET    /api/users           - Get all users
 * - PUT    /api/users/{id}      - Update user
 * - DELETE /api/users/{id}      - Delete user
 * 
 * Note: Authentication/Authorization not implemented yet (Phase 4.6)
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.5
 */
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private final UserService userService;
    
    /**
     * Constructor injection for UserService.
     * 
     * @param userService the user service
     */
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    /**
     * Create a new user.
     * 
     * POST /api/users
     * 
     * @param user the user to create (from request body)
     * @return ResponseEntity with created user and HTTP 201 (Created)
     * 
     * @example
     * POST /api/users
     * Body: { "email": "user@example.com", "fullName": "John Doe", "passwordHash": "..." }
     * Response: 201 Created with created user
     */
     @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        User created = userService.createUser(user);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
    
    /**
     * Get user by ID.
     * 
     * GET /api/users/{id}
     * 
     * @param id the user's ID
     * @return ResponseEntity with user if found (200 OK), or 404 Not Found
     * 
     * @example
     * GET /api/users/123
     * Response: 200 OK with user data
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    /**
     * Get user by email.
     * 
     * GET /api/users/email/{email}
     * 
     * @param email the user's email
     * @return ResponseEntity with user if found (200 OK), or 404 Not Found
     * 
     * @example
     * GET /api/users/email/user@example.com
     * Response: 200 OK with user data
     */
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email)
                .map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    /**
     * Get all users.
     * 
     * GET /api/users
     * 
     * @return ResponseEntity with list of all users (200 OK)
     * 
     * @example
     * GET /api/users
     * Response: 200 OK with array of users
     */
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    
    /**
     * Update existing user.
     * 
     * PUT /api/users/{id}
     * 
     * @param id the user's ID
     * @param user the user with updated information
     * @return ResponseEntity with updated user (200 OK)
     * 
     * @example
     * PUT /api/users/123
     * Body: { "id": 123, "email": "user@example.com", "fullName": "John Smith", ... }
     * Response: 200 OK with updated user
     */
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody User user) {
        user.setId(id);
        User updated = userService.updateUser(user);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }
    
    /**
     * Delete user by ID.
     * 
     * DELETE /api/users/{id}
     * 
     * @param id the user's ID to delete
     * @return ResponseEntity with no content (204 No Content)
     * 
     * @example
     * DELETE /api/users/123
     * Response: 204 No Content
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
