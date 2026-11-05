let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

// Save tasks in LocalStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks() {

    taskList.innerHTML = "";

    emptyMessage.style.display =
        tasks.length === 0 ? "block" : "none";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task;

        const actions = document.createElement("div");
        actions.className = "actions";

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit";

        editButton.addEventListener("click", function() {
            editTask(index);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";

        deleteButton.addEventListener("click", function() {
            deleteTask(index);
        });

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        li.appendChild(span);
        li.appendChild(actions);

        taskList.appendChild(li);
    });
}

// Add new task
function addTask() {

    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push(task);

    saveTasks();
    displayTasks();

    taskInput.value = "";
}

// Edit task
function editTask(index) {

    const updatedTask = prompt(
        "Edit your task:",
        tasks[index]
    );

    if (updatedTask !== null && updatedTask.trim() !== "") {

        tasks[index] = updatedTask.trim();

        saveTasks();
        displayTasks();
    }
}

// Delete task
function deleteTask(index) {

    if (confirm("Are you sure you want to delete this task?")) {

        tasks.splice(index, 1);

        saveTasks();
        displayTasks();
    }
}

// Button click event
addButton.addEventListener("click", addTask);

// Enter key event
taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});

// Show saved tasks when page loads
displayTasks();
