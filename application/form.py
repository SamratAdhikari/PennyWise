from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, IntegerField
from wtforms.validators import DataRequired

class UserDataForm(FlaskForm):
    type = SelectField('Type', validators=[DataRequired()],
                                choices=[('Income', 'Income'),
                                        ('Expense', 'Expense')])

    category = SelectField("Category", validators=[DataRequired()],
                                            choices =[('Salary', 'Salary'),
                                            ('Investment', 'Investment'),
                                            ('Rent', 'Rent'),
                                            ('Hustle', 'Hustle'),
                                            ('Food', 'Food'),
                                            ('Entertainment', 'Entertainment')]
                            )
    amount = IntegerField('Amount', validators = [DataRequired()])                                   
    submit = SubmitField('Generate Report')                            