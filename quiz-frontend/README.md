# Quiz Frontend

React frontend for the Spring Boot Online Quiz System backend.

## Features

- JWT login and registration
- Protected routes for quiz and submission flows
- Admin-only quiz creation page
- Quiz list and quiz detail pages
- Submit quiz answers and fetch score

## Backend API

Expected backend base URL: `http://localhost:8080`

Configurable with environment variable:

- `VITE_API_BASE_URL`

Example:

```env
VITE_API_BASE_URL=http://localhost:8080
```

## Run Locally

```bash
npm install
npm run dev
```

## Quality Checks

```bash
npm run lint
npm run build
```

## Notes

- Auth endpoints are public:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
- Protected endpoints require a valid JWT token.
- Current backend `login` response does not include `userId`, so submission and score forms ask for numeric `userId` manually.
