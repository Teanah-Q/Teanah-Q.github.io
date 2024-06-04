/** SIDE BAR NAV */
// switching tab
function openTab(evt, tabtitle) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabtitle).style.display = "block";
    evt.currentTarget.className += " active";
}
// opening/ closing navigation/ sidebar
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.querySelector(".btn").textContent = "←";
    document.querySelector(".btn").onclick = closeNav;
}
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.querySelector(".btn").textContent = "→";
    document.querySelector(".btn").onclick = openNav;
}

/** TASKS MANAGER */
const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const overdueList = document.getElementById("overdue-list");
const task_count = document.getElementById("task_count");
const doneList = documenet.getElementById("done-list");

let count = 0;

addTaskButton.addEventListener("click", () => {
    const task = taskInput.value;
    const priority = priorityInput.value;
    const deadline = deadlineInput.value;
    if (task.trim() === "" || deadline === "") {
        alert("Please select an upcoming date for the deadline.")
        return; // Don't add task if task or deadline is empty
    }
    const selectedDate = new Date(deadline);
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
        alert("Please select an upcoming date for the deadline.");
        return; // Don't add task if deadline is not in the future
    }
    const taskItem = document.createElement("div");
    taskItem.classList.add("task");
    taskItem.innerHTML = `
        <p>${task}</p>
        <p>Priority: ${priority}</p>
        <p>Deadline: ${deadline}</p>
        <button class="mark-done">Mark Done</button>
    `;

    if (new Date(deadline) <= new Date()) {
        overdueList.appendChild(taskItem);
    } else {
        taskList.appendChild(taskItem);
    }
    taskInput.value = "";
    priorityInput.value = "top";
    deadlineInput.value = "";

    // increase task count
    count++;
    task_count.textContent = `You have ${count} tasks left.`;

    // Store task in localStorage
    const taskObj = {
        task: task,
        priority: priority,
        deadline: deadline
    };
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));
});

taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("mark-done")) {
        const taskItem = event.target.parentElement;
        taskItem.style.backgroundColor = "#f2f2f2";
        event.target.disabled = true;

        // remove Task from TaskList and add to DoneList
        taskList.removeChild(taskItem);
        doneList.appendChild(TaskItem);
        
        // decrease task count
        count--;
        task_count.textContent = `You have ${count} tasks left.`;
    }
});

// Function to populate the task list from localStorage
function populateTaskList() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((taskObj) => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task");
        taskItem.innerHTML = `
            <p>${taskObj.task}</p>
            <p>Priority: ${taskObj.priority}</p>
            <p>Deadline: ${taskObj.deadline}</p>
            <button class="mark-done">Mark Done</button>
        `;

        if (new Date(taskObj.deadline) <= new Date()) {
            overdueList.appendChild(taskItem);
        } else {
            taskList.appendChild(taskItem);
        }
    });

    count = tasks.length;
    task_count.textContent = `You have ${count} tasks left.`;
}

window.addEventListener("load", populateTaskList);


/** HOME PAGE */
// loop through the photos
let index = 1;
displayPhoto(1);
function nextPhoto(n) {
    displayPhoto(index += n);
}
function displayPhoto(n) {
    let i;
    let images = document.getElementsByClassName("photo");
    if (n > images.length) { index = 1};
    if (n < 1) { index = images.length; }
    for (i = 0; i < images.length; i++) {
        images[i].style.display = "none";
    }
    images[index - 1].style.display = "block";
}

// Function to update the stats
function updateStats() {
    const totalTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const completedTasks = document.getElementsByClassName("mark-done").length;

    const completedPercentage = Math.floor((completedTasks / totalTasks.length) * 100);
    document.getElementById("completedPercentage").textContent = `${completedPercentage}%`;
    document.getElementById("completedTasks").textContent = completedTasks;
    document.getElementById("totalTasks").textContent = totalTasks.length;
}

window.addEventListener("load", updateStats);

// Function to clear all tasks
function clearAllTasks() {
    localStorage.removeItem("tasks");
    taskList.innerHTML = "";
    overdueList.innerHTML = "";
    count = 0;
    task_count.textContent = `You have ${count} tasks left.`;
    updateStats();
}

document.getElementById("clear-all").addEventListener("click", clearAllTasks);
