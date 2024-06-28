from faker import Faker

from app import app
from models import db, User

with app.app_context():
    fake = Faker()

    # Delete all records/rows in the user table
    User.query.delete()

    # Empty list of users
    users = []

    for _ in range(100):
        username = fake.user_name()
        domain = fake.free_email_domain()
        email = f"{username}@{domain}"
        users.append(User(username=username, email=email))

    db.session.add_all(users)

    db.session.commit()
    
