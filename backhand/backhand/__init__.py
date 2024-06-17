from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO

db=SQLAlchemy() if 'db' not in locals() else db
jwt=JWTManager() if 'jwt' not in locals() else jwt
socketio=SocketIO(cors_allowed_origins="*") if 'socketio' not in locals() else socketio

# def create_app() -> Flask:
def create_app() -> tuple[Flask, SocketIO, SQLAlchemy]:
    app=Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./mydb.db'

    # for the JWT thing
    app.config['SECRET_KEY'] = 'stronger_than_water'
    app.config["JWT_SECRET_KEY"] = 'balanced_as_fire'
    app.config['JWT_TOKEN_LOCATION'] = ['headers']

    CORS(app)
    db.init_app(app)
    jwt.init_app(app=app)
    socketio.init_app(app=app)

    from backhand.cruds.repo import Repo
    from backhand.cruds.service import Service
    repo=Repo(db)
    service=Service(repo)

    from backhand.cruds.controller import register_routes, register_user_routes
    register_routes(app,socketio, service)
    register_user_routes(app, socketio, service, db)

    migrate=Migrate(app, db)

    return app, socketio, db