from flask import Flask, make_response
from flask_migrate import Migrate

from models import db, User, Category

# Initialize the flask application
app = Flask(__name__)

# Configure the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)

db.init_app(app)


@app.route('/')
def index():
    return "<h1>Expense Tracker App</h1>"


@app.route('/users')
def all_users():
    users = User.query.all()
    users_list = []

    for user in users:
        user_dict = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "created_at": user.created_at
        }
        users_list.append(user_dict)

    body = {
        "count": len(users_list),
        "users": users_list
    }

    response = make_response(body, 200)

    return response


@app.route('/users/<int:id>')
def user_by_id(id):
    user = User.query.filter_by(id=id).first()

    if user:
        body = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "created_at": user.created_at
        }
        status = 200
    else:
        body = {
            "message": f"User id:{id} not found."
        }
        status = 404

    return make_response(body, status)


if __name__ == "__main__":
    app.run(port=5555, debug=True)
