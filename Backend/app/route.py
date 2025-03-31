from flask import Blueprint, request, jsonify
from .logic import Validator
from .models import Task, db
from.schema import tasks_schema

routes = Blueprint("routes", __name__)

va = Validator()

@routes.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()

    return jsonify(tasks_schema.dump(tasks)), 200

@routes.route("/add-tasks", methods=["POST"])
def add_task():

    data = request.get_json()
    data = data["name"]

    if va.missing_task(data) == False:
        return jsonify({"error": "Task is missing. Try inputing a task."})
    elif va.invalid_task(data) == False:
        return jsonify({"error": "Task is invalid. Task cannot be numbers alone."})
    else:
        try:
            new_task = Task(task=data)
            db.session.add(new_task)
            db.session.commit()
        except Exception as e:
            return jsonify({"error": e})
        else:
            return jsonify({"Message": "Task Added auccessfylly."}), 201
        

@routes.route("/delete-task/<int:id>", methods=["DELETE"])
def delete_task(id):
    task = Task.query.get(id)

    if not task:
        return jsonify({"error": "No task found in the database."})
    else:
        try:
            db.session.delete(task)
            db.session.commit()
        except Exception as e:
            return jsonify({"error": e})
        else:
            return({"Message": "Task deleted successfully."})

@routes.route("/mark-as-completed/<int:id>/complete", methods=["PUT"])
def mark_as_completed(id):
    task = Task.query.get(id)

    if not task:
        return jsonify({"error": "No task found in the database."})
    else:
        try:
            task.status = "Completed"

            db.session.commit(), 201
        except Exception as e:
            return jsonify({"error": e})
        else:
            return jsonify({"Message": "Tasks successfully completed."})