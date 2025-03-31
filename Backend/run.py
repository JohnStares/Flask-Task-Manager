from app import Task_manager
from app.models import db


app = Task_manager()


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
