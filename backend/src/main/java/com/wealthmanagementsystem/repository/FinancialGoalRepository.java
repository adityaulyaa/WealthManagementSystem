package com.wealthmanagementsystem.repository;

import com.wealthmanagementsystem.entity.FinancialGoal;
import com.wealthmanagementsystem.entity.GoalCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Repository interface for FinancialGoal entity.
 * 
 * Provides CRUD operations and custom query methods for goal management.
 * Extends Spring Data JPA JpaRepository for automatic implementation.
 * 
 * Database table: financial_goals
 * 
 * Business Rules:
 * - User can have multiple financial goals (1:N relationship)
 * - Each goal tracks progress towards target amount
 * - Progress is calculated at runtime (not stored)
 * - No direct relationship with Portfolio (independent planning)
 * 
 * @author Wealth Management System
 * @version 1.0
 * @since Phase 4.3
 */
@Repository
public interface FinancialGoalRepository extends JpaRepository<FinancialGoal, Long> {
    
    /**
     * Find all goals for a specific user.
     * 
     * Used to retrieve user's complete goal list on goals page or dashboard.
     * Returns all goals regardless of status.
     * 
     * @param userId the user's ID
     * @return List of all goals belonging to user (empty list if none found)
     * 
     * @example
     * List<FinancialGoal> allGoals = goalRepository.findByUserId(123L);
     */
    List<FinancialGoal> findByUserId(Long userId);
    
    /**
     * Find all goals for user, sorted by target date ascending.
     * 
     * Used to show goals ordered by deadline (earliest first).
     * Helps user prioritize which goals are most urgent.
     * 
     * @param userId the user's ID
     * @return List of goals sorted by target date (soonest first)
     * 
     * @example
     * List<FinancialGoal> urgent = goalRepository.findByUserIdOrderByTargetDateAsc(123L);
     */
    List<FinancialGoal> findByUserIdOrderByTargetDateAsc(Long userId);
    
    /**
     * Find goals of specific category for user.
     * 
     * Used for filtering goals by type (e.g., show only retirement goals).
     * 
     * @param userId the user's ID
     * @param category the goal category (RETIREMENT, EDUCATION, PROPERTY, EMERGENCY, OTHER)
     * @return List of goals in specified category
     * 
     * @example
     * List<FinancialGoal> retirement = goalRepository
     *     .findByUserIdAndCategory(123L, GoalCategory.RETIREMENT);
     */
    List<FinancialGoal> findByUserIdAndCategory(Long userId, GoalCategory category);
    
    /**
     * Find goals with target date in future (active goals).
     * 
     * Used to show only active/pending goals (not completed ones).
     * 
     * @param userId the user's ID
     * @param targetDate the date to compare against (usually today)
     * @return List of goals with target date after specified date
     * 
     * @example
     * List<FinancialGoal> active = goalRepository
     *     .findByUserIdAndTargetDateAfter(123L, LocalDate.now());
     */
    List<FinancialGoal> findByUserIdAndTargetDateAfter(Long userId, LocalDate targetDate);
    
    /**
     * Count number of goals for a user.
     * 
     * Used for dashboard display (e.g., "You have 5 goals").
     * More efficient than fetching full list just to count.
     * 
     * @param userId the user's ID
     * @return number of goals belonging to user
     * 
     * @example
     * long goalCount = goalRepository.countByUserId(123L);
     */
    long countByUserId(Long userId);
}
