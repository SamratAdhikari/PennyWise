from application import db
from application import app
from datetime import datetime
import enum


class IncomeExpenses(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(30), default = 'Income', nullable=False)
    category = db.Column(db.String(30), nullable=False, default='Salary')
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    amount = db.Column(db.Integer, nullable=False)
    

if __name__ == '__main__':
    with app.app_context():
        db.create_all()