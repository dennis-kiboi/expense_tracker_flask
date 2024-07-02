from flask import Flask, make_response, request
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


@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        users = User.query.all()
        users_list = []

        for user in users:
            users_list.append(user.to_dict())

        body = {
            "count": len(users_list),
            "users": users_list
        }

        return make_response(body, 200)
    
    elif request.method == 'POST':
        new_user = User(
            username=request.json.get("username"),
            email=request.json.get("email")
        )

        db.session.add(new_user)
        db.session.commit()

        response = make_response(new_user.to_dict(), 201)

        return response


@app.route('/users/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def user_by_id(id):
    user = User.query.filter_by(id=id).first()

    if user == None:
        body = {
            "message": "This record does not exist in our database. Please try again."
        }
        response = make_response(body, 404)

        return response
    
    else:
        if request.method == 'GET':
            user_dict = user.to_dict()

            response = make_response(user_dict, 200)

            return response

        elif request.method == 'PATCH':
            for attr in request.json:
                setattr(user, attr, request.json.get(attr))

            db.session.add(user)
            db.session.commit()

            user_dict = user.to_dict()

            response = make_response(user_dict, 200)

            return response
        
        elif request.method == 'DELETE':
            db.session.delete(user)
            db.session.commit()

            body = {
                "delete_successful": True,
                "message": "User deleted."
            }

            response = make_response(body, 200)

            return response


if __name__ == "__main__":
    app.run(port=5555, debug=True)
