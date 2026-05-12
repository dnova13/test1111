# Django REST Framework Boilerplate

A production-ready Django 4.2 LTS project with:

- **Django REST Framework** for the API layer
- **SimpleJWT** for access + refresh token authentication
- **Custom User model** (email-based, no username)
- **Items CRUD** as a sample resource
- **django-environ** for 12-factor configuration
- **django-cors-headers** for cross-origin requests
- Split settings: `base` / `development` / `production`

---

## Quick Start

```bash
# 1. Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Configure environment
cp .env.example .env
# Edit .env and set at minimum:
#   SECRET_KEY=<some-long-random-string>

# 4. Apply migrations
python manage.py migrate

# 5. Create a superuser
python manage.py createsuperuser

# 6. Run the development server
python manage.py runserver
```

The API is now available at `http://127.0.0.1:8000/`.

---

## API Reference

### Authentication

| Method | URL | Description | Auth |
|--------|-----|-------------|------|
| POST | `/api/v1/auth/register` | Create account | Public |
| POST | `/api/v1/auth/login` | Obtain JWT pair + user | Public |
| POST | `/api/v1/auth/refresh` | Refresh access token | Public |
| POST | `/api/v1/auth/logout` | Blacklist refresh token | JWT |
| GET | `/api/v1/auth/me` | Current user profile | JWT |
| PATCH | `/api/v1/auth/me` | Update own profile | JWT |
| POST | `/api/v1/auth/me/password` | Change password | JWT |

### Users

| Method | URL | Description | Auth |
|--------|-----|-------------|------|
| GET | `/api/v1/users/` | List users | Admin |
| GET | `/api/v1/users/<id>/` | Get user | Admin or Self |
| PATCH | `/api/v1/users/<id>/` | Update user | Admin or Self |
| DELETE | `/api/v1/users/<id>/` | Delete user | Admin |
| POST | `/api/v1/users/<id>/activate/` | Activate account | Admin |
| POST | `/api/v1/users/<id>/deactivate/` | Deactivate account | Admin |

### Items

| Method | URL | Description | Auth |
|--------|-----|-------------|------|
| GET | `/api/v1/items/` | List own items | JWT |
| POST | `/api/v1/items/` | Create item | JWT |
| GET | `/api/v1/items/<id>/` | Get item | Owner or Admin |
| PUT | `/api/v1/items/<id>/` | Replace item | Owner or Admin |
| PATCH | `/api/v1/items/<id>/` | Partial update | Owner or Admin |
| DELETE | `/api/v1/items/<id>/` | Delete item | Owner or Admin |

**Items query parameters:**

| Param | Example | Description |
|-------|---------|-------------|
| `search` | `?search=django` | Filter by title/description |
| `ordering` | `?ordering=-created_at` | Sort (prefix `-` for desc) |
| `owner` | `?owner=5` | Filter by owner ID (admin only) |
| `page` | `?page=2` | Page number |
| `page_size` | `?page_size=50` | Items per page (max 100) |

---

## Example Requests

### Register

```bash
curl -X POST http://127.0.0.1:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"Str0ng!Pass","password_confirm":"Str0ng!Pass"}'
```

### Login

```bash
curl -X POST http://127.0.0.1:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"Str0ng!Pass"}'
```

Response:
```json
{
  "access":  "<jwt-access-token>",
  "refresh": "<jwt-refresh-token>",
  "user": { "id": 1, "email": "alice@example.com", ... }
}
```

### Create an Item

```bash
curl -X POST http://127.0.0.1:8000/api/v1/items/ \
  -H "Authorization: Bearer <access-token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"My first item","description":"Hello world"}'
```

---

## Project Structure

```
django-boilerplate/
├── manage.py
├── requirements.txt
├── .env.example
├── config/
│   ├── settings/
│   │   ├── base.py          # Shared settings
│   │   ├── development.py   # SQLite, DEBUG=True
│   │   └── production.py    # Production overrides
│   ├── urls.py
│   └── wsgi.py
├── apps/
│   ├── accounts/            # Custom User + JWT auth
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   └── permissions.py
│   └── items/               # Sample CRUD resource
│       ├── models.py
│       ├── serializers.py
│       ├── views.py
│       ├── urls.py
│       └── admin.py
└── core/
    └── pagination.py        # StandardResultsPagination (page_size=20)
```

---

## Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `SECRET_KEY` | (required) | Django secret key |
| `DEBUG` | `False` | Enable debug mode |
| `ALLOWED_HOSTS` | `localhost,127.0.0.1` | Comma-separated host list |
| `DATABASE_URL` | SQLite | Database URL (production) |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:3000` | Comma-separated CORS origins |
| `JWT_ACCESS_TOKEN_LIFETIME_MINUTES` | `60` | Access token TTL in minutes |
| `JWT_REFRESH_TOKEN_LIFETIME_DAYS` | `7` | Refresh token TTL in days |

---

## Running in Production

```bash
# Set the settings module
export DJANGO_SETTINGS_MODULE=config.settings.production

# Collect static files
python manage.py collectstatic --noinput

# Apply migrations
python manage.py migrate

# Run with gunicorn (install separately)
gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 4
```
