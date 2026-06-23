package com.wealthmanagementsystem.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * JWT utility class for token generation and validation.
 * 
 * Handles JWT token operations including:
 * - Token generation from user email
 * - Token validation
 * - Email extraction from token
 * 
 * Uses HS256 signing algorithm with configurable secret and expiration.
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.8 Batch 2
 */
@Component
public class JwtUtil {
    
    @Value("${jwt.secret}")
    private String secret;
    
    @Value("${jwt.expiration}")
    private Long expiration;
    
    /**
     * Generate secret key from configured secret string.
     * 
     * @return SecretKey for JWT signing
     */
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
    
    /**
     * Generate JWT token for user email.
     * 
     * Token contains:
     * - Subject: user email
     * - Issued at: current timestamp
     * - Expiration: current timestamp + expiration time
     * 
     * @param email user email address
     * @return JWT token string
     */
    public String generateToken(String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);
        
        return Jwts.builder()
                .subject(email)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSigningKey())
                .compact();
    }
    
    /**
     * Extract email from JWT token.
     * 
     * @param token JWT token string
     * @return email address (subject claim)
     */
    public String extractEmail(String token) {
        Claims claims = extractAllClaims(token);
        return claims.getSubject();
    }
    
    /**
     * Validate JWT token.
     * 
     * Checks:
     * - Token is not expired
     * - Token signature is valid
     * 
     * @param token JWT token string
     * @return true if token is valid, false otherwise
     */
    public boolean validateToken(String token) {
        try {
            Claims claims = extractAllClaims(token);
            Date expiration = claims.getExpiration();
            return !expiration.before(new Date());
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Extract all claims from JWT token.
     * 
     * @param token JWT token string
     * @return Claims object
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
