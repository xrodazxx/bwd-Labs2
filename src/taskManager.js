let currentTaskId = 0;

function openModal() {
    document.getElementById("taskModal").style.display = "block";
}

function closeModal() {
    document.getElementById("taskModal").style.display = "none";
    document.getElementById("taskInput").value = ""; 
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText) {
        const task = {
            id: ++currentTaskId,
            text: taskText,
            status: 'to-do'
        };

        saveTask(task);
        renderTask(task);
        closeModal();
    } else {
        alert("Пожалуйста, введите описание задачи."); 
    }
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
}

function renderTask(task) {
    const taskList = document.createElement("div");
    taskList.classList.add("task");
    taskList.id = `task-${task.id}`;
    taskList.innerHTML = `
        ${task.text}
        <div class="task-buttons">
            <button class="move-btn" onclick="moveTask(${task.id}, 'in-progress')">В процесс</button>
            <button class="move-btn" onclick="moveTask(${task.id}, 'done')">Решено</button>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Удалить</button>
        </div>
    `;
    document.getElementById(task.status).appendChild(taskList);
}

function moveTask(taskId, targetColumn) {
    const taskElement = document.getElementById(`task-${taskId}`);
    if (!taskElement) return;

    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks.find(t => t.id === taskId);
    task.status = targetColumn;

    localStorage.setItem('tasks', JSON.stringify(tasks));
    document.getElementById(targetColumn).appendChild(taskElement);
}

function deleteTask(taskId) {
    const taskElement = document.getElementById(`task-${taskId}`);
    if (taskElement) {
        taskElement.remove();
    }

    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        currentTaskId = Math.max(currentTaskId, task.id);
        renderTask(task);
    });
}

function searchTasks() {
    const keyword = document.getElementById("searchInput").value.trim().toLowerCase();
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    document.querySelectorAll(".task").forEach(task => task.remove());

    const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(keyword));
    filteredTasks.forEach(renderTask);
}

window.onload = loadTasks;
