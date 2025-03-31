from flask_marshmallow import Marshmallow
from .models import Task

ma = Marshmallow()

class TaskSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Task

    id = ma.auto_field()
    task = ma.auto_field()
    status = ma.auto_field()
   
task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)

