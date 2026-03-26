package com.quizapp.controller;

import com.quizapp.dto.SubmissionRequestDTO;
import com.quizapp.dto.SubmissionResponseDTO;
import com.quizapp.service.SubmissionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    private final SubmissionService submissionService;

    public SubmissionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    @PostMapping
    public ResponseEntity<SubmissionResponseDTO> submitQuiz(@RequestBody SubmissionRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(submissionService.submitQuiz(request));
    }

    @GetMapping("/user/{userId}/quiz/{quizId}")
    public ResponseEntity<SubmissionResponseDTO> getUserScore(@PathVariable Long userId, @PathVariable Long quizId) {
        return ResponseEntity.ok(submissionService.getUserScore(userId, quizId));
    }
}
