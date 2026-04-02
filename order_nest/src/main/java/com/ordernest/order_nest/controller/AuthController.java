package com.ordernest.order_nest.controller;

import com.ordernest.order_nest.model.User;
import com.ordernest.order_nest.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public User signup(@RequestBody User user){
        return authService.signup(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody Map<String,String> request){

        String email = request.get("email");
        String password = request.get("password");

        return authService.login(email,password);
    }
}