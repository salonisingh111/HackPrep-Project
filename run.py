import http.server
import socketserver
import webbrowser
import os
import sys

DEFAULT_PORT = 8000
PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))

class ProjectHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=PROJECT_DIR, **kwargs)

    def log_message(self, format, *args):
        # Keep server output clean
        sys.stdout.write(f"[{self.log_date_time_string()}] {format % args}\n")

def start_server():
    socketserver.TCPServer.allow_reuse_address = True
    port = DEFAULT_PORT

    for attempt in range(10):
        try:
            with socketserver.TCPServer(("", port), ProjectHandler) as httpd:
                url = f"http://localhost:{port}/Home/home.html"
                print("=" * 50)
                print(" HackPrep Local Development Server")
                print("=" * 50)
                print(f" URL: {url}")
                print(" Press Ctrl+C to stop the server.")
                print("=" * 50)

                # Open browser automatically
                try:
                    webbrowser.open(url)
                except Exception:
                    pass

                httpd.serve_forever()
                return
        except OSError:
            port += 1

    print("Error: Could not find an available port between 8000 and 8010.")
    sys.exit(1)

if __name__ == "__main__":
    try:
        start_server()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        sys.exit(0)
