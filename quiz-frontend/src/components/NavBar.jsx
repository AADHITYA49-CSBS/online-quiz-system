import { Link, useNavigate } from "react-router-dom";
import { clearAuth, getAuth } from "../lib/auth";

export default function NavBar({ onAuthChange }) {
  const navigate = useNavigate();
  const auth = getAuth();

  function handleLogout() {
    clearAuth();
    onAuthChange();
    navigate("/login");
  }

  return (
    <header className="nav-wrap">
      <div className="container nav">
        <h1 className="brand">Online Quiz System</h1>
        <nav>
          {auth?.token ? (
            <>
              <Link to="/quizzes">Quizzes</Link>
              <Link to="/submit">Submit</Link>
              <Link to="/score">My Score</Link>
              {auth.role === "ROLE_ADMIN" && <Link to="/admin/create-quiz">Create Quiz</Link>}
              <button type="button" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

