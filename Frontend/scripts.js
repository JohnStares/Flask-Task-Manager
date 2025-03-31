document.addEventListener("DOMContentLoaded", function () {
    fetchTasks();
});

function fetchTasks() {
    fetch("http://127.0.0.1:5000/tasks")
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = ""; // Clear existing tasks

            tasks.forEach(task => {
                const li = document.createElement("li");
                li.textContent = task.task; // Display task name

                // Create 'Mark as Complete' button
                const completeBtn = document.createElement("button");
                completeBtn.textContent = "✔️";
                completeBtn.classList.add("complete-btn");
                completeBtn.onclick = () => markTaskComplete(task.id);

                // Create 'Delete' button
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "❌";
                deleteBtn.classList.add("delete-btn");
                deleteBtn.onclick = () => deleteTask(task.id);

                // Append buttons to task item
                li.appendChild(completeBtn);
                li.appendChild(deleteBtn);
                taskList.appendChild(li);
            });
        })
        .catch(error => console.error("Error fetching tasks:", error));
}


function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskName = taskInput.value.trim();

    if (taskName === "") {
        showFlashMessage("Task cannot be empty!", "error");
        return;
    }

    fetch("http://127.0.0.1:5000/add-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: taskName })
    })
    .then(response => response.json())
    .then(() => {
        showFlashMessage("Task added successfully!", "success");
        taskInput.value = "";
        fetchTasks();
    })
    //.catch(error => console.error("Error adding task:", error));
    .catch(() => showFlashMessage("Error adding task!", "error"));
}

function deleteTask(taskId) {
    fetch(`http://127.0.0.1:5000/delete-task/${taskId}`, { method: "DELETE" })
    .then(response => response.json())
    .then(() => {
        showFlashMessage("Task deleted successfully!", "success");
        fetchTasks();
    })
    .catch(() => showFlashMessage("Error deleting task!", "error"));
}


function markTaskComplete(taskId) {
    fetch(`http://127.0.0.1:5000/mark-as-completed/${taskId}/complete`, { method: "PUT" })
    //.then(response => response.json())
    .then(() => {
        showFlashMessage("Task marked as completed!", "success");
        fetchTasks();
    })
    .catch(() => showFlashMessage("Error marking task!", "error"));
}











// Function to show flash messages
function showFlashMessage(message, type = "success") {
    const flashMessage = document.getElementById("flashMessage");
    flashMessage.textContent = message;
    
    // Add success or error styling
    flashMessage.className = `flash-message ${type === "error" ? "flash-error" : "flash-success"}`;
    
    // Show message
    flashMessage.style.display = "block";

    // Hide after 3 seconds
    setTimeout(() => {
        flashMessage.style.display = "none";
    }, 10000000);
}
