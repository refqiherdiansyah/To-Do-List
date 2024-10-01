let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value;

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = ""; // Reset input field
        updateTasksList();
        updateProgress(); // Update progress after adding a task
    }
};
const updateTasksList = () => {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = ''; // Clear the task list before re-rendering

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task">
                    <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} />
                    <p class="${task.completed ? 'completed' : ''}">${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/edit.png" alt="Edit" class="edit-task" data-index="${index}" />
                    <img src="./img/bin.png" alt="Delete" class="delete-task" data-index="${index}" />
                </div>
            </div>
        `;

        taskList.appendChild(listItem);
    });

    // Add functionality to checkboxes
    document.querySelectorAll('.checkbox').forEach((checkbox, index) => {
        checkbox.addEventListener('change', () => {
            tasks[index].completed = !tasks[index].completed;
            updateTasksList(); // Re-render to reflect changes
            updateProgress(); // Update progress after changing task status
        });
    });

    // Add functionality to delete buttons
    document.querySelectorAll('.delete-task').forEach((button) => {
        button.addEventListener('click', () => {
            const taskIndex = button.getAttribute('data-index');
            tasks.splice(taskIndex, 1); // Remove the task from array
            updateTasksList(); // Re-render the list
            updateProgress(); // Update progress after deleting a task
        });
    });

    // Add functionality to edit buttons
    document.querySelectorAll('.edit-task').forEach((button) => {
        button.addEventListener('click', () => {
            const taskIndex = button.getAttribute('data-index');
            const currentTask = tasks[taskIndex];
            const newText = prompt("Edit your task:", currentTask.text); // Prompt for new task text

            if (newText !== null && newText.trim() !== "") {
                tasks[taskIndex].text = newText; // Update the task text
                updateTasksList(); // Re-render the list to show updated task
            }
        });
    });
};

const updateProgress = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    document.getElementById('numbers').innerText = `${completedTasks} / ${totalTasks}`;
    document.getElementById('progress').style.width = `${progressPercentage}%`;
};

// Make sure to add event listener to the button
document.querySelector("button[type='submit']").addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});


