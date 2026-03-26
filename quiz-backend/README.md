# Quiz Backend

This project exposes quiz APIs using Spring Boot.

## Endpoints

- `POST /api/quizzes` - Create a new quiz
- `GET /api/quizzes` - Fetch all quizzes

### Sample request (Create Quiz)

```json
{
  "title": "Java Basics",
  "description": "Fundamentals quiz"
}
```

### Sample response

```json
{
  "id": 1,
  "title": "Java Basics",
  "description": "Fundamentals quiz",
  "createdAt": "2026-03-26T10:15:30.123"
}
```

## Run tests

```powershell
./mvnw test
```

