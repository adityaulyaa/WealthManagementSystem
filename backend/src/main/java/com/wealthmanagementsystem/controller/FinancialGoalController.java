package com.wealthmanagementsystem.controller;

import com.wealthmanagementsystem.dto.request.FinancialGoalRequest;
import com.wealthmanagementsystem.dto.response.FinancialGoalResponse;
import com.wealthmanagementsystem.entity.FinancialGoal;
import com.wealthmanagementsystem.entity.User;
import com.wealthmanagementsystem.mapper.FinancialGoalMapper;
import com.wealthmanagementsystem.service.FinancialGoalService;
import com.wealthmanagementsystem.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST Controller for FinancialGoal entity endpoints.
 * 
 * Provides HTTP endpoints for financial goal management operations.
 * Base path: /api/goals
 * 
 * Uses DTO layer for request/response conversion.
 * Service layer continues to use Entities.
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.5
 */
@RestController
@RequestMapping("/api/goals")
public class FinancialGoalController {
    
    private final FinancialGoalService financialGoalService;
    private final UserService userService;
    
    public FinancialGoalController(FinancialGoalService financialGoalService, UserService userService) {
        this.financialGoalService = financialGoalService;
        this.userService = userService;
    }
    
    /**
     * Create a new financial goal.
     * 
     * POST /api/goals
     */
    @PostMapping
    public ResponseEntity<FinancialGoalResponse> createGoal(@Valid @RequestBody FinancialGoalRequest request) {
        Optional<User> userOpt = userService.getUserById(request.getUserId());
        if (userOpt.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        FinancialGoal entity = FinancialGoalMapper.toEntity(request, userOpt.get());
        FinancialGoal created = financialGoalService.createGoal(entity);
        FinancialGoalResponse response = FinancialGoalMapper.toResponse(created);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    /**
     * Get goal by ID.
     * 
     * GET /api/goals/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<FinancialGoalResponse> getGoalById(@PathVariable Long id) {
        return financialGoalService.getGoalById(id)
                .map(goal -> {
                    FinancialGoalResponse response = FinancialGoalMapper.toResponse(goal);
                    return new ResponseEntity<>(response, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    /**
     * Get all goals.
     * 
     * GET /api/goals
     */
    @GetMapping
    public ResponseEntity<List<FinancialGoalResponse>> getAllGoals() {
        List<FinancialGoal> goals = financialGoalService.getAllGoals();
        List<FinancialGoalResponse> responses = goals.stream()
                .map(FinancialGoalMapper::toResponse)
                .collect(Collectors.toList());
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }
    
    /**
     * Get goals by user ID.
     * 
     * GET /api/goals/user/{userId}
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FinancialGoalResponse>> getGoalsByUserId(@PathVariable Long userId) {
        List<FinancialGoal> goals = financialGoalService.getGoalsByUserId(userId);
        List<FinancialGoalResponse> responses = goals.stream()
                .map(FinancialGoalMapper::toResponse)
                .collect(Collectors.toList());
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }
    
    /**
     * Update existing goal.
     * 
     * PUT /api/goals/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<FinancialGoalResponse> updateGoal(@PathVariable Long id, @Valid @RequestBody FinancialGoalRequest request) {
        Optional<FinancialGoal> existingOpt = financialGoalService.getGoalById(id);
        if (existingOpt.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        FinancialGoal existing = existingOpt.get();
        FinancialGoalMapper.updateEntity(existing, request);
        existing.setId(id);
        FinancialGoal updated = financialGoalService.updateGoal(existing);
        FinancialGoalResponse response = FinancialGoalMapper.toResponse(updated);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    /**
     * Delete goal by ID.
     * 
     * DELETE /api/goals/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGoal(@PathVariable Long id) {
        financialGoalService.deleteGoal(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
