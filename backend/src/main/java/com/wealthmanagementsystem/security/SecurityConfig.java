package com.wealthmanagementsystem.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Security configuration for the application.
 * 
 * Configures Spring Security for JWT-based authentication.
 * Phase 4.8 Batch 1 - Security Foundation.
 * 
 * Configuration:
 * - BCrypt password encoding
 * - Stateless session management
 * - CSRF disabled (API-only application)
 * - Public endpoints: /api/auth/**
 * - Protected endpoints: /api/users/**, /api/portfolios/**, /api/goals/**, /api/risk-profiles/**
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.8
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }
    
    /**
     * Password encoder bean using BCrypt algorithm.
     * 
     * BCrypt is a strong hashing algorithm designed for passwords.
     * Uses adaptive hashing with configurable strength (default 10 rounds).
     * 
     * @return BCryptPasswordEncoder instance
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    /**
     * Security filter chain configuration.
     * 
     * Configures HTTP security rules for the application.
     * 
     * @param http HttpSecurity object to configure
     * @return SecurityFilterChain
     * @throws Exception if configuration fails
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF for stateless API
            .csrf(csrf -> csrf.disable())
            
            // Configure authorization rules
            .authorizeHttpRequests(auth -> auth
                // Public endpoints (authentication)
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/users").permitAll()
                
                // Protected endpoints (require authentication)
                .requestMatchers("/api/users/**").authenticated()
                .requestMatchers("/api/portfolios/**").authenticated()
                .requestMatchers("/api/goals/**").authenticated()
                .requestMatchers("/api/risk-profiles/**").authenticated()
                
                // All other requests require authentication
                .anyRequest().authenticated()
            )
            
            // Stateless session management (no session cookies)
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            
            // Add JWT authentication filter
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
}
