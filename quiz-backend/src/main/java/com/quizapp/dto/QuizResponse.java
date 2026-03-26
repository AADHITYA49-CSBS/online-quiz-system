package com.quizapp.dto;

import java.time.LocalDateTime;

public record QuizResponse(Long id, String title, String description, LocalDateTime createdAt) {
}

