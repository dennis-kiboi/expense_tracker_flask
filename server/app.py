from flask import Flask, make_response, request, jsonify
from flask_migrate import Migrate
from flask_restful import Api, Resource
from werkzeug.exceptions import NotFound
from flask_cors import CORS

from models import db, User, Category, Transaction, Wallet

# Initialize the flask application
app = Flask(__name__)

# Configure the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app) # Allow requests from all origins

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)


class Index(Resource):
    def get(self):
        body = {
            "index": "Welcome to the Expense Tracker App"
        }

        response = make_response(body, 200)

        return response


api.add_resource(Index, '/')


class Users(Resource):
    def get(self):
        users = User.query.all()
        users_list = []

        for user in users:
            users_list.append(user.to_dict())

        body = {
            "count": len(users_list),
            "users": users_list
        }

        return make_response(body, 200)

    def post(self):
        new_user = User(
            username=request.json.get("username"),
            email=request.json.get("email")
        )

        db.session.add(new_user)
        db.session.commit()

        response = make_response(new_user.to_dict(), 201)

        return response


api.add_resource(Users, '/users')


class UsersByID(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()

        if user == None:
            body = {
                "message": "This record does not exist in our database. Please try again."
            }
            response = make_response(body, 404)

            return response
        else:
            user_dict = user.to_dict()

            response = make_response(user_dict, 200)

            return response

    def patch(self, id):
        user = User.query.filter_by(id=id).first()

        for attr in request.json:
            setattr(user, attr, request.json.get(attr))

        db.session.add(user)
        db.session.commit()

        user_dict = user.to_dict()

        response = make_response(user_dict, 200)

        return response

    def delete(self, id):
        user = User.query.filter_by(id=id).first()

        db.session.delete(user)
        db.session.commit()

        body = {
            "delete_successful": True,
            "message": "User deleted."
        }

        response = make_response(body, 200)

        return response


api.add_resource(UsersByID, '/users/<int:id>')

class Transactions(Resource):
    def get(self):
        transactions_list = [transaction.to_dict() for transaction in Transaction.query.all()]

        body = {
            "count": len(transactions_list),
            "transactions": transactions_list
        }

        return make_response(body, 200)
    
api.add_resource(Transactions, '/transactions')

class Wallets(Resource):
    def post(self):
        new_wallet = Wallet(
            user_id=request.json.get("user_id"),
            name=request.json.get("name"),
            balance=request.json.get("balance")
        )

        db.session.add(new_wallet)
        db.session.commit()

        response = make_response(new_wallet.to_dict(), 201)

        return response
    
api.add_resource(Wallets, '/wallets')


@app.errorhandler(NotFound)
def handle_not_found(e):

    response = make_response(
        "Not Found: The requested resource does not exist.",
        404
    )

    return response


app.register_error_handler(404, handle_not_found)


if __name__ == "__main__":
    app.run(port=5555, debug=True)
