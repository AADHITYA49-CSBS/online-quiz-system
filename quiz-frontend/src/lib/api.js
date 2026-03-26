import { getToken } from "./auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    try {
      const payload = await response.json();
      errorMessage = payload.message || payload.error || errorMessage;
    } catch {
      // Keep default message when no JSON body exists.
    }
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const api = {
  login(body) {
    return request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  register(body) {
    return request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  getAllQuizzes() {
    return request("/api/quizzes", { method: "GET" });
  },

  getQuizById(id) {
    return request(`/api/quizzes/${id}`, { method: "GET" });
  },

  createQuiz(body) {
    return request("/api/quizzes", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  submitQuiz(body) {
    return request("/api/submissions", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  getUserScore(userId, quizId) {
    return request(`/api/submissions/user/${userId}/quiz/${quizId}`, {
      method: "GET",
    });
  },
};

