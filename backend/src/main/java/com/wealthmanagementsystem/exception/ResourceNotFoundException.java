package com.wealthmanagementsystem.exception;

/**
 * Exception thrown when a requested resource is not found.
 * 
 * HTTP Status: 404 Not Found
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.7
 */
public class ResourceNotFoundException extends RuntimeException {
    
    public ResourceNotFoundException(String message) {
        super(message);
    }
    
    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
