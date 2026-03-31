package com.retail.backend.service;

import com.retail.backend.entity.User;
import com.retail.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createUser(User user) {
        validateUser(user);

        user.setEmail(user.getEmail().trim());
        user.setRole(user.getRole().trim().toUpperCase());
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already registered");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    private void validateUser(User user) {
        if (user == null) {
            throw new IllegalArgumentException("User details are required");
        }
        if (user.getName() == null || user.getName().isBlank()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (user.getEmail() == null || user.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (user.getAddress() == null || user.getAddress().isBlank()) {
            throw new IllegalArgumentException("Address is required");
        }
        if (user.getRole() == null || user.getRole().isBlank()) {
            throw new IllegalArgumentException("Role is required");
        }
        if (user.getPassword() == null || user.getPassword().isBlank()) {
            throw new IllegalArgumentException("Password is required");
        }
    }
}
