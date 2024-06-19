from .exceptions import InvalidMotivation
from flask import request, Flask, send_file
from io import BytesIO
from flask_cors import cross_origin

from flask import jsonify, session, request, redirect, url_for
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from flask_bcrypt import bcrypt

from flask_socketio import send, emit

from .domain.user_types import UserTypes

from .domain.user import User

from .domain.contest import ContestStates

from datetime import datetime

def manager_only_decorator(func):
    def wrapper(*args, **kwargs):
        ok_roles=[str(UserTypes.ADMIN.value), str(UserTypes.MANAGER.value), str(UserTypes.INVESTER.value)]
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
        if str(invoker['user_type'])==str(UserTypes.ADMIN.value):
            return func(*args, **kwargs)
        return "User is not an Admin", 443
    wrapper.__name__ = func.__name__
    return wrapper

def get_user_id():
    invoker=get_jwt_identity()
    return int(invoker['id']) 
def get_user_type():
    invoker=get_jwt_identity()
    return int(invoker['user_type']) 

def register_routes(app:Flask, socketio, service):
    @app.route("/", methods=['GET'])
    def ping():
        return "connection working"
    
    def broadcast_contests_refresh():
        socketio.emit("contests-refresh", "ehh")

    def contest_dict_for_basic_user(contest_dict):
        invoker=get_jwt_identity()
        if str(invoker['user_type'])==str(UserTypes.BASIC.value):
            contest_dict["task"]="Task not available yet, wait for the contest to start. please.."
        return contest_dict

    @app.route("/contest/<id>", methods=['GET'])
    # @jwt_required()
    def contest_get(id):
        try:
            id=int(id)
            invoker=get_jwt_identity()
            contest=service.contest_get(id)
            contest_dict=contest.to_dict()
            if invoker==UserTypes.BASIC:
               # if contest.get_state() == ContestStates.BEFORE_START:
               #     contest_dict["task"]="Task not available yet, wait for the contest to start. please.."
                return contest_dict_for_basic_user(contest_dict)
            return contest_dict
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
            start_time=datetime.strptime(json["start_time"], '%Y-%m-%d %H:%M:%S')
            end_time=datetime.strptime(json["end_time"], '%Y-%m-%d %H:%M:%S')
            if request.method=='POST':
                broadcast_contests_refresh()
                return service.contest_add(name, task, max_participants_count, start_time, end_time).to_dict(), 200
            elif request.method=='PUT':
                id=int(json["id"])
                broadcast_contests_refresh()
                return service.contest_update(id, name, task, max_participants_count, start_time, end_time).to_dict(), 200
        except Exception as e:
            return str(e), 400

    def broadcast_submissions_refresh():
        socketio.emit("submissions-refresh", "ehh")


    @app.route("/contest/page", methods=['POST'])
    def contest_page():
        try :
            json=request.get_json()
            index=json["index"]
            page_size=json["page_size"]
            answer=[]
            contest_page=service.contest_get_page(index, page_size)
            for contest in contest_page:
                answer.append(contest_dict_for_basic_user(contest.to_dict()))
            return answer
        except Exception as e:
            return str(e), 400
        
    @app.route("/enroll", methods=['POST'])
    def participants_post():
        try:
            json=request.get_json()
            user_id=get_user_id()
            contest_id=int(json["contest_id"])
            return service.participant_add(user_id,contest_id)
        except Exception as e:
            return str(e), 400

    @app.route("/submit", methods=['POST'])
    # @jwt_required()
    def submission_post():
        try:
        # if True:
            user_id = get_user_id()
            contest_id = int(request.form.get("contest_id"))
            binary_model_file = request.files.get("binary_model")

            contest=service.contest_get(contest_id)
            if contest.get_state()==ContestStates.RUNNING:
                if binary_model_file:
                    binary_model = binary_model_file.read()
                    print(type(binary_model))
                else:
                    raise ValueError("No file part")
                broadcast_submissions_refresh()
                service.submission_add(user_id, contest_id, binary_model)
                return 'Submission received!', 200
            else:
                raise Exception("Contest is not running")
        except Exception as e:
            return str(e), 400
        
    @app.route("submission/<contest_id>", methods=['GET'])
    @jwt_required()
    def submission_get_by_user_id(contest_id):
        try:
            user_id=get_user_id()
            contest_id=int(contest_id)
            return service.get_user_submissions(user_id, contest_id)
        except Exception as e:
            return str(e), 400
    
    @app.route("vote", methods=['POST'])
    @jwt_required()
    def vote():
        try:
            json=request.get_json()
            user_id=get_user_id()
            contest_id=int(contest_id)
            grade=int(json["grade"])
            to_user_id=int(json["to_user_id"])
            return service.user_vote(user_id, to_user_id, contest_id, grade)
        except Exception as e:
            return str(e), 400

    @app.route("submission/page", methods=['GET'])
    @manager_only_decorator
    @jwt_required()
    def submission_get_by_user_id():
        try:
            
            return service.get_user_submissions(None)
        except Exception as e:
            return str(e), 400
        

    
    @app.route('/model/<submission_id>', methods=['GET'])
    @cross_origin()
    def get_model(submission_id):
        # Fetch the model from the database
        model=service.get_model(submission_id)

        if model is not None:
            # Create a BytesIO object from the binary data
            model_io = BytesIO(model)  # replace 'data' with the actual attribute name
    
            # Send the file
            return send_file(model_io, mimetype='model/gltf-binary')
        else:
            return 'Model not found', 404
            
    @app.route("/submission/page", methods=['GET'])
    def submission_page():
        try :
            json=request.get_json()
            index=json["index"]
            page_size=json["page_size"]
            return service.submission_get_page(index, page_size).to_dict()
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
                'user_type':user.user_type,
                'id':user._id,
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
            return 'registered'
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