package com.gym.service;

import com.gym.dto.LoginRequest;
import com.gym.dto.SignupRequest;
import com.gym.entity.User;

public interface AuthService {
    User signup(SignupRequest request);
    String login(LoginRequest request);
} 