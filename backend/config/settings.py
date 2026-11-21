import os
from pathlib import Path
from urllib.parse import urlparse

AUTH_USER_MODEL = "accounts.User"

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
SECRET_KEY = os.environ.get(
    "DJANGO_SECRET_KEY",
    "django-insecure-695htm67s30%+_n9qn9(&3n43g@0v9f(82j7fhe3jz_&e*geu!"
)

DEBUG = os.environ.get("DJANGO_DEBUG", "True").lower() in ("true", "1", "yes")

allowed_hosts_env = os.environ.get("DJANGO_ALLOWED_HOSTS")
if allowed_hosts_env:
    ALLOWED_HOSTS = [h.strip() for h in allowed_hosts_env.split(",") if h.strip()]
else:
    ALLOWED_HOSTS = ["localhost", "127.0.0.1", "testserver", "*"]


# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    "corsheaders",
    "rest_framework",

    "accounts",
    "patients",
    "therapies",
    "scheduling",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
]

# Enable WhiteNoise for serving static files in production if available
try:
    import whitenoise
    MIDDLEWARE.append("whitenoise.middleware.WhiteNoiseMiddleware")
    STATICFILES_STORAGE = "whitenoise.storage.CompressedStaticFilesStorage"
except ImportError:
    pass

MIDDLEWARE.extend([
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
])

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"


# Database Configuration: Supports DATABASE_URL (PostgreSQL, MySQL, SQLite) or separate env variables
DATABASE_URL = os.environ.get("DATABASE_URL")

if DATABASE_URL:
    url = urlparse(DATABASE_URL)
    engine_map = {
        "postgres": "django.db.backends.postgresql",
        "postgresql": "django.db.backends.postgresql",
        "mysql": "django.db.backends.mysql",
        "sqlite": "django.db.backends.sqlite3",
    }
    scheme = url.scheme.split("+")[0]
    engine = engine_map.get(scheme, "django.db.backends.sqlite3")

    if engine == "django.db.backends.sqlite3":
        DATABASES = {
            "default": {
                "ENGINE": engine,
                "NAME": url.path.lstrip("/") or (BASE_DIR / "db.sqlite3"),
            }
        }
    else:
        db_config = {
            "ENGINE": engine,
            "NAME": url.path.lstrip("/"),
            "USER": url.username or "",
            "PASSWORD": url.password or "",
            "HOST": url.hostname or "",
            "PORT": str(url.port or ("3306" if "mysql" in engine else "5432")),
        }
        # Support PostgreSQL SSL options required on managed clouds (e.g. Render / Neon / Supabase)
        if "postgres" in engine and url.hostname not in ("localhost", "127.0.0.1", "db"):
            db_config["OPTIONS"] = {"sslmode": "require"}

        DATABASES = {"default": db_config}
else:
    use_sqlite = os.environ.get("USE_SQLITE", "False").lower() in ("true", "1")
    if use_sqlite:
        DATABASES = {
            "default": {
                "ENGINE": "django.db.backends.sqlite3",
                "NAME": BASE_DIR / "db.sqlite3",
            }
        }
    else:
        DATABASES = {
            "default": {
                "ENGINE": os.environ.get("DB_ENGINE", "django.db.backends.mysql"),
                "NAME": os.environ.get("DB_NAME", "ayursutra"),
                "USER": os.environ.get("DB_USER", "root"),
                "PASSWORD": os.environ.get("DB_PASSWORD", "root"),
                "HOST": os.environ.get("DB_HOST", "localhost"),
                "PORT": os.environ.get("DB_PORT", "3306"),
            }
        }

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

# Email
MAILERS = {
    "default": {
        "BACKEND": "django.core.mail.backends.console.EmailBackend",
    },
}

# CORS Configuration
cors_origins_env = os.environ.get("CORS_ALLOWED_ORIGINS")
if cors_origins_env:
    CORS_ALLOWED_ORIGINS = [
        origin.strip() for origin in cors_origins_env.split(",") if origin.strip()
    ]
else:
    CORS_ALLOWED_ORIGINS = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]

if os.environ.get("CORS_ALLOW_ALL", "False").lower() in ("true", "1"):
    CORS_ALLOW_ALL_ORIGINS = True

# CSRF Trusted Origins
csrf_origins_env = os.environ.get("CSRF_TRUSTED_ORIGINS")
if csrf_origins_env:
    CSRF_TRUSTED_ORIGINS = [
        origin.strip() for origin in csrf_origins_env.split(",") if origin.strip()
    ]
else:
    CSRF_TRUSTED_ORIGINS = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "https://*.onrender.com",
        "https://*.railway.app",
        "https://*.vercel.app",
    ]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticated",
    ),
}
