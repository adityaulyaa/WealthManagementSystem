package com.wealthmanagementsystem.controller;

import com.wealthmanagementsystem.entity.Portfolio;
import com.wealthmanagementsystem.service.PortfolioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for Portfolio entity endpoints.
 * 
 * Provides HTTP endpoints for portfolio management operations.
 * Base path: /api/portfolios
 * 
 * Endpoints:
 * - POST   /api/portfolios           - Create new portfolio
 * - GET    /api/portfolios/{id}      - Get portfolio by ID
 * - GET    /api/portfolios           - Get all portfolios
 * - GET    /api/portfolios/user/{userId} - Get portfolios by user ID
 * - PUT    /api/portfolios/{id}      - Update portfolio
 * - DELETE /api/portfolios/{id}      - Delete portfolio
 * 
 * Note: Authentication/Authorization not implemented yet (Phase 4.6)
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.5
 */
@RestController
@RequestMapping("/api/portfolios")
public class PortfolioController {
    
    private final PortfolioService portfolioService;
    
    /**
     * Constructor injection for PortfolioService.
     * 
     * @param portfolioService the portfolio service
     */
    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }
    
    /**
     * Create a new portfolio.
     * 
     * POST /api/portfolios
     * 
     * @param portfolio the portfolio to create (from request body)
     * @return ResponseEntity with created portfolio and HTTP 201 (Created)
     * 
     * @example
     * POST /api/portfolios
     * Body: { "user": {...}, "portfolioName": "Retirement Fund", "riskLevel": "MEDIUM" }
     * Response: 201 Created with created portfolio
     */
    @PostMapping
    public ResponseEntity<Portfolio> createPortfolio(@Valid @RequestBody Portfolio portfolio) {
        Portfolio created = portfolioService.createPortfolio(portfolio);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
    
    /**
     * Get portfolio by ID.
     * 
     * GET /api/portfolios/{id}
     * 
     * @param id the portfolio's ID
     * @return ResponseEntity with portfolio if found (200 OK), or 404 Not Found
     * 
     * @example
     * GET /api/portfolios/123
     * Response: 200 OK with portfolio data
     */
    @GetMapping("/{id}")
    public ResponseEntity<Portfolio> getPortfolioById(@PathVariable Long id) {
        return portfolioService.getPortfolioById(id)
                .map(portfolio -> new ResponseEntity<>(portfolio, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    /**
     * Get all portfolios.
     * 
     * GET /api/portfolios
     * 
     * @return ResponseEntity with list of all portfolios (200 OK)
     * 
     * @example
     * GET /api/portfolios
     * Response: 200 OK with array of portfolios
     */
    @GetMapping
    public ResponseEntity<List<Portfolio>> getAllPortfolios() {
        List<Portfolio> portfolios = portfolioService.getAllPortfolios();
        return new ResponseEntity<>(portfolios, HttpStatus.OK);
    }
    
    /**
     * Get portfolios by user ID.
     * 
     * GET /api/portfolios/user/{userId}
     * 
     * @param userId the user's ID
     * @return ResponseEntity with list of user's portfolios (200 OK)
     * 
     * @example
     * GET /api/portfolios/user/123
     * Response: 200 OK with array of user's portfolios
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Portfolio>> getPortfoliosByUserId(@PathVariable Long userId) {
        List<Portfolio> portfolios = portfolioService.getPortfoliosByUserId(userId);
        return new ResponseEntity<>(portfolios, HttpStatus.OK);
    }
    
    /**
     * Update existing portfolio.
     * 
     * PUT /api/portfolios/{id}
     * 
     * @param id the portfolio's ID
     * @param portfolio the portfolio with updated information
     * @return ResponseEntity with updated portfolio (200 OK)
     * 
     * @example
     * PUT /api/portfolios/123
     * Body: { "id": 123, "portfolioName": "Growth Fund", "riskLevel": "HIGH", ... }
     * Response: 200 OK with updated portfolio
     */
    @PutMapping("/{id}")
    public ResponseEntity<Portfolio> updatePortfolio(@PathVariable Long id, @Valid @RequestBody Portfolio portfolio) {
        portfolio.setId(id);
        Portfolio updated = portfolioService.updatePortfolio(portfolio);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }
    
    /**
     * Delete portfolio by ID.
     * 
     * DELETE /api/portfolios/{id}
     * 
     * @param id the portfolio's ID to delete
     * @return ResponseEntity with no content (204 No Content)
     * 
     * @example
     * DELETE /api/portfolios/123
     * Response: 204 No Content
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePortfolio(@PathVariable Long id) {
        portfolioService.deletePortfolio(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
