package com.quizapp.util;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class JwtUtilTest {

    @Autowired
    private JwtUtil jwtUtil;

    @Test
    void generateTokenSuccessfully() {
        String username = "testuser";
        String token = jwtUtil.generateToken(username);
        
        assertTrue(token != null && !token.isEmpty());
        assertEquals(username, jwtUtil.extractUsername(token));
    }

    @Test
    void validateTokenSuccessfully() {
        String username = "testuser";
        String token = jwtUtil.generateToken(username);
        
        assertTrue(jwtUtil.validateToken(token));
    }

    @Test
    void extractUsernameFromToken() {
        String username = "testuser";
        String token = jwtUtil.generateToken(username);
        
        assertEquals(username, jwtUtil.extractUsername(token));
    }

    @Test
    void validateInvalidToken() {
        String invalidToken = "invalid.token.here";
        
        assertFalse(jwtUtil.validateToken(invalidToken));
    }
}

