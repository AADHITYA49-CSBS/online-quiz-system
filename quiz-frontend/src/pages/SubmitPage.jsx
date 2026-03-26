import { useState } from "react";
import { api } from "../lib/api";

function emptyAnswer() {
  return { questionId: "", selectedAnswer: "" };
}

export default function SubmitPage() {
  const [userId, setUserId] = useState("");
  const [quizId, setQuizId] = useState("");
  const [answers, setAnswers] = useState([emptyAnswer()]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateAnswer(index, field, value) {
    const next = [...answers];
    next[index] = { ...next[index], [field]: value };
    setAnswers(next);
  }

  function addAnswer() {
    setAnswers((prev) => [...prev, emptyAnswer()]);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const payload = {
        userId: Number(userId),
        quizId: Number(quizId),
        answers: answers
          .filter((answer) => answer.questionId && answer.selectedAnswer)
          .map((answer) => ({
            questionId: Number(answer.questionId),
            selectedAnswer: answer.selectedAnswer,
          })),
      };

      const response = await api.submitQuiz(payload);
      setResult(response);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card">
      <h2>Submit Quiz</h2>
      <p className="helper-text">Use your numeric userId from database for now (backend login response does not include it).</p>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          User ID
          <input value={userId} onChange={(e) => setUserId(e.target.value)} required />
        </label>
        <label>
          Quiz ID
          <input value={quizId} onChange={(e) => setQuizId(e.target.value)} required />
        </label>

        <h3>Answers</h3>
        {answers.map((answer, index) => (
          <div className="answer-row" key={index}>
            <input
              placeholder="Question ID"
              value={answer.questionId}
              onChange={(e) => updateAnswer(index, "questionId", e.target.value)}
              required
            />
            <select
              value={answer.selectedAnswer}
              onChange={(e) => updateAnswer(index, "selectedAnswer", e.target.value)}
              required
            >
              <option value="">Select option</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
        ))}

        <button type="button" onClick={addAnswer}>Add another answer</button>
        <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Quiz"}</button>
      </form>

      {error && <p className="error-text">{error}</p>}
      {result && (
        <div className="success-box">
          <h3>Submission Success</h3>
          <p>Submission ID: {result.submissionId}</p>
          <p>User ID: {result.userId}</p>
          <p>Quiz ID: {result.quizId}</p>
          <p>Score: {result.score}</p>
        </div>
      )}
    </section>
  );
}

