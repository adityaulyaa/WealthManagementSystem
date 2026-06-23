package com.wealthmanagementsystem.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

/**
 * JWT authentication filter for validating JWT tokens on requests.
 * 
 * Intercepts HTTP requests to:
 * - Extract Authorization header
 * - Validate Bearer token
 * - Extract user email from token
 * - Set authentication in SecurityContext
 * 
 * This filter runs once per request before Spring Security's authentication.
 * 
 * Note: UserDetailsService integration will be added in Batch 3.
 * Currently creates simple authentication with email only.
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.8 Batch 2
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    private final JwtUtil jwtUtil;
    
    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }
    
    /**
     * Filter logic executed once per request.
     * 
     * Process:
     * 1. Extract Authorization header
     * 2. Check for Bearer token format
     * 3. Extract JWT token
     * 4. Validate token
     * 5. Extract email from token
     * 6. Create authentication object
     * 7. Set authentication in SecurityContext
     * 8. Continue filter chain
     * 
     * @param request HTTP request
     * @param response HTTP response
     * @param filterChain filter chain
     * @throws ServletException if servlet error occurs
     * @throws IOException if I/O error occurs
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {
        
        try {
            // Extract Authorization header
            String authHeader = request.getHeader("Authorization");
            
            // Check if header exists and starts with "Bearer "
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                // Extract token (remove "Bearer " prefix)
                String token = authHeader.substring(7);
                
                // Validate token
                if (jwtUtil.validateToken(token)) {
                    // Extract email from token
                    String email = jwtUtil.extractEmail(token);
                    
                    // Check if authentication is not already set
                    if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                        // Create authentication token
                        // Note: Using empty authorities list for now
                        // Will be enhanced with UserDetailsService in Batch 3
                        UsernamePasswordAuthenticationToken authentication = 
                                new UsernamePasswordAuthenticationToken(
                                        email, 
                                        null, 
                                        new ArrayList<>()
                                );
                        
                        // Set request details
                        authentication.setDetails(
                                new WebAuthenticationDetailsSource().buildDetails(request)
                        );
                        
                        // Set authentication in SecurityContext
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            }
        } catch (Exception e) {
            // Log error but don't block request
            // Invalid tokens will simply not be authenticated
            logger.error("JWT authentication error: " + e.getMessage());
        }
        
        // Continue filter chain
        filterChain.doFilter(request, response);
    }
}
