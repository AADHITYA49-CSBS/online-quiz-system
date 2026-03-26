package com.quizapp.service;

import com.quizapp.dto.SubmissionRequestDTO;
import com.quizapp.dto.SubmissionResponseDTO;

public interface SubmissionService {
    SubmissionResponseDTO submitQuiz(SubmissionRequestDTO request);
    SubmissionResponseDTO getUserScore(Long userId, Long quizId);
}
