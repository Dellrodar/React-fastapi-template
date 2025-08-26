"""FastAPI application main module."""

import asyncio
from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .config import settings
from .logging import get_logger, setup_logging

logger = get_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None]:
    """Application lifespan manager."""
    # Startup
    setup_logging()
    logger.info("Starting up FastAPI application")
    logger.info(f"Environment: {settings.APP_ENV}")
    logger.info(f"Port: {settings.PORT}")

    yield

    # Shutdown
    logger.info("Shutting down FastAPI application")
    # Allow time for cleanup
    await asyncio.sleep(0.1)


app = FastAPI(
    title="React + FastAPI Monorepo API",
    description="A modern full-stack application API built with FastAPI",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs" if settings.is_development else None,
    redoc_url="/redoc" if settings.is_development else None,
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root() -> dict[str, str]:
    """Root endpoint returning a welcome message."""
    logger.info("Root endpoint accessed")
    return {"message": "the server is now active"}


@app.get("/health")
async def health() -> dict[str, bool]:
    """Health check endpoint."""
    logger.debug("Health check endpoint accessed")
    return {"ok": True}


@app.get("/api/")
async def api_root() -> dict[str, str]:
    """API root endpoint."""
    logger.info("API root endpoint accessed")
    return {"message": "the server is now active"}


@app.get("/api/health")
async def api_health() -> dict[str, bool]:
    """API health check endpoint."""
    logger.debug("API health check endpoint accessed")
    return {"ok": True}


@app.exception_handler(404)
async def not_found_handler(request, exc) -> JSONResponse:
    """Handle 404 errors."""
    return JSONResponse(status_code=404, content={"detail": "Not found"})


@app.exception_handler(500)
async def internal_error_handler(request, exc) -> JSONResponse:
    """Handle 500 errors."""
    logger.error(f"Internal server error: {exc}")
    return JSONResponse(status_code=500, content={"detail": "Internal server error"})
