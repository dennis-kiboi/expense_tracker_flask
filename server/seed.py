from faker import Faker
from app import app
from models import db, User, Category, Wallet, Transaction

with app.app_context():
    fake = Faker()

    # Delete all records/rows in the tables
    User.query.delete()
    Category.query.delete()
    Wallet.query.delete()
    Transaction.query.delete()

    # Empty lists for each table
    users = []
    categories = []
    wallets = []
    transactions = []

    # Seed Users
    for _ in range(100):
        username = fake.user_name()
        domain = fake.free_email_domain()
        email = f"{username}@{domain}"
        users.append(User(username=username, email=email))

    db.session.add_all(users)
    db.session.commit()

    # Seed Categories and Wallets
    for user in users:
        # Create Categories for each user
        for _ in range(3):
            category = Category(
                user_id=user.id,
                name=fake.word(),
                type=fake.random_element(elements=('income', 'expense'))
            )
            categories.append(category)

        # Create Wallets for each user
        for _ in range(2):
            wallet = Wallet(
                user_id=user.id,
                name=fake.word(),
                balance=fake.random_number(digits=5, fix_len=False)
            )
            wallets.append(wallet)

    db.session.add_all(categories)
    db.session.add_all(wallets)
    db.session.commit()

    # Seed Transactions
    for _ in range(200):
        transaction = Transaction(
            category_id=fake.random_element(elements=[category.id for category in categories]),
            wallet_id=fake.random_element(elements=[wallet.id for wallet in wallets]),
            amount=fake.random_number(digits=4, fix_len=False),
            description=fake.sentence(),
            date=fake.date_time_this_year()
        )
        transactions.append(transaction)

    db.session.add_all(transactions)
    db.session.commit()
