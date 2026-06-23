package com.wealthmanagementsystem.controller;

import com.wealthmanagementsystem.entity.FinancialGoal;
import com.wealthmanagementsystem.service.FinancialGoalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for FinancialGoal entity endpoints.
 * 
 * Provides HTTP endpoints for financial goal management operations.
 * Base path: /api/goals
 * 
 * Endpoints:
 * - POST   /api/goals           - Create new financial goal
 * - GET    /api/goals/{id}      - Get goal by ID
 * - GET    /api/goals           - Get all goals
 * - GET    /api/goals/user/{userId} - Get goals by user ID
 * - PUT    /api/goals/{id}      - Update goal
 * - DELETE /api/goals/{id}      - Delete goal
 * 
 * Note: Authentication/Authorization not implemented yet (Phase 4.6)
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.5
 */
@RestController
@RequestMapping("/api/goals")
public class FinancialGoalController {
    
    private final FinancialGoalService financialGoalService;
    
    /**
     * Constructor injection for FinancialGoalService.
     * 
     * @param financialGoalService the financial goal service
     */
    public FinancialGoalController(FinancialGoalService financialGoalService) {
        this.financialGoalService = financialGoalService;
    }
    
    /**
     * Create a new financial goal.
     * 
     * POST /api/goals
     * 
     * @param goal the financial goal to create (from request body)
     * @return ResponseEntity with created goal and HTTP 201 (Created)
     * 
     * @example
     * POST /api/goals
     * Body: { "user": {...}, "goalName": "House Down Payment", "targetAmount": 500000000, "targetDate": "2030-12-31" }
     * Response: 201 Created with created goal
     */
    @PostMapping
    public ResponseEntity<FinancialGoal> createGoal(@RequestBody FinancialGoal goal) {
        FinancialGoal created = financialGoalService.createGoal(goal);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
    
    /**
     * Get goal by ID.
     * 
     * GET /api/goals/{id}
     * 
     * @param id the goal's ID
     * @return ResponseEntity with goal if found (200 OK), or 404 Not Found
     * 
     * @example
     * GET /api/goals/123
     * Response: 200 OK with goal data
     */
    @GetMapping("/{id}")
    public ResponseEntity<FinancialGoal> getGoalById(@PathVariable Long id) {
        return financialGoalService.getGoalById(id)
                .map(goal -> new ResponseEntity<>(goal, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    /**
     * Get all goals.
     * 
     * GET /api/goals
     * 
     * @return ResponseEntity with list of all goals (200 OK)
     * 
     * @example
     * GET /api/goals
     * Response: 200 OK with array of goals
     */
    @GetMapping
    public ResponseEntity<List<FinancialGoal>> getAllGoals() {
        List<FinancialGoal> goals = financialGoalService.getAllGoals();
        return new ResponseEntity<>(goals, HttpStatus.OK);
    }
    
    /**
     * Get goals by user ID.
     * 
     * GET /api/goals/user/{userId}
     * 
     * @param userId the user's ID
     * @return ResponseEntity with list of user's goals (200 OK)
     * 
     * @example
     * GET /api/goals/user/123
     * Response: 200 OK with array of user's goals
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FinancialGoal>> getGoalsByUserId(@PathVariable Long userId) {
        List<FinancialGoal> goals = financialGoalService.getGoalsByUserId(userId);
        return new ResponseEntity<>(goals, HttpStatus.OK);
    }
    
    /**
     * Update existing goal.
     * 
     * PUT /api/goals/{id}
     * 
     * @param id the goal's ID
     * @param goal the goal with updated information
     * @return ResponseEntity with updated goal (200 OK)
     * 
     * @example
     * PUT /api/goals/123
     * Body: { "id": 123, "goalName": "House Down Payment", "targetAmount": 600000000, ... }
     * Response: 200 OK with updated goal
     */
    @PutMapping("/{id}")
    public ResponseEntity<FinancialGoal> updateGoal(@PathVariable Long id, @RequestBody FinancialGoal goal) {
        goal.setId(id);
        FinancialGoal updated = financialGoalService.updateGoal(goal);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }
    
    /**
     * Delete goal by ID.
     * 
     * DELETE /api/goals/{id}
     * 
     * @param id the goal's ID to delete
     * @return ResponseEntity with no content (204 No Content)
     * 
     * @example
     * DELETE /api/goals/123
     * Response: 204 No Content
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGoal(@PathVariable Long id) {
        financialGoalService.deleteGoal(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
