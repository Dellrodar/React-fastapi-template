#!/usr/bin/env python3
"""
Development server script with better shutdown handling.
"""
import signal
import sys
from pathlib import Path

import uvicorn


def signal_handler(signum, frame):
    """Handle shutdown signals gracefully."""
    print(f"\n[API] Received signal {signum}, shutting down gracefully...")
    sys.exit(0)


def main():
    """Run the development server with proper signal handling."""
    # Set up signal handlers
    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)
    
    # Ensure we're in the right directory
    api_dir = Path(__file__).parent
    sys.path.insert(0, str(api_dir))
    
    # Run uvicorn with optimized settings
    config = uvicorn.Config(
        "app.main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
        reload_delay=1,
        timeout_keep_alive=5,
        access_log=True,
        log_level="info",
        use_colors=True,
        reload_dirs=[str(api_dir)],
    )
    
    server = uvicorn.Server(config)
    
    try:
        print("[API] Starting FastAPI development server...")
        print("[API] Available at: http://localhost:8000")
        print("[API] API docs at: http://localhost:8000/docs")
        print("[API] Press Ctrl+C to stop")
        server.run()
    except KeyboardInterrupt:
        print("\n[API] Shutdown complete")
    except Exception as e:
        print(f"[API] Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
