package com.wealthmanagementsystem.exception;

/**
 * Exception thrown when attempting to create a resource that already exists.
 * 
 * HTTP Status: 409 Conflict
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.7
 */
public class DuplicateResourceException extends RuntimeException {
    
    public DuplicateResourceException(String message) {
        super(message);
    }
    
    public DuplicateResourceException(String message, Throwable cause) {
        super(message, cause);
    }
}
