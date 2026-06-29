package com.wealthmanagementsystem.service;

import com.wealthmanagementsystem.entity.Portfolio;
import com.wealthmanagementsystem.entity.RiskLevel;
import com.wealthmanagementsystem.entity.User;
import com.wealthmanagementsystem.repository.PortfolioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PortfolioServiceTest {

    @Mock
    private PortfolioRepository portfolioRepository;

    @InjectMocks
    private PortfolioService portfolioService;

    private Portfolio portfolio;
    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);

        portfolio = new Portfolio();
        portfolio.setId(1L);
        portfolio.setPortfolioName("Test Portfolio");
        portfolio.setPortfolioType("INVESTMENT"); // Added this line
        portfolio.setRiskLevel(RiskLevel.MEDIUM);
        portfolio.setUser(user);
    }

    @Test
    void createPortfolio_success() {
        when(portfolioRepository.save(any(Portfolio.class))).thenReturn(portfolio);

        Portfolio savedPortfolio = portfolioService.createPortfolio(portfolio);

        assertNotNull(savedPortfolio);
    }
}
