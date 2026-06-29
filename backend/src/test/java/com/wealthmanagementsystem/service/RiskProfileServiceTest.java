package com.wealthmanagementsystem.service;

import com.wealthmanagementsystem.entity.RiskLevel;
import com.wealthmanagementsystem.entity.RiskProfile;
import com.wealthmanagementsystem.entity.User;
import com.wealthmanagementsystem.repository.RiskProfileRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong; // Import this
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RiskProfileServiceTest {

    @Mock
    private RiskProfileRepository riskProfileRepository;

    @InjectMocks
    private RiskProfileService riskProfileService;

    private RiskProfile riskProfile;
    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);

        riskProfile = new RiskProfile();
        riskProfile.setId(1L);
        riskProfile.setRiskLevel(RiskLevel.MEDIUM);
        riskProfile.setTimeHorizonYears(10);
        riskProfile.setUser(user);
    }

    @Test
    void createRiskProfile_success() {
        when(riskProfileRepository.save(any(RiskProfile.class))).thenReturn(riskProfile);

        RiskProfile savedProfile = riskProfileService.createRiskProfile(riskProfile);

        assertNotNull(savedProfile);
    }

    @Test
    void getRiskProfileByUserId_found() {
        when(riskProfileRepository.findByUserId(anyLong())).thenReturn(Optional.of(riskProfile));
        Optional<RiskProfile> foundProfile = riskProfileService.getRiskProfileByUserId(1L);
        assertTrue(foundProfile.isPresent());
    }

    @Test
    void getRiskProfileByUserId_notFound() {
        when(riskProfileRepository.findByUserId(anyLong())).thenReturn(Optional.empty());
        Optional<RiskProfile> foundProfile = riskProfileService.getRiskProfileByUserId(2L);
        assertFalse(foundProfile.isPresent());
    }
}
