from .exceptions import InvalidMotivation
from flask import request, Flask

from flask import jsonify, session, request, redirect, url_for
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from flask_bcrypt import bcrypt

from flask_socketio import send, emit

from .domain.user_types import UserTypes

from .domain.user import User
from .domain.contest import Contest
from .domain.submission import Submission

from datetime import datetime

def manager_only_decorator(func):
    def wrapper(*args, **kwargs):
        ok_roles=[str(UserTypes.ADMIN.value[0]), str(UserTypes.MANAGER.value[0]), str(UserTypes.INVESTER.value[0])]
        print(ok_roles)
        invoker=get_jwt_identity()
        if str(invoker['user_type']) in ok_roles:
            return func(*args, **kwargs)
        return "User is not an Managaer", 442
    wrapper.__name__ = func.__name__
    return wrapper

def admin_only_decorator(func):
    def wrapper(*args, **kwargs):
        invoker=get_jwt_identity()
        if str(invoker['user_type'])==str(UserTypes.ADMIN.value[0]):
            return func(*args, **kwargs)
        return "User is not an Admin", 443
    wrapper.__name__ = func.__name__
    return wrapper

def register_routes(app:Flask, socketio, service):
    @app.route("/", methods=['GET'])
    def ping():
        return "connection working"
    
    def broadcast_contests_refresh():
        socketio.emit("contests-refresh", "ehh")

    @app.route("/contest/<id>", methods=['GET'])
    # @jwt_required()
    def contest_get(id):
        try:
            id=int(id)
            contest=service.contest_get(id)
            return contest.to_dict()
        except Exception as e:
            return str(e), 400

    @app.route("/contest/<id>", methods=['DELETE'])
    # @manager_only_decorator
    # @jwt_required()
    def contest_delete(id):
        try:
            id=int(id)
            broadcast_contests_refresh()
            return service.contest_remove(id)
        except Exception as e:
            pass

    @app.route("/contest", methods=['POST', 'PUT'])
    # @manager_only_decorator
    # @jwt_required()
    def contest_post():
        try:
            json = request.get_json()
            name=json["name"]
            task=json["task"]
            max_participants_count=int(json["max_participants_count"])
            start_time=datetime(json["start_time"])
            end_time=datetime(json["end_time"])
            if request.method=='POST':
                broadcast_contests_refresh()
                return service.contest_add(name, task, max_participants_count, start_time, end_time), 200
            elif request.method=='PUT':
                id=int(json["id"])
                broadcast_contests_refresh()
                return service.contest_update(id, name, task, max_participants_count, start_time, end_time), 200
        except Exception as e:
            return str(e), 400
        
    def broadcast_submissions_refresh():
        socketio.emit("submissions-refresh", "ehh")

    @app.route("/contest/page", methods=['GET'])
    def contest_page():
        try :
            json=request.get_json()
            index=json["index"]
            page_size=json["page_size"]
            return service.contest_get_page(index, page_size)
        except Exception as e:
            return str(e), 400

    @app.route("/submission", methods=['POST'])
    # @jwt_required()
    def submission_post():
        try:
            json=request.get_json()
            user_id=int(json["user_id"])
            contest_id=int(json["contest_id"])
            binary_model=int(json["binary_model"])
            broadcast_submissions_refresh()
            return service.submission_add(user_id, contest_id, binary_model), 200
        except Exception as e:
            return str(e), 400
        
    @app.route("/submission/page", methods=['GET'])
    def submission_page():
        try :
            json=request.get_json()
            index=json["index"]
            page_size=json["page_size"]
            return service.submission_get_page(index, page_size)
        except Exception as e:
            return str(e), 400


def register_user_routes(app, socketio, service, db):
    def broadcast_users_refresh():
        socketio.emit("refresh-users", "refreshhh")

    @app.route('/login', methods=['POST'])
    def login():
        data = request.get_json()
        username = data['username']
        password = data['password']
        print('Received data:', username , password)
        user = User.query.filter_by(username=username).first()
        if user : #and bcrypt.check_password_hash(user.password, password):
            access_token = create_access_token(
                identity=
                {
                    "id":user._id,
                    "user_type":user.user_type
                })
            return {
                'message': 'Login Success', 
                'access_token': access_token,
                'username':user.username,
                'user_type':user.user_type
            }
        else:
            return {'message': 'Login Failed'}, 401
    
    @app.route('/register', methods=['POST'])
    def register():
        try:
            data = request.get_json()
            username = data['username']
            user_type = data['user_type']
            password = data['password']
            print('Received data:', username , password)
            new_user = User(username=username, user_type=user_type, password=password, rank=0)
            db.session.add(new_user)
            db.session.commit()
            return 'registerd'
        except Exception as e:
            return str(e), 404



    @app.route("/users", methods=['GET'])
    @jwt_required()
    @admin_only_decorator
    def get_all_users():
        try:
            page = request.args.get('page', 1, type=int)
            per_page = request.args.get('per_page', 10, type=int)
            users = service.get_all_users(page, per_page)
            return [user.to_dict() for user in users.items], 200
        except Exception as e:
            return str(e), 500

    @app.route("/users/<id>", methods=['DELETE'])
    @jwt_required()
    @admin_only_decorator
    def user_remove(id):
        try:
            service.user_remove(id)
            broadcast_users_refresh()
            return {"id":id}, 200
        except Exception as e:
            return str(e), 500
        
    @app.route("/users/<id>", methods=['GET'])
    @jwt_required()
    @admin_only_decorator
    def user_get(id):
        try:
            service.user_get(id)
            return {"id":id}, 200
            return "User is not an admin", 400
        except Exception as e:
            return str(e), 500
        
    @app.route("/users", methods=['PUT'])
    @jwt_required()
    @admin_only_decorator
    def user_update():
        print("Updating users")
        try:
            user_json=request.get_json()
            # username = user_json["username"]
            # is_active = bool(user_json["is_active"])
            id=user_json["id"]
            user_type = user_json["user_type"]
            service.user_update(id, None, user_type, None, None)
            broadcast_users_refresh()
            return {}, 200
        except Exception as e:
            return str(e), 500