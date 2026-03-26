import { useState } from "react";
import { api } from "../lib/api";

export default function ScorePage() {
  const [userId, setUserId] = useState("");
  const [quizId, setQuizId] = useState("");
  const [score, setScore] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setScore(null);

    try {
      const response = await api.getUserScore(Number(userId), Number(quizId));
      setScore(response);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card">
      <h2>Get My Score</h2>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          User ID
          <input value={userId} onChange={(e) => setUserId(e.target.value)} required />
        </label>
        <label>
          Quiz ID
          <input value={quizId} onChange={(e) => setQuizId(e.target.value)} required />
        </label>
        <button type="submit" disabled={loading}>{loading ? "Checking..." : "Get Score"}</button>
      </form>

      {error && <p className="error-text">{error}</p>}
      {score && (
        <div className="success-box">
          <h3>Score Details</h3>
          <p>Submission ID: {score.submissionId}</p>
          <p>Score: {score.score}</p>
        </div>
      )}
    </section>
  );
}

