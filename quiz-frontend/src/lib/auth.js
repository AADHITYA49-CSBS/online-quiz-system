const AUTH_STORAGE_KEY = "quizAuth";

export function getAuth() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error("Failed to parse auth data", error);
    return null;
  }
}

export function setAuth(authData) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
}

export function clearAuth() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getToken() {
  return getAuth()?.token ?? null;
}

export function isAdmin() {
  return getAuth()?.role === "ROLE_ADMIN";
}

