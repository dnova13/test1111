# Django Boilerplate

Django REST Framework + JWT 인증 + 샘플 CRUD를 포함한 Django 보일러플레이트입니다.

## 기술 스택

| 항목 | 기술 |
|------|------|
| 프레임워크 | Django 4.2 LTS |
| REST API | Django REST Framework (DRF) |
| 인증 | djangorestframework-simplejwt |
| DB (개발) | SQLite |
| DB (운영) | PostgreSQL 권장 |
| 설정 관리 | django-environ |
| CORS | django-cors-headers |

## 주요 기능

- **커스텀 User 모델**: email을 USERNAME_FIELD로 사용 (AbstractBaseUser)
- **JWT 인증**: Access Token (60분) + Refresh Token (7일)
- **분리된 설정**: base / development / production 설정 분리
- **권한 관리**: IsAdminUser, IsOwnerOrAdmin 커스텀 퍼미션
- **페이지네이션**: StandardResultsPagination (page_size=20)
- **샘플 CRUD**: User, Item 전체 CRUD ViewSet

## 빠른 시작

```bash
# 가상환경 생성
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 의존성 설치
pip install -r requirements.txt

# 환경 변수 설정
cp .env.example .env
# .env에서 SECRET_KEY, DATABASE_URL 등 설정

# DB 마이그레이션
python manage.py migrate

# 슈퍼유저 생성
python manage.py createsuperuser

# 개발 서버 실행
python manage.py runserver
```

API 문서: http://localhost:8000/api/v1/

## API 엔드포인트

### 인증 (`/api/v1/auth`)

| 메서드 | 경로 | 설명 |
|--------|------|------|
| POST | `/api/v1/auth/register` | 회원가입 |
| POST | `/api/v1/auth/login` | 로그인 → access + refresh 토큰 |
| POST | `/api/v1/auth/refresh` | Access 토큰 갱신 |
| GET  | `/api/v1/auth/me` | 현재 사용자 정보 |

### 사용자 (`/api/v1/users`)

| 메서드 | 경로 | 설명 | 권한 |
|--------|------|------|------|
| GET    | `/api/v1/users/` | 목록 조회 | 관리자 |
| POST   | `/api/v1/users/` | 생성 | 관리자 |
| GET    | `/api/v1/users/{id}/` | 단건 조회 | 본인 or 관리자 |
| PUT    | `/api/v1/users/{id}/` | 수정 | 본인 or 관리자 |
| DELETE | `/api/v1/users/{id}/` | 삭제 | 관리자 |
| GET    | `/api/v1/users/me/` | 내 프로필 | 인증 |

### 아이템 (`/api/v1/items`)

| 메서드 | 경로 | 설명 | 권한 |
|--------|------|------|------|
| GET    | `/api/v1/items/` | 목록 조회 (내 것) | 인증 |
| POST   | `/api/v1/items/` | 생성 | 인증 |
| GET    | `/api/v1/items/{id}/` | 단건 조회 | 소유자 or 관리자 |
| PUT    | `/api/v1/items/{id}/` | 수정 | 소유자 or 관리자 |
| DELETE | `/api/v1/items/{id}/` | 삭제 | 소유자 or 관리자 |

## 프로젝트 구조

```
config/
├── settings/
│   ├── base.py         # 공통 설정 (INSTALLED_APPS, DRF, JWT 등)
│   ├── development.py  # 개발 환경 (SQLite, DEBUG=True)
│   └── production.py   # 운영 환경 스텁
├── urls.py             # 루트 URL 설정
└── wsgi.py

apps/
├── accounts/
│   ├── models.py       # 커스텀 User (AbstractBaseUser, email 로그인)
│   ├── serializers.py  # UserSerializer, RegisterSerializer, LoginSerializer
│   ├── views.py        # RegisterView, LoginView, RefreshView, MeView, UserCRUD
│   ├── permissions.py  # IsAdminUser, IsOwnerOrAdmin
│   └── urls.py
└── items/
    ├── models.py       # Item (title, description, owner FK, timestamps)
    ├── serializers.py
    ├── views.py        # ItemViewSet (JWT 보호)
    └── urls.py

core/
└── pagination.py       # StandardResultsPagination (page_size=20)
```

## 환경 변수 (`.env`)

```env
SECRET_KEY=your-django-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3

# JWT
ACCESS_TOKEN_LIFETIME_MINUTES=60
REFRESH_TOKEN_LIFETIME_DAYS=7

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

## PostgreSQL 전환

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

```bash
pip install psycopg2-binary
python manage.py migrate
```

## 어드민

```
http://localhost:8000/admin/
```

superuser 계정으로 로그인하면 Django Admin 패널에서 User, Item을 직접 관리할 수 있습니다.
