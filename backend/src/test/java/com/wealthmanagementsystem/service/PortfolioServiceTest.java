package com.wealthmanagementsystem.service;

import com.wealthmanagementsystem.entity.Asset;
import com.wealthmanagementsystem.entity.AssetType;
import com.wealthmanagementsystem.entity.Portfolio;
import com.wealthmanagementsystem.entity.PortfolioAsset;
import com.wealthmanagementsystem.entity.RiskLevel;
import com.wealthmanagementsystem.entity.User;
import com.wealthmanagementsystem.repository.PortfolioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PortfolioServiceTest {

    @Mock
    private PortfolioRepository portfolioRepository;

    @InjectMocks
    private PortfolioService portfolioService;

    private User user;
    private Portfolio portfolio;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);

        portfolio = new Portfolio();
        portfolio.setId(1L);
        portfolio.setPortfolioName("Test Portfolio");
        portfolio.setPortfolioType("INVESTMENT");
        portfolio.setRiskLevel(RiskLevel.MEDIUM);
        portfolio.setUser(user);

        Asset asset1 = new Asset();
        asset1.setId(101L);
        asset1.setAssetName("Stock A");
        asset1.setAssetType(AssetType.STOCK);

        PortfolioAsset portfolioAsset1 = new PortfolioAsset();
        portfolioAsset1.setAsset(asset1);
        portfolioAsset1.setAllocationPercentage(new BigDecimal("100.00"));
        portfolioAsset1.setPortfolio(portfolio);

        portfolio.setAssets(Collections.singletonList(portfolioAsset1));
    }

    @Test
    void createPortfolio_success() {
        when(portfolioRepository.save(any(Portfolio.class))).thenReturn(portfolio);

        Portfolio savedPortfolio = portfolioService.createPortfolio(portfolio);

        assertNotNull(savedPortfolio);
        assertEquals(1, savedPortfolio.getAssets().size());
        verify(portfolioRepository, times(1)).save(any(Portfolio.class));
    }

    @Test
    void createPortfolio_invalidData_throwsException() {
        Portfolio invalidPortfolio = new Portfolio(); // Missing user, name, etc.
        assertThrows(IllegalArgumentException.class, () -> portfolioService.createPortfolio(invalidPortfolio));
        verify(portfolioRepository, never()).save(any(Portfolio.class));
    }

    @Test
    void getPortfolioById_found() {
        when(portfolioRepository.findById(anyLong())).thenReturn(Optional.of(portfolio));

        Optional<Portfolio> foundPortfolio = portfolioService.getPortfolioById(1L);

        assertTrue(foundPortfolio.isPresent());
        assertEquals("Test Portfolio", foundPortfolio.get().getPortfolioName());
    }

    @Test
    void getPortfolioById_notFound() {
        when(portfolioRepository.findById(anyLong())).thenReturn(Optional.empty());

        Optional<Portfolio> foundPortfolio = portfolioService.getPortfolioById(2L);

        assertFalse(foundPortfolio.isPresent());
    }

    @Test
    void updatePortfolio_success() {
        when(portfolioRepository.save(any(Portfolio.class))).thenReturn(portfolio);

        Portfolio updatedPortfolio = portfolioService.updatePortfolio(portfolio);

        assertNotNull(updatedPortfolio);
        verify(portfolioRepository, times(1)).save(any(Portfolio.class));
    }

    @Test
    void deletePortfolio_success() {
        portfolioService.deletePortfolio(1L);
        verify(portfolioRepository, times(1)).deleteById(1L);
    }
}
