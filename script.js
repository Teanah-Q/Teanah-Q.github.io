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
    document.getElementById("main").style.marginLeft= "0";
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
	<button class="mark-done">Mark Done</button>`
    ;
    if (new Date(deadline) <= new Date()) {
        overdueList.appendChild(taskItem);
    }
    else {
        taskList.appendChild(taskItem);
    }
	taskInput.value = "";
	priorityInput.value = "top";
	deadlineInput.value = "";

	// increase task count 
	count++;
	task_count.textContent = `You have ${count} tasks left.`;
});

taskList.addEventListener("click", (event) => {
	if (event.target.classList.contains("mark-done")) {
		const taskItem = event.target.parentElement;
		taskItem.style.backgroundColor = "#f2f2f2";
		event.target.disabled = true;

		// decrease task count
		count--;
		task_count.textContent = `You have ${count} tasks left.`;
	}
});

/** Random colour container */


/** HOME PAGE STATS */
// add


// loop through the photos
let index = 1;
displayPhoto(1);
function nextPhoto(n) {
    displayPhoto(index += n);
}
function displayPhoto(n) {
    let i;
    let images = document.getElementsByClassName("photo");
    if (n > images.length) {index = 1}  // return to index 1 once all photos looped
    if (n < 1) {index = images.length}  // going backwards
    for (let i = 0; i < images.length; i++) {  // for looping all the imgs in 'images' 
        images[i].style.display = "none";  // make other images "invisible"
    }
    images[index-1].style.display = "block"; // minus one as lists begin in zero
}