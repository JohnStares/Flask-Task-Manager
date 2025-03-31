from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String(100000), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.today().date())
    status = db.Column(db.String(20), default="Unfinished")


    def __repr__(self):
        return f"{self.task}"
