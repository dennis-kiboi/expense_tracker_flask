"""Remove unique constraint from category name

Revision ID: c1605ab8a5a7
Revises: 66d44427760c
Create Date: 2024-07-01 14:27:05.266276

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c1605ab8a5a7'
down_revision = '66d44427760c'
branch_labels = None
depends_on = None


def upgrade():
    # Create a new temporary table without the unique constraint
    op.create_table(
        'categories_temp',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String, nullable=False),  # Removed unique=True
        sa.Column('type', sa.String, nullable=False),
        sa.Column('created_at', sa.DateTime, default=sa.func.now()),
        sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id'))
    )

    # Copy data from old table to the new table
    op.execute('''
        INSERT INTO categories_temp (id, name, type, created_at, user_id)
        SELECT id, name, type, created_at, user_id FROM categories
    ''')

    # Drop the old table
    op.drop_table('categories')

    # Rename the new table to the original table name
    op.rename_table('categories_temp', 'categories')


def downgrade():
    # Create the original table with the unique constraint
    op.create_table(
        'categories_temp',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String, nullable=False, unique=True),  # Adding unique=True
        sa.Column('type', sa.String, nullable=False),
        sa.Column('created_at', sa.DateTime, default=sa.func.now()),
        sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id'))
    )

    # Copy data back from the current table to the old table structure
    op.execute('''
        INSERT INTO categories_temp (id, name, type, created_at, user_id)
        SELECT id, name, type, created_at, user_id FROM categories
    ''')

    # Drop the current table
    op.drop_table('categories')

    # Rename the old table back to the original table name
    op.rename_table('categories_temp', 'categories')
