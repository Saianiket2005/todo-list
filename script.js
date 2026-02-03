// State Management
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

const taskList = document.getElementById('task-list');
const addBtn = document.getElementById('add-task-btn');

// Initialize
document.getElementById('current-date').innerText = new Date().toDateString();
renderTasks();

function addTask() {
    const text = document.getElementById('task-input').value;
    const date = document.getElementById('task-date').value;
    const category = document.getElementById('task-category').value;

    if (!text) return alert("Enter a task!");

    const newTask = {
        id: Date.now(),
        text: text,
        date: date || "No deadline",
        category: category,
        completed: false
    };

    tasks.push(newTask);
    saveAndRender();
    
    // Clear inputs
    document.getElementById('task-input').value = "";
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveAndRender();
}

function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <div class="task-info">
                <strong>${task.text}</strong>
                <small>📅 ${task.date} <span class="category-tag">${task.category}</span></small>
            </div>
            <div class="actions">
                <button onclick="toggleTask(${task.id})">✔️</button>
                <button onclick="deleteTask(${task.id})">🗑️</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

addBtn.addEventListener('click', addTask);