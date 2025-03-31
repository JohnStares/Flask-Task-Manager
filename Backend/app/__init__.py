from flask import Flask
from flask_cors import CORS


def Task_manager():
    app = Flask(__name__)
    CORS(app)
    app.config['SECRETE_KEY'] = "shtgsvhfserd436537253gdhsgid"
    app.secret_key = "dhsfgbshdvfhsufbgdgffued"
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///database.db"

    from .models import db
    from .schema import ma
    
    db.init_app(app)
    ma.init_app(app)

    from .route import routes
    app.register_blueprint(routes, url_prefix="/")

    return app