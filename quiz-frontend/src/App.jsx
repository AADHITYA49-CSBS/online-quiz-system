import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateQuizPage from "./pages/CreateQuizPage";
import LoginPage from "./pages/LoginPage";
import QuizDetailPage from "./pages/QuizDetailPage";
import QuizzesPage from "./pages/QuizzesPage";
import RegisterPage from "./pages/RegisterPage";
import ScorePage from "./pages/ScorePage";
import SubmitPage from "./pages/SubmitPage";

function App() {
  const [authVersion, setAuthVersion] = useState(0);

  function onAuthChange() {
    setAuthVersion((v) => v + 1);
  }

  return (
    <BrowserRouter>
      <div key={authVersion}>
        <NavBar onAuthChange={onAuthChange} />
        <main className="container page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/quizzes" replace />} />
            <Route path="/login" element={<LoginPage onAuthChange={onAuthChange} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/quizzes"
              element={
                <ProtectedRoute>
                  <QuizzesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quizzes/:id"
              element={
                <ProtectedRoute>
                  <QuizDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/submit"
              element={
                <ProtectedRoute>
                  <SubmitPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/score"
              element={
                <ProtectedRoute>
                  <ScorePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/create-quiz"
              element={
                <ProtectedRoute adminOnly>
                  <CreateQuizPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
