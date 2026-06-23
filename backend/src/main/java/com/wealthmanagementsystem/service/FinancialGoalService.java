package com.wealthmanagementsystem.service;

import com.wealthmanagementsystem.entity.FinancialGoal;
import com.wealthmanagementsystem.entity.GoalCategory;
import com.wealthmanagementsystem.repository.FinancialGoalRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Service layer for FinancialGoal entity business logic.
 * 
 * Handles financial goal management operations including:
 * - Goal CRUD operations
 * - Goal queries by user and category
 * - Progress calculation (at runtime)
 * - Goal status determination
 * 
 * This service uses FinancialGoalRepository for data access.
 * Constructor injection is used for dependency management.
 * 
 * Business Rules:
 * - User can have multiple financial goals (1:N relationship)
 * - Goals are independent from portfolios
 * - Progress calculated at runtime (not persisted)
 * - Status: ON_TRACK, AT_RISK, or OFF_TRACK
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.4
 */
@Service
@Transactional
public class FinancialGoalService {
    
    private final FinancialGoalRepository goalRepository;
    
    /**
     * Constructor injection for FinancialGoalRepository.
     * 
     * @param goalRepository the financial goal repository
     */
    public FinancialGoalService(FinancialGoalRepository goalRepository) {
        this.goalRepository = goalRepository;
    }
    
    /**
     * Create a new financial goal.
     * 
     * Validates goal data before creation.
     * 
     * @param goal the goal to create
     * @return the created goal with generated ID
     * @throws IllegalArgumentException if goal data is invalid
     * 
     * @example
     * FinancialGoal goal = new FinancialGoal();
     * goal.setUser(user);
     * goal.setGoalName("House Down Payment");
     * goal.setTargetAmount(BigDecimal.valueOf(500000000));
     * goal.setTargetDate(LocalDate.of(2030, 12, 31));
     * FinancialGoal created = goalService.createGoal(goal);
     */
    public FinancialGoal createGoal(FinancialGoal goal) {
        validateGoal(goal);
        return goalRepository.save(goal);
    }
    
    /**
     * Get goal by ID.
     * 
     * @param goalId the goal's ID
     * @return Optional containing goal if found, empty otherwise
     * 
     * @example
     * Optional<FinancialGoal> goal = goalService.getGoalById(123L);
     */
    public Optional<FinancialGoal> getGoalById(Long goalId) {
        return goalRepository.findById(goalId);
    }
    
    /**
     * Get all goals for a specific user.
     * 
     * Returns user's complete goal list.
     * 
     * @param userId the user's ID
     * @return List of goals belonging to user (empty list if none found)
     * 
     * @example
     * List<FinancialGoal> userGoals = goalService.getGoalsByUserId(123L);
     */
    public List<FinancialGoal> getGoalsByUserId(Long userId) {
        return goalRepository.findByUserId(userId);
    }
    
    /**
     * Get all goals for user, sorted by target date (soonest first).
     * 
     * Used for displaying goals ordered by deadline/urgency.
     * 
     * @param userId the user's ID
     * @return List of goals sorted by target date (soonest first)
     * 
     * @example
     * List<FinancialGoal> urgent = goalService.getGoalsByUserIdSorted(123L);
     */
    public List<FinancialGoal> getGoalsByUserIdSorted(Long userId) {
        return goalRepository.findByUserIdOrderByTargetDateAsc(userId);
    }
    
    /**
     * Get goals by user ID and category.
     * 
     * Used for filtering goals by type (e.g., show only retirement goals).
     * 
     * @param userId the user's ID
     * @param category the goal category (RETIREMENT, EDUCATION, PROPERTY, EMERGENCY, OTHER)
     * @return List of goals in specified category
     * 
     * @example
     * List<FinancialGoal> retirement = goalService
     *     .getGoalsByUserIdAndCategory(123L, GoalCategory.RETIREMENT);
     */
    public List<FinancialGoal> getGoalsByUserIdAndCategory(Long userId, GoalCategory category) {
        return goalRepository.findByUserIdAndCategory(userId, category);
    }
    
    /**
     * Get active goals (target date in future).
     * 
     * Used to display only pending/uncompleted goals.
     * 
     * @param userId the user's ID
     * @return List of active goals with future target dates
     * 
     * @example
     * List<FinancialGoal> active = goalService.getActiveGoalsByUserId(123L);
     */
    public List<FinancialGoal> getActiveGoalsByUserId(Long userId) {
        return goalRepository.findByUserIdAndTargetDateAfter(userId, LocalDate.now());
    }
    
    /**
     * Get all goals.
     * 
     * Note: Use with caution - may return large datasets.
     * Consider pagination for production use.
     * 
     * @return List of all goals
     * 
     * @example
     * List<FinancialGoal> allGoals = goalService.getAllGoals();
     */
    public List<FinancialGoal> getAllGoals() {
        return goalRepository.findAll();
    }
    
    /**
     * Update existing goal.
     * 
     * Updates goal information. Goal must exist (has ID).
     * 
     * @param goal the goal with updated information
     * @return the updated goal
     * @throws IllegalArgumentException if goal ID is null or data invalid
     * 
     * @example
     * FinancialGoal goal = goalService.getGoalById(123L).orElseThrow();
     * goal.setCurrentSavings(BigDecimal.valueOf(100000000));
     * FinancialGoal updated = goalService.updateGoal(goal);
     */
    public FinancialGoal updateGoal(FinancialGoal goal) {
        if (goal.getId() == null) {
            throw new IllegalArgumentException("Cannot update goal without ID");
        }
        validateGoal(goal);
        return goalRepository.save(goal);
    }
    
    /**
     * Delete goal by ID.
     * 
     * Deletes goal from user's goal list.
     * 
     * @param goalId the goal's ID to delete
     * 
     * @example
     * goalService.deleteGoal(123L);
     */
    public void deleteGoal(Long goalId) {
        goalRepository.deleteById(goalId);
    }
    
    /**
     * Count total goals for a user.
     * 
     * Used for statistics and validation.
     * 
     * @param userId the user's ID
     * @return number of goals belonging to user
     * 
     * @example
     * long count = goalService.countGoalsByUserId(123L);
     */
    public long countGoalsByUserId(Long userId) {
        return goalRepository.countByUserId(userId);
    }
    
    /**
     * Count total number of goals.
     * 
     * Used for statistics and dashboard displays.
     * 
     * @return total goal count
     * 
     * @example
     * long totalGoals = goalService.countAllGoals();
     */
    public long countAllGoals() {
        return goalRepository.count();
    }
    
    /**
     * Validate goal data.
     * 
     * Private helper method to validate goal before save.
     * 
     * @param goal the goal to validate
     * @throws IllegalArgumentException if validation fails
     */
    private void validateGoal(FinancialGoal goal) {
        if (goal.getUser() == null) {
            throw new IllegalArgumentException("Goal must have a user");
        }
        if (goal.getGoalName() == null || goal.getGoalName().trim().isEmpty()) {
            throw new IllegalArgumentException("Goal name is required");
        }
        if (goal.getTargetAmount() == null || goal.getTargetAmount().signum() <= 0) {
            throw new IllegalArgumentException("Target amount must be positive");
        }
        if (goal.getTargetDate() == null) {
            throw new IllegalArgumentException("Target date is required");
        }
        if (goal.getCategory() == null) {
            throw new IllegalArgumentException("Goal category is required");
        }
    }
}
