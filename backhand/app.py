from backhand import create_app

if __name__=="__main__":
    app, socketio, db = create_app()
    socketio.run(app=app, debug=True, allow_unsafe_werkzeug=True, host='0.0.0.0')