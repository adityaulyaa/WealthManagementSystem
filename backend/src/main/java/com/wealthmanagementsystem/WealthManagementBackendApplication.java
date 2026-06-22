package com.wealthmanagementsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

/**
 * Wealth Management System - Main Application Starter
 * 
 * Phase 4 - Spring Boot Backend Foundation
 * 
 * This is the main entry point for the Spring Boot application.
 * The application starts with embedded Tomcat server on port 8080.
 * 
 * Key Features:
 * - Spring Boot 3.x with Java 17
 * - Spring Data JPA with Hibernate
 * - MySQL 8.0+ database connection
 * - REST API support
 * - Built-in error handling
 * 
 * @author System Architect
 * @version 1.0.0
 * @since 2026-06-22
 */
@SpringBootApplication
public class WealthManagementBackendApplication {

    /**
     * Application main entry point
     * 
     * @param args Command line arguments
     */
    public static void main(String[] args) {
        SpringApplication.run(WealthManagementBackendApplication.class, args);
    }

}
