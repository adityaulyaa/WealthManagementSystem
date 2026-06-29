package com.wealthmanagementsystem.controller;

import com.wealthmanagementsystem.dto.request.PortfolioRequest;
import com.wealthmanagementsystem.dto.response.PortfolioResponse;
import com.wealthmanagementsystem.entity.Portfolio;
import com.wealthmanagementsystem.entity.User;
import com.wealthmanagementsystem.mapper.PortfolioMapper;
import com.wealthmanagementsystem.service.PortfolioService;
import com.wealthmanagementsystem.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST Controller for Portfolio entity endpoints.
 * 
 * Provides HTTP endpoints for portfolio management operations.
 * Base path: /api/portfolios
 * 
 * Uses DTO layer for request/response conversion.
 * Service layer continues to use Entities.
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.5 (Updated for Phase 5.5)
 */
@RestController
@RequestMapping("/api/portfolios")
public class PortfolioController {
    
    private final PortfolioService portfolioService;
    private final UserService userService;
    private final PortfolioMapper portfolioMapper;
    
    public PortfolioController(PortfolioService portfolioService, UserService userService, PortfolioMapper portfolioMapper) {
        this.portfolioService = portfolioService;
        this.userService = userService;
        this.portfolioMapper = portfolioMapper;
    }
    
    /**
     * Create a new portfolio.
     * 
     * POST /api/portfolios
     */
    @PostMapping
    public ResponseEntity<PortfolioResponse> createPortfolio(@Valid @RequestBody PortfolioRequest request) {
        Optional<User> userOpt = userService.getUserById(request.getUserId());
        if (userOpt.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        Portfolio entity = portfolioMapper.toEntity(request, userOpt.get());
        Portfolio created = portfolioService.createPortfolio(entity);
        PortfolioResponse response = portfolioMapper.toResponse(created);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    /**
     * Get portfolio by ID.
     * 
     * GET /api/portfolios/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<PortfolioResponse> getPortfolioById(@PathVariable Long id) {
        return portfolioService.getPortfolioById(id)
                .map(portfolio -> {
                    PortfolioResponse response = portfolioMapper.toResponse(portfolio);
                    return new ResponseEntity<>(response, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    /**
     * Get all portfolios.
     * 
     * GET /api/portfolios
     */
    @GetMapping
    public ResponseEntity<List<PortfolioResponse>> getAllPortfolios() {
        List<Portfolio> portfolios = portfolioService.getAllPortfolios();
        List<PortfolioResponse> responses = portfolios.stream()
                .map(portfolioMapper::toResponse)
                .collect(Collectors.toList());
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }
    
    /**
     * Get portfolios by user ID.
     * 
     * GET /api/portfolios/user/{userId}
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PortfolioResponse>> getPortfoliosByUserId(@PathVariable Long userId) {
        List<Portfolio> portfolios = portfolioService.getPortfoliosByUserId(userId);
        List<PortfolioResponse> responses = portfolios.stream()
                .map(portfolioMapper::toResponse)
                .collect(Collectors.toList());
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }
    
    /**
     * Update existing portfolio.
     * 
     * PUT /api/portfolios/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<PortfolioResponse> updatePortfolio(@PathVariable Long id, @Valid @RequestBody PortfolioRequest request) {
        Optional<Portfolio> existingOpt = portfolioService.getPortfolioById(id);
        if (existingOpt.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        Portfolio existing = existingOpt.get();
        portfolioMapper.updateEntity(existing, request);
        existing.setId(id);
        Portfolio updated = portfolioService.updatePortfolio(existing);
        PortfolioResponse response = portfolioMapper.toResponse(updated);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    /**
     * Delete portfolio by ID.
     * 
     * DELETE /api/portfolios/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePortfolio(@PathVariable Long id) {
        portfolioService.deletePortfolio(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}