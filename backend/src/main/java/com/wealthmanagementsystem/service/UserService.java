package com.wealthmanagementsystem.service;

import com.wealthmanagementsystem.entity.User;
import com.wealthmanagementsystem.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service layer for User entity business logic.
 * 
 * Handles user management operations including:
 * - User CRUD operations
 * - Profile management
 * - Email validation
 * 
 * This service uses UserRepository for data access.
 * Constructor injection is used for dependency management.
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.4
 */
@Service
@Transactional
public class UserService {
    
    private final UserRepository userRepository;
    
    /**
     * Constructor injection for UserRepository.
     * 
     * @param userRepository the user repository
     */
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    /**
     * Create a new user.
     * 
     * Validates that email doesn't already exist before creating user.
     * 
     * @param user the user to create
     * @return the created user with generated ID
     * @throws IllegalArgumentException if email already exists
     * 
     * @example
     * User newUser = new User();
     * newUser.setEmail("user@example.com");
     * newUser.setFullName("John Doe");
     * newUser.setPasswordHash("$2b$10$...");
     * User created = userService.createUser(newUser);
     */
    public User createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already exists: " + user.getEmail());
        }
        return userRepository.save(user);
    }
    
    /**
     * Get user by ID.
     * 
     * @param userId the user's ID
     * @return Optional containing user if found, empty otherwise
     * 
     * @example
     * Optional<User> user = userService.getUserById(123L);
     */
    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }
    
    /**
     * Get user by email.
     * 
     * Used for login authentication flow.
     * 
     * @param email the user's email
     * @return Optional containing user if found, empty otherwise
     * 
     * @example
     * Optional<User> user = userService.getUserByEmail("user@example.com");
     */
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    /**
     * Get all users.
     * 
     * Note: Use with caution in production - may return large datasets.
     * Consider pagination for production use.
     * 
     * @return List of all users
     * 
     * @example
     * List<User> allUsers = userService.getAllUsers();
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    /**
     * Update existing user.
     * 
     * Updates user information. User must exist (has ID).
     * 
     * @param user the user with updated information
     * @return the updated user
     * @throws IllegalArgumentException if user ID is null
     * 
     * @example
     * User user = userService.getUserById(123L).orElseThrow();
     * user.setFullName("John Smith");
     * User updated = userService.updateUser(user);
     */
    public User updateUser(User user) {
        if (user.getId() == null) {
            throw new IllegalArgumentException("Cannot update user without ID");
        }
        return userRepository.save(user);
    }
    
    /**
     * Delete user by ID.
     * 
     * Deletes user and all associated data (cascade delete).
     * Associated data includes: risk profile, portfolios, financial goals.
     * 
     * @param userId the user's ID to delete
     * 
     * @example
     * userService.deleteUser(123L);
     */
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
    
    /**
     * Check if user with given email exists.
     * 
     * Used for email validation during registration.
     * 
     * @param email the email to check
     * @return true if user exists, false otherwise
     * 
     * @example
     * if (userService.existsByEmail("test@example.com")) {
     *     throw new EmailAlreadyExistsException();
     * }
     */
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    
    /**
     * Count total number of users.
     * 
     * Used for statistics and dashboard displays.
     * 
     * @return total user count
     * 
     * @example
     * long totalUsers = userService.countUsers();
     */
    public long countUsers() {
        return userRepository.count();
    }
}
