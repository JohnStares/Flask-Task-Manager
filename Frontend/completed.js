document.addEventListener("DOMContentLoaded", function () {
    fetchTasks();
});

function fetchTasks() {
    fetch("http://127.0.0.1:5000/tasks")
        .then(response => response.json())
        .then(tasks => {
            const unfinishedTasksList = document.getElementById("unfinishedTasks");
            const completedTasksList = document.getElementById("completedTasks");
            unfinishedTasksList.innerHTML = "";
            completedTasksList.innerHTML = "";
            
            tasks.forEach(task => {
                const listItem = document.createElement("li");
                listItem.textContent = task.task;
                
                if (task.status === "Completed") {
                    completedTasksList.appendChild(listItem);
                } else {
                    unfinishedTasksList.appendChild(listItem);
                }
            });
        })
        .catch(error => console.error("Error fetching tasks:", error));
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
    }, 3000);
}
