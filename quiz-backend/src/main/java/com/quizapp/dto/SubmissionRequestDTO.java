package com.quizapp.dto;

import lombok.Data;
import java.util.List;

@Data
public class SubmissionRequestDTO {
    private Long userId;
    private Long quizId;
    private List<AnswerRequestDTO> answers;
}
