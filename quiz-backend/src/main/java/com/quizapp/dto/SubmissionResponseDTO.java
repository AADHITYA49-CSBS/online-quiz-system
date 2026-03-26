package com.quizapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SubmissionResponseDTO {
    private Long submissionId;
    private Long userId;
    private Long quizId;
    private Integer score;
}
