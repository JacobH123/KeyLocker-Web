"""Initial tables

Revision ID: ffc46333d77d
Revises: 
Create Date: 2025-08-30 16:18:37.423227

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ffc46333d77d'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # Create users table first
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('email', sa.String(), nullable=False, unique=True),
        sa.Column('password_hash', sa.String(), nullable=True),
        sa.Column('verified', sa.Boolean(), nullable=True, server_default=sa.false()),
    )

    # Then create vault_items table
    op.create_table(
        'vault_items',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('label', sa.String(), nullable=False),
        sa.Column('username', sa.String(), nullable=True),
        sa.Column('password_encrypted', sa.LargeBinary(), nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE')
    )

    # ### end Alembic commands ###


def downgrade():
    # Drop vault_items first because it depends on users
    op.drop_table('vault_items')
    # Then drop users table
    op.drop_table('users')

