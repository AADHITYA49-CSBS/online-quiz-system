package com.quizapp.service;

import com.quizapp.dto.AnswerRequestDTO;
import com.quizapp.dto.SubmissionRequestDTO;
import com.quizapp.dto.SubmissionResponseDTO;
import com.quizapp.entity.Question;
import com.quizapp.entity.Submission;
import com.quizapp.entity.SubmissionAnswer;
import com.quizapp.repository.QuestionRepository;
import com.quizapp.repository.SubmissionAnswerRepository;
import com.quizapp.repository.SubmissionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SubmissionServiceImpl implements SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final SubmissionAnswerRepository submissionAnswerRepository;
    private final QuestionRepository questionRepository;

    public SubmissionServiceImpl(SubmissionRepository submissionRepository,
                                 SubmissionAnswerRepository submissionAnswerRepository,
                                 QuestionRepository questionRepository) {
        this.submissionRepository = submissionRepository;
        this.submissionAnswerRepository = submissionAnswerRepository;
        this.questionRepository = questionRepository;
    }

    @Override
    @Transactional
    public SubmissionResponseDTO submitQuiz(SubmissionRequestDTO request) {
        List<Question> questions = questionRepository.findByQuizId(request.getQuizId());
        
        Map<Long, String> correctAnswersMap = questions.stream()
                .collect(Collectors.toMap(Question::getId, Question::getCorrectAnswer));

        int score = 0;
        for (AnswerRequestDTO answerReq : request.getAnswers()) {
            String correct = correctAnswersMap.get(answerReq.getQuestionId());
            if (correct != null && correct.equalsIgnoreCase(answerReq.getSelectedAnswer())) {
                score++;
            }
        }

        Submission submission = new Submission();
        submission.setUserId(request.getUserId());
        submission.setQuizId(request.getQuizId());
        submission.setScore(score);
        submission.setSubmittedAt(LocalDateTime.now());
        Submission savedSubmission = submissionRepository.save(submission);

        List<SubmissionAnswer> answersToSave = request.getAnswers().stream().map(ansReq -> {
            SubmissionAnswer ans = new SubmissionAnswer();
            ans.setSubmissionId(savedSubmission.getId());
            ans.setQuestionId(ansReq.getQuestionId());
            ans.setSelectedAnswer(ansReq.getSelectedAnswer());
            return ans;
        }).collect(Collectors.toList());

        submissionAnswerRepository.saveAll(answersToSave);

        return new SubmissionResponseDTO(savedSubmission.getId(), savedSubmission.getUserId(), savedSubmission.getQuizId(), savedSubmission.getScore());
    }

    @Override
    public SubmissionResponseDTO getUserScore(Long userId, Long quizId) {
        Submission submission = submissionRepository.findByUserIdAndQuizId(userId, quizId)
                .orElseThrow(() -> new RuntimeException("Submission not found for user " + userId + " and quiz " + quizId));
        return new SubmissionResponseDTO(submission.getId(), submission.getUserId(), submission.getQuizId(), submission.getScore());
    }
}
