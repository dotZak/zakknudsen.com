#!/usr/bin/env python3
"""Local preview server that behaves like GitHub Pages.

- Serves the repository root as the web root, so links like /work/ resolve.
- Serves index.html for folder URLs.
- Serves 404.html with a 404 status for missing pages.
- Skips legacy-placeholder/, which should not be published.

Usage: python3 serve.py [port]
"""

import http.server
import os
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000


class PagesHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def send_head(self):
        path = self.translate_path(self.path)
        hidden = self.path.startswith("/legacy-placeholder")
        if hidden or not os.path.exists(path):
            return self.send_not_found()
        return super().send_head()

    def send_not_found(self):
        page = os.path.join(ROOT, "404.html")
        with open(page, "rb") as f:
            body = f.read()
        self.send_response(404)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        return __import__("io").BytesIO(body)


if __name__ == "__main__":
    print(f"Serving http://localhost:{PORT}/ (Ctrl+C to stop)")
    http.server.ThreadingHTTPServer(("", PORT), PagesHandler).serve_forever()
