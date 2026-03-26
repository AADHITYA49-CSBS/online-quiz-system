import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadQuizzes() {
      try {
        const data = await api.getAllQuizzes();
        if (active) setQuizzes(data || []);
      } catch (requestError) {
        if (active) setError(requestError.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadQuizzes();
    return () => {
      active = false;
    };
  }, []);

  if (loading) return <section className="card">Loading quizzes...</section>;
  if (error) return <section className="card error-text">{error}</section>;

  return (
    <section className="card">
      <h2>All Quizzes</h2>
      {quizzes.length === 0 ? (
        <p className="helper-text">No quizzes found.</p>
      ) : (
        <div className="stack">
          {quizzes.map((quiz) => (
            <article key={quiz.id} className="list-item">
              <h3>{quiz.title}</h3>
              <p>{quiz.description}</p>
              <small>{quiz.createdAt ? new Date(quiz.createdAt).toLocaleString() : ""}</small>
              <div>
                <Link to={`/quizzes/${quiz.id}`}>View quiz</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

