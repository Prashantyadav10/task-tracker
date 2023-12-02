// Function to handle adding a new task
function addTask(taskName, alarmTime) {
    // Trim whitespace from the taskName and alarmTime
    taskName = taskName.trim();
    alarmTime = alarmTime.trim();

    // Validate taskName and alarmTime
    if (!taskName || !alarmTime) {
        alert("Please enter a task and a valid alarm time.");
        return;
    }

    // Ensure alarmTime is in HH:MM format
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timePattern.test(alarmTime)) {
        alert("Invalid time format. Please use HH:MM format for the alarm time.");
        return;
    }

    // Create a new list item for the task
    const taskItem = document.createElement("li");

    // Create a span element for the task text
    const taskTextSpan = document.createElement("span");
    taskTextSpan.textContent = `${taskName} (Alarm time: ${alarmTime})`;

    // Create buttons for editing and deleting
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");

    const editAlarmButton = document.createElement("button");
    editAlarmButton.textContent = "Edit Alarm";
    editAlarmButton.classList.add("edit-alarm-button");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

    // Event listener for editing the task name
    editButton.addEventListener("click", function () {
        editTask(taskTextSpan);
    });

    // Event listener for editing the alarm time
    editAlarmButton.addEventListener("click", function () {
        editAlarmTime(taskTextSpan);
    });

    // Event listener for deleting the task
    deleteButton.addEventListener("click", function () {
        deleteTask(taskItem);
    });

    // Append buttons and task text span to the task item
    taskItem.appendChild(taskTextSpan);
    taskItem.appendChild(editButton);
    taskItem.appendChild(editAlarmButton);
    taskItem.appendChild(deleteButton);

    // Add the task to the task list
    document.getElementById("taskList").appendChild(taskItem);

    // Clear the input fields
    document.getElementById("taskInput").value = "";
    document.getElementById("alarmTime").value = "";

    // Save tasks to localStorage
    saveTasksToStorage();
}

// Function to handle editing the task name
function editTask(taskTextSpan) {
    const taskText = taskTextSpan.textContent;
    const newTaskName = prompt("Edit the task:", taskText.split(" (")[0]);
    if (newTaskName !== null) {
        // Get the current alarm time
        const alarmTime = getAlarmTimeFromTaskText(taskText);

        // Update the task text with the new task name and the existing alarm time
        taskTextSpan.textContent = `${newTaskName} (Alarm time: ${alarmTime})`;

        saveTasksToStorage();
    }
}

// Function to handle editing the alarm time
function editAlarmTime(taskTextSpan) {
    const taskText = taskTextSpan.textContent;
    const currentAlarmTime = getAlarmTimeFromTaskText(taskText);
    const newAlarmTime = prompt("Edit the alarm time (HH:MM format):", currentAlarmTime);

    if (newAlarmTime !== null) {
        // Validate the new alarm time format
        const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!timePattern.test(newAlarmTime)) {
            alert("Invalid time format. Please use HH:MM format for the alarm time.");
            return;
        }

        // Get the current task name
        const taskName = taskText.split(" (")[0];

        // Update the task text with the existing task name and the new alarm time
        taskTextSpan.textContent = `${taskName} (Alarm time: ${newAlarmTime})`;

        saveTasksToStorage();
    }
}

// Function to handle deleting a task
function deleteTask(taskItem) {
    if (confirm("Are you sure you want to delete this task?")) {
        taskItem.remove();
        saveTasksToStorage();
    }
}

// Helper function to extract alarm time from task text
function getAlarmTimeFromTaskText(taskText) {
    const match = taskText.match(/\(Alarm time: (.+?)\)/);
    return match && match[1] ? match[1] : "";
}
// Event listener for form submission
document.getElementById("taskForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const taskInput = document.getElementById("taskInput").value;
    const alarmTime = document.getElementById("alarmTime").value;

    addTask(taskInput, alarmTime);
});

// Load tasks from localStorage if available
function loadTasksFromStorage() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = savedTasks;
    }
}

// Save tasks to localStorage
function saveTasksToStorage() {
    const taskList = document.getElementById("taskList").innerHTML;
    localStorage.setItem('tasks', taskList);
}

// Call loadTasksFromStorage whenever the page loads
window.addEventListener('load', loadTasksFromStorage);

