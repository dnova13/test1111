# FastAPI Boilerplate

A production-ready FastAPI boilerplate with JWT authentication, SQLAlchemy ORM, Alembic migrations, and full CRUD endpoints.

## Features

- FastAPI with automatic OpenAPI docs (`/docs`, `/redoc`)
- JWT access token (30 min) + refresh token (7 days) via `python-jose`
- Password hashing with `passlib[bcrypt]`
- SQLAlchemy 2.x ORM with sync engine (SQLite default, PostgreSQL-ready via asyncpg)
- Alembic database migrations
- Generic `CRUDBase` class for reusable CRUD operations
- CORS and session middleware configured
- Pydantic v2 settings via `pydantic-settings`
- Full CRUD for Users and Items with ownership checks

## Quick Start

```bash
# 1. Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Copy and configure environment variables
cp .env.example .env
# Edit .env and set a strong SECRET_KEY

# 4. Run database migrations
alembic upgrade head

# 5. Start the development server
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`. Interactive docs at `http://localhost:8000/docs`.

## Project Structure

```
app/
├── main.py              # FastAPI application factory
├── core/
│   ├── config.py        # Settings (pydantic-settings)
│   ├── security.py      # JWT + bcrypt helpers
│   └── deps.py          # FastAPI dependencies
├── db/
│   ├── base.py          # DeclarativeBase + model imports
│   └── session.py       # Engine + SessionLocal
├── models/
│   ├── user.py          # User ORM model
│   └── item.py          # Item ORM model
├── schemas/
│   ├── user.py          # Pydantic schemas for User
│   ├── item.py          # Pydantic schemas for Item
│   └── token.py         # Token schemas
├── crud/
│   ├── base.py          # Generic CRUDBase[Model, Create, Update]
│   ├── user.py          # User-specific CRUD
│   └── item.py          # Item-specific CRUD
├── api/v1/
│   ├── router.py        # Aggregates all routers
│   └── endpoints/
│       ├── auth.py      # POST /login, POST /refresh, GET /me
│       ├── users.py     # CRUD /users
│       └── items.py     # CRUD /items
└── middleware/
    └── session.py       # Starlette SessionMiddleware setup
```

## API Endpoints

### Auth (`/api/v1/auth`)
| Method | Path | Description |
|--------|------|-------------|
| POST | `/login` | Login with email + password, returns access & refresh tokens |
| POST | `/refresh` | Exchange a refresh token for new tokens |
| GET | `/me` | Get current authenticated user |

### Users (`/api/v1/users`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/register` | Public | Self-register a new user |
| GET | `/` | Admin | List all users |
| POST | `/` | Admin | Create a user |
| GET | `/me` | User | Get own profile |
| GET | `/{user_id}` | User* | Get user by ID |
| PATCH | `/{user_id}` | User* | Update user |
| DELETE | `/{user_id}` | Admin | Delete user |

*Users can only access their own data; admins can access any.

### Items (`/api/v1/items`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/` | User | List items (own items; admins see all) |
| POST | `/` | User | Create an item |
| GET | `/{item_id}` | User | Get item by ID |
| PATCH | `/{item_id}` | User | Update item |
| DELETE | `/{item_id}` | User | Delete item |

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `SECRET_KEY` | (required) | JWT signing secret – use a long random string |
| `ALGORITHM` | `HS256` | JWT algorithm |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `30` | Access token lifetime |
| `REFRESH_TOKEN_EXPIRE_DAYS` | `7` | Refresh token lifetime |
| `DATABASE_URL` | `sqlite:///./app.db` | SQLAlchemy database URL |

## Using PostgreSQL

Change `DATABASE_URL` in `.env`:

```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

Then run `alembic upgrade head` to apply migrations to PostgreSQL.

## Creating Migrations

```bash
# Auto-generate a migration after model changes
alembic revision --autogenerate -m "describe your change"

# Apply migrations
alembic upgrade head

# Rollback one step
alembic downgrade -1
```
