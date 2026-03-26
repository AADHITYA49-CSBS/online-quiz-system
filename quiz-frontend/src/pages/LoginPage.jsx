import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { setAuth } from "../lib/auth";

export default function LoginPage({ onAuthChange }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.login(form);
      setAuth({
        token: response.token,
        username: response.username,
        role: response.role,
      });
      onAuthChange();
      navigate("/quizzes");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          Username
          <input
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
      {error && <p className="error-text">{error}</p>}
      <p className="helper-text">
        New here? <Link to="/register">Create an account</Link>
      </p>
    </section>
  );
}

