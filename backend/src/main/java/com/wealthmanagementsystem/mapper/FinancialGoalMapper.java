package com.wealthmanagementsystem.mapper;

import com.wealthmanagementsystem.dto.request.FinancialGoalRequest;
import com.wealthmanagementsystem.dto.response.FinancialGoalResponse;
import com.wealthmanagementsystem.entity.FinancialGoal;
import com.wealthmanagementsystem.entity.User;

/**
 * Mapper class for FinancialGoal entity and DTOs.
 * 
 * Manual mapping implementation (no MapStruct).
 * All methods are static for easy access.
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.6
 */
public class FinancialGoalMapper {
    
    /**
     * Convert FinancialGoalRequest DTO to FinancialGoal entity.
     * 
     * @param request the FinancialGoalRequest DTO
     * @param user the User entity to associate with
     * @return FinancialGoal entity
     */
    public static FinancialGoal toEntity(FinancialGoalRequest request, User user) {
        if (request == null) {
            return null;
        }
        
        FinancialGoal goal = new FinancialGoal();
        goal.setUser(user);
        goal.setGoalName(request.getGoalName());
        goal.setTargetAmount(request.getTargetAmount());
        goal.setTargetDate(request.getTargetDate());
        goal.setCategory(request.getCategory());
        goal.setCurrentSavings(request.getCurrentSavings());
        goal.setMonthlyContribution(request.getMonthlyContribution());
        
        return goal;
    }
    
    /**
     * Convert FinancialGoal entity to FinancialGoalResponse DTO.
     * 
     * @param goal the FinancialGoal entity
     * @return FinancialGoalResponse DTO
     */
    public static FinancialGoalResponse toResponse(FinancialGoal goal) {
        if (goal == null) {
            return null;
        }
        
        FinancialGoalResponse response = new FinancialGoalResponse();
        response.setId(goal.getId());
        response.setUserId(goal.getUser() != null ? goal.getUser().getId() : null);
        response.setGoalName(goal.getGoalName());
        response.setTargetAmount(goal.getTargetAmount());
        response.setTargetDate(goal.getTargetDate());
        response.setCategory(goal.getCategory());
        response.setCurrentSavings(goal.getCurrentSavings());
        response.setMonthlyContribution(goal.getMonthlyContribution());
        response.setCreatedAt(goal.getCreatedAt());
        response.setUpdatedAt(goal.getUpdatedAt());
        
        return response;
    }
    
    /**
     * Update existing FinancialGoal entity with data from FinancialGoalRequest.
     * 
     * @param goal the FinancialGoal entity to update
     * @param request the FinancialGoalRequest DTO with new data
     */
    public static void updateEntity(FinancialGoal goal, FinancialGoalRequest request) {
        if (goal == null || request == null) {
            return;
        }
        
        if (request.getGoalName() != null) {
            goal.setGoalName(request.getGoalName());
        }
        if (request.getTargetAmount() != null) {
            goal.setTargetAmount(request.getTargetAmount());
        }
        if (request.getTargetDate() != null) {
            goal.setTargetDate(request.getTargetDate());
        }
        if (request.getCategory() != null) {
            goal.setCategory(request.getCategory());
        }
        if (request.getCurrentSavings() != null) {
            goal.setCurrentSavings(request.getCurrentSavings());
        }
        if (request.getMonthlyContribution() != null) {
            goal.setMonthlyContribution(request.getMonthlyContribution());
        }
    }
}
