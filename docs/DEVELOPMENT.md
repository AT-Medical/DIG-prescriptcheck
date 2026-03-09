# PrescriptCheck – Development Guide

## Getting Started

### Prerequisites

- Node.js 20.x or later
- MongoDB 7.x (local or Atlas)
- Git

### Local Setup

```bash
# Clone repository
git clone https://github.com/AT-Medical/PrescriptCheck.git
cd PrescriptCheck

# Setup backend
cd backend
cp ../.env.example ../.env
# Edit .env with local settings
npm install
npm run dev

# Setup frontend (new terminal)
cd frontend
npm install
npm run dev
```

The backend runs on `http://localhost:3000` and frontend on `http://localhost:3001`.

## Project Structure

```
PrescriptCheck/
├── backend/           # Express.js API server
│   ├── controllers/   # Request handlers
│   ├── middleware/    # Authentication, validation, error handling
│   ├── models/        # MongoDB/Mongoose models
│   ├── routes/        # API route definitions
│   ├── services/      # Business logic
│   ├── utils/         # Utilities (logger, validators, etc.)
│   └── tests/         # Backend tests
├── frontend/          # React frontend
│   └── src/
│       ├── components/ # Reusable UI components
│       ├── pages/     # Page components
│       ├── services/  # API service layer
│       └── hooks/     # Custom React hooks
├── src/               # Shared/organized source
│   ├── backend/       # Reorganized backend modules
│   ├── frontend/      # Reorganized frontend modules
│   └── shared/        # Shared types, schemas, utils
├── config/            # Application configuration
├── docker/            # Docker configuration
├── deploy/            # Deployment configuration
├── docs/              # Documentation
└── .github/           # GitHub Actions workflows
```

## Testing

```bash
# Backend tests
cd backend
npm test

# Backend with coverage
npm run test:coverage

# Frontend tests
cd frontend
npm test
```

## Code Standards

- **JavaScript**: ESLint with `eslint:recommended`
- **Formatting**: Prettier
- **Commits**: Conventional Commits format
- **Security**: No hardcoded secrets, always use environment variables

## Adding New API Endpoints

1. Create route in `backend/routes/`
2. Create controller in `backend/controllers/`
3. Add service logic in `backend/services/`
4. Add input validation in `backend/validators/`
5. Write tests in `backend/tests/`
6. Update API documentation in `docs/API.md`

## Healthcare Compliance Notes

- All patient data must be handled per GDPR/HIPAA
- Log sensitive operations to the audit trail
- Never log PII/PHI in application logs
- Use the compliance modules in `src/backend/compliance/`
- Review COMPLIANCE.md before adding new data processing

## Pull Request Process

1. Create a feature branch from `main`
2. Make changes with tests
3. Ensure `npm test` passes
4. Submit PR using the PR template
5. Request review from code owners
6. Ensure CI passes before merge

See: [CONTRIBUTING.md](../CONTRIBUTING.md)
