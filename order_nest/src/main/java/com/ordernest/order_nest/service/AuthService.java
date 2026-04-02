package com.ordernest.order_nest.service;

import com.ordernest.order_nest.model.User;
import com.ordernest.order_nest.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public User signup(User user){

        user.setRole("USER");

        return userRepository.save(user);
    }

    public User login(String email, String password){

        Optional<User> user = userRepository.findByEmail(email);

        if(user.isPresent() && user.get().getPassword().equals(password)){
            return user.get();
        }

        throw new RuntimeException("Invalid email or password");
    }
}