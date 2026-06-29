package com.wealthmanagementsystem.service;

import com.wealthmanagementsystem.entity.FinancialGoal;
import com.wealthmanagementsystem.entity.GoalCategory;
import com.wealthmanagementsystem.entity.User;
import com.wealthmanagementsystem.repository.FinancialGoalRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FinancialGoalServiceTest {

    @Mock
    private FinancialGoalRepository goalRepository;

    @InjectMocks
    private FinancialGoalService financialGoalService;

    private FinancialGoal goal;
    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);

        goal = new FinancialGoal();
        goal.setId(1L);
        goal.setGoalName("Test Goal");
        goal.setTargetAmount(new BigDecimal("10000000"));
        goal.setTargetDate(LocalDate.of(2026, 12, 31));
        goal.setCategory(GoalCategory.EDUCATION);
        goal.setCurrentSavings(new BigDecimal("5000000"));
        goal.setMonthlyContribution(new BigDecimal("1000000"));
        goal.setUser(user);
    }

    @Test
    void createGoal_success() {
        when(goalRepository.save(any(FinancialGoal.class))).thenReturn(goal);

        FinancialGoal savedGoal = financialGoalService.createGoal(goal);

        assertNotNull(savedGoal);
    }
}
