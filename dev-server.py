#!/usr/bin/env python3
"""Simple development server launcher for React + FastAPI."""
import signal
import socket
import subprocess
import sys
from pathlib import Path


def is_port_free(port):
    """Check if port is available."""
    with socket.socket() as sock:
        try:
            sock.bind(('127.0.0.1', port))
            return True
        except OSError:
            return False


def start_server(name, cmd, cwd, port):
    """Start a server if port is free."""
    if not is_port_free(port):
        print(f"[{name}] Port {port} in use!")
        return None
    
    print(f"[{name}] Starting on port {port}...")
    return subprocess.Popen(cmd, cwd=cwd, shell=True, 
                          stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)


def cleanup_and_exit(processes):
    """Clean shutdown of all processes."""
    print("\n[DEV] Stopping servers...")
    for proc in processes:
        if proc and proc.poll() is None:
            proc.terminate()
            try:
                proc.wait(timeout=2)
            except subprocess.TimeoutExpired:
                proc.kill()
            if proc.stdout:
                proc.stdout.close()
    print("[DEV] All stopped")
    sys.stdout.flush()
    sys.exit(0)


def main():
    """Start both servers."""
    print("Starting React + FastAPI servers...")
    
    project_root = Path(__file__).parent
    processes = []
    
    # Handle Ctrl+C
    signal.signal(signal.SIGINT, lambda s, f: cleanup_and_exit(processes))
    signal.signal(signal.SIGTERM, lambda s, f: cleanup_and_exit(processes))
    
    # Start servers
    api_cmd = ".venv\\Scripts\\python dev.py" if sys.platform == "win32" else ".venv/bin/python dev.py"
    api_proc = start_server("API", api_cmd, project_root / "api", 8000)
    client_proc = start_server("CLIENT", "npm run dev", project_root / "client", 3000)
    
    # Track running processes
    if api_proc:
        processes.append(api_proc)
        print("[API] → http://localhost:8000")
    if client_proc:
        processes.append(client_proc)
        print("[CLIENT] → http://localhost:3000")
    
    if not processes:
        print("No servers started")
        return 1
    
    print("✅ Press Ctrl+C to stop")
    
    # Wait for all processes to finish
    try:
        for proc in processes:
            proc.wait()
    except KeyboardInterrupt:
        cleanup_and_exit(processes)
    
    return 0


if __name__ == "__main__":
    sys.exit(main())
