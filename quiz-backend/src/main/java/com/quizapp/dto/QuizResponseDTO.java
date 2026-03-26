package com.quizapp.dto;

import com.quizapp.entity.Question;
import lombok.Data;

import java.util.List;

@Data
public class QuizResponseDTO {
    private Long id;
    private String title;
    private String description;
    private List<Question> questions;
}
