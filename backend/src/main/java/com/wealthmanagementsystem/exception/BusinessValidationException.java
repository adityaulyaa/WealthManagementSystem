package com.wealthmanagementsystem.exception;

/**
 * Exception thrown when business validation rules are violated.
 * 
 * HTTP Status: 400 Bad Request
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.7
 */
public class BusinessValidationException extends RuntimeException {
    
    public BusinessValidationException(String message) {
        super(message);
    }
    
    public BusinessValidationException(String message, Throwable cause) {
        super(message, cause);
    }
}
