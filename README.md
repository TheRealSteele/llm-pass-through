# LLM Pass-Through

A full-stack application for passing user prompts through to LLM services.

## Project Overview

LLM Pass-Through provides a simple interface for users to submit prompts to language model services. The application handles authentication, request formatting, and response processing through a modern web interface.

## Setup Instructions

### Prerequisites

- Docker and Docker Compose
- Node.js (v16+) for local frontend development
- Python (v3.10+) for local backend development

### Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/llm-pass-through.git
   cd llm-pass-through
   ```

2. Start the application with Docker Compose:
   ```bash
   docker-compose up
   ```

3. Access the application at http://localhost:3000

### Running Tests

#### Frontend Tests
```bash
cd frontend
npm test
```

#### Backend Tests
```bash
cd backend
pytest
```

## Project Structure

<details>
<summary>Project Directory Structure</summary>

```
llm-pass-through/
├── frontend/                 # React/TypeScript frontend application
│   ├── src/                  # Source code
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page-level components
│   │   └── services/         # API client services
│   ├── tests/                # Frontend test configuration
│   ├── package.json          # Frontend dependencies and scripts
│   ├── tsconfig.json         # TypeScript configuration
│   └── vite.config.ts        # Vite build configuration
│
├── backend/                  # Python FastAPI backend
│   ├── app/                  # Application code
│   │   ├── api/              # API routes and controllers
│   │   ├── core/             # Core business logic
│   │   └── models/           # Data models and schemas
│   ├── tests/                # Backend tests
│   └── pyproject.toml        # Python dependencies and configuration
│
├── docker-compose.yml        # Docker compose configuration
├── testing-guidance.md       # Testing practices documentation
└── planning.md               # Project planning documents
```
</details>

## Tech Stack

- **Frontend**: React with TypeScript, Vite
- **Backend**: Python with FastAPI and Pydantic
- **Containerization**: Docker and Docker Compose
- **Testing**: Jest (frontend), Pytest (backend)

## Development Principles

This project follows Test-Driven Development (TDD) principles and Extreme Programming (XP) practices. For detailed testing guidance, see [testing-guidance.md](./testing-guidance.md).