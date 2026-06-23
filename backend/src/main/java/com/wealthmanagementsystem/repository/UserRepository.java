package com.wealthmanagementsystem.repository;

import com.wealthmanagementsystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for User entity.
 * 
 * Provides CRUD operations and custom query methods for User management.
 * Extends Spring Data JPA JpaRepository for automatic implementation.
 * 
 * Database table: users
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.3
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Find user by email address.
     * 
     * Used for user login authentication.
     * Email is unique constraint, so Optional will contain user or empty.
     * 
     * @param email the user's email address
     * @return Optional containing user if found, empty otherwise
     * 
     * @example
     * Optional<User> user = userRepository.findByEmail("user@example.com");
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Check if user with given email exists.
     * 
     * Used to validate email availability during user registration.
     * More efficient than findByEmail for existence checks.
     * 
     * @param email the email to check
     * @return true if user with this email exists, false otherwise
     * 
     * @example
     * if (userRepository.existsByEmail("new@example.com")) {
     *     throw new EmailAlreadyExistsException();
     * }
     */
    boolean existsByEmail(String email);
}
