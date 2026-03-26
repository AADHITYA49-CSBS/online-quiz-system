package com.quizapp.service;

import com.quizapp.dto.CreateQuizRequest;
import com.quizapp.dto.QuizResponse;
import com.quizapp.entity.Quiz;
import com.quizapp.repository.QuizRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final com.quizapp.repository.QuestionRepository questionRepository;

    public QuizServiceImpl(QuizRepository quizRepository, com.quizapp.repository.QuestionRepository questionRepository) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
    }

    @Override
    public QuizResponse createQuiz(CreateQuizRequest request) {
        if (request == null || request.title() == null || request.title().isBlank()) {
            throw new IllegalArgumentException("Quiz title is required");
        }

        Quiz quiz = new Quiz();
        quiz.setTitle(request.title().trim());
        quiz.setDescription(request.description());
        quiz.setCreatedAt(LocalDateTime.now());

        Quiz savedQuiz = quizRepository.save(quiz);
        return toResponse(savedQuiz);
    }

    @Override
    public List<QuizResponse> getAllQuizzes() {
        return quizRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    private QuizResponse toResponse(Quiz quiz) {
        return new QuizResponse(quiz.getId(), quiz.getTitle(), quiz.getDescription(), quiz.getCreatedAt());
    }

    @Override
    public com.quizapp.dto.QuizResponseDTO getQuiz(Long id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found with id: " + id));

        java.util.List<com.quizapp.entity.Question> questions = questionRepository.findByQuizId(id);

        com.quizapp.dto.QuizResponseDTO response = new com.quizapp.dto.QuizResponseDTO();
        response.setId(quiz.getId());
        response.setTitle(quiz.getTitle());
        response.setDescription(quiz.getDescription());
        response.setQuestions(questions);

        return response;
    }
}

