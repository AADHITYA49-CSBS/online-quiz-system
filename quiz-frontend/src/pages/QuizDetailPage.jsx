import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../lib/api";

export default function QuizDetailPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadQuiz() {
      try {
        const data = await api.getQuizById(id);
        if (active) setQuiz(data);
      } catch (requestError) {
        if (active) setError(requestError.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadQuiz();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) return <section className="card">Loading quiz...</section>;
  if (error) return <section className="card error-text">{error}</section>;
  if (!quiz) return <section className="card">Quiz not found.</section>;

  return (
    <section className="card">
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      <h3>Questions</h3>
      {quiz.questions?.length ? (
        <ol className="stack">
          {quiz.questions.map((question) => (
            <li key={question.id} className="list-item">
              <p><strong>{question.text}</strong></p>
              <ul>
                <li>A: {question.optionA}</li>
                <li>B: {question.optionB}</li>
                <li>C: {question.optionC}</li>
                <li>D: {question.optionD}</li>
              </ul>
            </li>
          ))}
        </ol>
      ) : (
        <p className="helper-text">No questions available in this quiz yet.</p>
      )}
      <div className="actions">
        <Link to="/submit">Go to submit page</Link>
      </div>
    </section>
  )
}

