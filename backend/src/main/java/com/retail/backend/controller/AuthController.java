package com.retail.backend.controller;

import com.retail.backend.dto.AuthLoginRequest;
import com.retail.backend.dto.AuthRegisterRequest;
import com.retail.backend.dto.AuthResponse;
import com.retail.backend.entity.User;
import com.retail.backend.repository.UserRepository;
import com.retail.backend.security.JwtUtil;
import com.retail.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRegisterRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setAddress(request.getAddress());
        user.setRole(request.getRole());
        user.setPassword(request.getPassword());

        User savedUser = userService.createUser(user);
        return ResponseEntity.ok(new AuthResponse(
                jwtUtil.generateToken(savedUser.getEmail()),
                savedUser.getUserId(),
                savedUser.getName(),
                savedUser.getRole()));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthLoginRequest request) {
        if (request == null || request.getEmail() == null || request.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            throw new IllegalArgumentException("Password is required");
        }

        String email = request.getEmail().trim();
        return userRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(request.getPassword(), user.getPassword()))
                .map(user -> ResponseEntity.ok(new AuthResponse(
                        jwtUtil.generateToken(user.getEmail()),
                        user.getUserId(),
                        user.getName(),
                        user.getRole())))
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
    }
}
