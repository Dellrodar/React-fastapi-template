"""Test API endpoints."""

import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_root_message() -> None:
    """Test root endpoint returns correct message."""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "the server is now active"}


def test_health_ok() -> None:
    """Test health endpoint returns ok status."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"ok": True}


def test_api_root_message() -> None:
    """Test API root endpoint returns correct message."""
    response = client.get("/api/")
    assert response.status_code == 200
    assert response.json() == {"message": "the server is now active"}


def test_api_health_ok() -> None:
    """Test API health endpoint returns ok status."""
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"ok": True}


def test_not_found() -> None:
    """Test 404 handling."""
    response = client.get("/nonexistent")
    assert response.status_code == 404
    assert response.json() == {"detail": "Not found"}


@pytest.mark.asyncio
async def test_app_startup() -> None:
    """Test that the app starts up correctly."""
    # The lifespan context manager should work without errors
    async with app.router.lifespan_context(app):
        pass
