package com.quizapp.repository;

import com.quizapp.entity.SubmissionAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubmissionAnswerRepository extends JpaRepository<SubmissionAnswer, Long> {
    List<SubmissionAnswer> findBySubmissionId(Long submissionId);
}
