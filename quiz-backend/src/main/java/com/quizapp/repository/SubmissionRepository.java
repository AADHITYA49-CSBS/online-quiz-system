package com.quizapp.repository;

import com.quizapp.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    Optional<Submission> findByUserIdAndQuizId(Long userId, Long quizId);
}
