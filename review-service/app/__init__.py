from flask import Flask
from app.database import init_db
from app.routes.review_routes import review_bp

def create_app():
    app = Flask(__name__)
    
    # Inisialisasi Database MongoDB
    init_db(app)
    
    # Registrasi Blueprint
    app.register_blueprint(review_bp, url_prefix="/api")
    
    @app.route("/", methods=["GET"])
    def index():
        return {"message": "Selamat datang di Review Service API", "status": "running"}
    
    @app.route("/health", methods=["GET"])
    def health():
        return {"status": "healthy"}, 200
        
    return app