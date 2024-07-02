from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData()

db = SQLAlchemy(metadata=metadata)


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    email = db.Column(db.String(120), unique=True)
    created_at = db.Column(db.DateTime, default=db.func.now())

    categories = db.relationship("Category", back_populates="user") #back_ref
    wallets = db.relationship("Wallet", back_populates="user")

    serialize_rules = ('-categories.user', '-wallets.user')

    def __repr__(self):
        return f"<User {self.id}: {self.username}>"


class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    name = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())

    user = db.relationship("User", back_populates="categories")
    # transactions = db.relationship("Transaction", back_populates="category")

    serialize_rules = ('-user.categories',)

    def __repr__(self):
        return f"<Category {self.id}: {self.name}>"

class Wallet(db.Model, SerializerMixin):
    __tablename__ = "wallets"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    name = db.Column(db.String(80), nullable=False)
    balance = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())

    user = db.relationship("User", back_populates="wallets")
    # transactions = db.relationship("Transaction", back_populates="wallet")

    serialize_rules = ('-user.wallets',)

    def __repr__(self):
        return f"<Wallet {self.id}: {self.name}>"

class Transaction(db.Model, SerializerMixin):
    __tablename__ = "transactions"

    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    wallet_id = db.Column(db.Integer, db.ForeignKey('wallets.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(255), nullable=True)
    date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())

    category = db.relationship("Category") # , back_populates="transactions")
    wallet = db.relationship("Wallet") # , back_populates="transactions")

    serialize_rules = ('-category.transactions', '-wallet.transactions')

    def __repr__(self):
        return f"<Transaction {self.id}: {self.description}, {self.amount}>"
    