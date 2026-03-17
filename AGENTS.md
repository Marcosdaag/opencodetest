# AGENTS.md - DevTreekz Development Guide

This file provides guidelines for AI agents working on the devtreekz project (LinkTree for freelance programmers).

## Project Structure

```
devtreekz/
├── frontend/          # Angular 20 application
├── backend/           # NestJS API
└── README.md          # Root documentation
```

---

## Build & Run Commands

### Frontend (Angular)

```bash
# Development server
cd frontend && npm start

# Build for production
cd frontend && npm run build

# Watch mode (development)
cd frontend && npm run watch

# Run tests
cd frontend && npm run test

# Run single test file
cd frontend && npm run test -- --include='**/path/to/file.spec.ts'
```

### Backend (NestJS)

```bash
# Development server (with watch)
cd backend && npm run start:dev

# Production build
cd backend && npm run build

# Start production
cd backend && npm run start:prod

# Run tests
cd backend && npm run test

# Run single test file
cd backend && npm run test -- path/to/file.spec.ts

# Run tests with coverage
cd backend && npm run test:cov

# Prisma commands
cd backend && npm run prisma:generate
cd backend && npm run prisma:migrate
cd backend && npm run prisma:push
```

---

## Code Style Guidelines

### TypeScript Configuration

- **Strict mode enabled** in both frontend and backend
- Frontend: `noImplicitAny`, `strictNullChecks`, `strictTemplates`
- Backend: `strictNullChecks`, `noImplicitAny`, `strictBindCallApply`

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Classes | PascalCase | `ProfilesService` |
| Interfaces | PascalCase | `CreateProfileDto` |
| Methods | camelCase | `getProfile()` |
| Variables | camelCase | `username` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_FILE_SIZE` |
| Files | kebab-case | `profiles.controller.ts` |
| Angular components | kebab-case in template, PascalCase in code | `profile.component.ts` |

### Imports

```typescript
// Angular - use inject() instead of constructor injection when possible
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// NestJS
import { Controller, Get, Post, Body, Param } from '@nestjs/common';

// Order: external libs → internal modules → models/dtos
import { Injectable } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/profiles.dto';
```

### Prettier Formatting

Configured in `frontend/package.json`:
- Print width: 100
- Single quotes: true
- Use consistent formatting, run `npm run build` to check

### Error Handling

**Backend (NestJS)**:
- Use DTOs with `class-validator` for validation
- Use `class-transformer` for serialization
- Return proper HTTP status codes (200, 201, 400, 404)
- Use `@ApiResponse()` decorators for Swagger documentation

```typescript
// Example with validation
@Post()
@ApiOperation({ summary: 'Crear un nuevo perfil' })
@ApiBody({ type: CreateProfileDto })
@ApiResponse({ status: 201, description: 'Perfil creado exitosamente' })
@ApiResponse({ status: 400, description: 'Datos inválidos' })
async createProfile(@Body() dto: CreateProfileDto) {
  return this.profilesService.createProfile(dto);
}
```

**Frontend (Angular)**:
- Use RxJS `Observable` with proper error handling
- Display user-friendly error messages
- Use Angular's `HttpErrorResponse` for error handling

### Documentation

**Comments**: Spanish comments are used throughout the codebase to explain functionality.

```typescript
/**
 * Descripción del método
 * @param param1 - Descripción del parámetro
 * @returns Descripción del retorno
 */
```

**Swagger/OpenAPI**: All backend endpoints must include:
- `@ApiOperation({ summary: '...' })`
- `@ApiParam()` for path parameters
- `@ApiBody()` for request bodies
- `@ApiResponse()` for all possible responses

---

## Database

- **ORM**: Prisma
- **Provider**: PostgreSQL (Supabase)
- Run migrations before building: `npm run prisma:migrate`

---

## Environment Variables

### Backend (.env)

```env
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_KEY=...
FRONTEND_URL=https://...
PORT=3000
```

### Frontend

- API URL is hardcoded in `api.service.ts` for production
- Change to `http://localhost:3000/api` for local development

---

## Testing Guidelines

### Writing Tests

**Backend**: Jest with `ts-jest`
- Test files: `*.spec.ts`
- Location: Same directory as the file being tested

**Frontend**: Jasmine/Karma
- Test files: `*.spec.ts`
- Run with `ng test`

### Running Single Tests

```bash
# Backend
npm run test -- src/profiles/profiles.service.spec.ts

# Frontend  
npm run test -- --include="**/profile.component.spec.ts"
```

---

## Common Tasks

### Adding a new backend endpoint

1. Create DTO in `src/module/dto/`
2. Add service method in `src/module/module.service.ts`
3. Add controller method in `src/module/module.controller.ts`
4. Add Swagger decorators
5. Add Spanish comments
6. Run tests

### Adding a new frontend feature

1. Create component in `src/app/features/` or `src/app/shared/`
2. Create service in `src/app/core/services/` if needed
3. Add model/types in `src/app/core/models/`
4. Add to appropriate module/route
5. Test with `npm run start`

---

## Build Verification

Always run build commands before committing:

```bash
# Frontend
cd frontend && npm run build

# Backend
cd backend && npm run build
```

---

## Notes

- This project uses **Spanish comments** for documentation
- Profiles are **immutable** - they cannot be modified after creation
- QR codes are generated on-the-fly for each profile
- File uploads are handled via Supabase Storage
