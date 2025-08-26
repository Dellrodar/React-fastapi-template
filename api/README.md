# FastAPI Backend

Modern Python API built with FastAPI, featuring automatic OpenAPI documentation, type validation, and async support.

## Quick Start

1. **Create virtual environment:**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # Windows: .venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements-dev.txt
   ```

3. **Copy environment file:**
   ```bash
   cp env.example .env  # Windows: copy env.example .env
   ```

4. **Run development server:**
   ```bash
   # Option 1: Using the optimized dev script (recommended)
   python dev.py
   
   # Option 2: Using uvicorn directly
   uvicorn app.main:app --reload --port 8000
   
   # Option 3: On Windows, use the batch script
   dev.bat
   ```

## Development Server Options

### Recommended: Python Dev Script
```bash
python dev.py
```
- Better shutdown handling
- Optimized uvicorn settings
- Clear startup messages

### Direct uvicorn
```bash
uvicorn app.main:app --reload --port 8000 --reload-delay 1 --timeout-keep-alive 5
```

### Windows Batch Script
```cmd
dev.bat
```
- Windows-optimized
- Automatic environment setup

5. **View API documentation:**
   - OpenAPI docs: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

## Testing

```bash
pytest                    # Run tests
pytest --cov=app         # Run with coverage
```

## Linting & Formatting

```bash
ruff check .             # Check for issues
ruff format .            # Format code
mypy .                   # Type checking
```

## API Endpoints

- `GET /` - Root message
- `GET /health` - Health check
- `GET /api/` - API root message  
- `GET /api/health` - API health check
