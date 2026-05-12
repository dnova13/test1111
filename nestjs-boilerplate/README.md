# NestJS Boilerplate

A production-ready NestJS boilerplate with JWT authentication, TypeORM, SQLite, and full CRUD operations.

## Features

- **Authentication**: JWT access tokens (15m) + refresh tokens (7d) via passport-jwt
- **Authorization**: Global JWT guard with `@Public()` decorator opt-out, admin-only routes
- **Database**: TypeORM with SQLite (better-sqlite3) — swap to PostgreSQL/MySQL easily
- **Validation**: class-validator + class-transformer with global ValidationPipe
- **Config**: @nestjs/config with Joi schema validation
- **Pagination**: `page` + `limit` query params on all list endpoints

## Project Structure

```
src/
├── main.ts                    # Bootstrap, global prefix /api/v1
├── app.module.ts              # Root module, global guard + pipe
├── app.controller.ts          # GET /health (public)
├── app.service.ts
├── config/
│   ├── configuration.ts       # Config factory
│   └── validation.schema.ts   # Joi validation schema
├── database/
│   └── database.module.ts     # TypeORM async config
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts     # POST /auth/login, POST /auth/refresh, GET /auth/me
│   ├── auth.service.ts
│   ├── decorators/
│   │   └── public.decorator.ts
│   ├── dto/
│   │   └── login.dto.ts
│   ├── guards/
│   │   ├── jwt-auth.guard.ts  # Supports @Public() bypass
│   │   └── local-auth.guard.ts
│   └── strategies/
│       ├── jwt.strategy.ts
│       ├── jwt-refresh.strategy.ts
│       └── local.strategy.ts
├── users/
│   ├── users.module.ts
│   ├── users.controller.ts    # CRUD — admin-only except GET /users/me
│   ├── users.service.ts
│   ├── entities/user.entity.ts
│   └── dto/
│       ├── create-user.dto.ts
│       └── update-user.dto.ts
└── items/
    ├── items.module.ts
    ├── items.controller.ts    # Full CRUD — JWT protected, owner-scoped
    ├── items.service.ts
    ├── entities/item.entity.ts
    └── dto/
        ├── create-item.dto.ts
        └── update-item.dto.ts
```

## Setup

1. **Install dependencies**

```bash
npm install
```

2. **Configure environment**

```bash
cp .env.example .env
# Edit .env and set your JWT secrets
```

3. **Run in development**

```bash
npm run start:dev
```

4. **Build for production**

```bash
npm run build
npm run start:prod
```

## Environment Variables

| Variable               | Description                        | Default             |
|------------------------|------------------------------------|---------------------|
| `NODE_ENV`             | Environment                        | `development`       |
| `PORT`                 | HTTP port                          | `3000`              |
| `DB_DATABASE`          | SQLite database file path          | `./data/app.sqlite` |
| `JWT_ACCESS_SECRET`    | Secret for access tokens           | **required**        |
| `JWT_ACCESS_EXPIRATION`| Access token TTL                   | `15m`               |
| `JWT_REFRESH_SECRET`   | Secret for refresh tokens          | **required**        |
| `JWT_REFRESH_EXPIRATION`| Refresh token TTL                 | `7d`                |

## API Endpoints

### Health
| Method | Path          | Auth     | Description  |
|--------|---------------|----------|--------------|
| GET    | /api/v1/health | None    | Health check |

### Auth
| Method | Path                  | Auth         | Description              |
|--------|-----------------------|--------------|--------------------------|
| POST   | /api/v1/auth/login    | None         | Login with email/password |
| POST   | /api/v1/auth/refresh  | Refresh JWT  | Get new token pair       |
| GET    | /api/v1/auth/me       | Access JWT   | Get current user profile |

### Users (admin-only except /me)
| Method | Path                  | Auth       | Description        |
|--------|-----------------------|------------|--------------------|
| GET    | /api/v1/users/me      | JWT        | Current user info  |
| POST   | /api/v1/users         | JWT+Admin  | Create user        |
| GET    | /api/v1/users         | JWT+Admin  | List users         |
| GET    | /api/v1/users/:id     | JWT+Admin  | Get user by ID     |
| PATCH  | /api/v1/users/:id     | JWT+Admin  | Update user        |
| DELETE | /api/v1/users/:id     | JWT+Admin  | Delete user        |

### Items (owner-scoped)
| Method | Path                  | Auth  | Description                          |
|--------|-----------------------|-------|--------------------------------------|
| POST   | /api/v1/items         | JWT   | Create item (owned by current user)  |
| GET    | /api/v1/items         | JWT   | List items (own items; all if admin) |
| GET    | /api/v1/items/:id     | JWT   | Get item (own; any if admin)         |
| PATCH  | /api/v1/items/:id     | JWT   | Update item (own; any if admin)      |
| DELETE | /api/v1/items/:id     | JWT   | Delete item (own; any if admin)      |

### Pagination

All list endpoints accept `?page=1&limit=10` query params (limit capped at 100).

Response shape:
```json
{
  "data": [...],
  "total": 42,
  "page": 1,
  "limit": 10,
  "totalPages": 5
}
```

## Example Requests

```bash
# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'

# Use access token
curl http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer <access_token>"

# Refresh tokens
curl -X POST http://localhost:3000/api/v1/auth/refresh \
  -H "Authorization: Bearer <refresh_token>"

# Create item
curl -X POST http://localhost:3000/api/v1/items \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Item","description":"Optional description"}'
```

## Switching to PostgreSQL

Update `.env`:
```
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=secret
DB_DATABASE=myapp
```

Update `database.module.ts` to pass the additional fields and change the `type` to `'postgres'`. Install `pg` instead of `better-sqlite3`.
