package com.quizapp.dto;

import lombok.Data;

@Data
public class AnswerRequestDTO {
    private Long questionId;
    private String selectedAnswer;
}
