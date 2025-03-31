
class Validator:

    def missing_task(self, task):
        if task == " ":
            return False
        return True
    
    def invalid_task(self, task):
        if task.isdigit():
            return False
        return True
