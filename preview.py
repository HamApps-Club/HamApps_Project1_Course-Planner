"""Preview the Vite homepage locally without installing Node.js."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from socketserver import TCPServer
from urllib.parse import urlsplit


ROOT = Path(__file__).resolve().parent
PUBLIC = ROOT / "public"


class PreviewHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        relative = urlsplit(path).path.lstrip("/")
        public_file = (PUBLIC / relative).resolve()
        if public_file.is_relative_to(PUBLIC) and public_file.is_file():
            return str(public_file)
        return super().translate_path(path)


class LocalServer(ThreadingHTTPServer):
    def server_bind(self):
        TCPServer.server_bind(self)
        self.server_name = "localhost"
        self.server_port = self.socket.getsockname()[1]


if __name__ == "__main__":
    with LocalServer(("127.0.0.1", 8765), PreviewHandler) as server:
        print("Preview at http://127.0.0.1:8765", flush=True)
        server.serve_forever()
