package com.wealthmanagementsystem.service;

import com.wealthmanagementsystem.entity.User;
import com.wealthmanagementsystem.exception.BusinessValidationException;
import com.wealthmanagementsystem.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setEmail("test@example.com");
        user.setPasswordHash("hashed_password");
        user.setFullName("Test User");
    }

    @Test
    void createUser_success() {
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encoded_password");
        when(userRepository.save(any(User.class))).thenReturn(user);

        User savedUser = userService.createUser(user);

        assertNotNull(savedUser);
        assertEquals("encoded_password", savedUser.getPasswordHash());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void createUser_emailExists() {
        when(userRepository.existsByEmail(anyString())).thenReturn(true);

        assertThrows(IllegalArgumentException.class, () -> userService.createUser(user));
    }

    @Test
    void getUserByEmail_found() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));

        Optional<User> foundUser = userService.getUserByEmail("test@example.com");

        assertTrue(foundUser.isPresent());
        assertEquals("test@example.com", foundUser.get().getEmail());
    }

    @Test
    void getUserByEmail_notFound() {
        when(userRepository.findByEmail("notfound@example.com")).thenReturn(Optional.empty());

        Optional<User> foundUser = userService.getUserByEmail("notfound@example.com");

        assertFalse(foundUser.isPresent());
    }

    @Test
    void updateUser_success() {
        // updateUser doesn't call findById, it just saves the user
        when(userRepository.save(any(User.class))).thenReturn(user);

        User updatedUser = userService.updateUser(user);

        assertNotNull(updatedUser);
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void deleteUser_success() {
        doNothing().when(userRepository).deleteById(1L);

        userService.deleteUser(1L);

        verify(userRepository, times(1)).deleteById(1L);
    }
}