
const submit = document.getElementById("submit");
const deleteb = document.getElementById("deleteb");
const title = document.getElementById("title");
const desc = document.getElementById("desc");
const todo = document.getElementById("todo");

submit.addEventListener("click", (e) => {
    e.preventDefault();

    let titlec = title.value;
    let descc = desc.value;

    if (!titlec || !descc) {
        alert("Please enter both title and description!");
        return;
    }

    let existingTodos = JSON.parse(localStorage.getItem("todos")) || [];

    existingTodos.push({ title: titlec, description: descc });

    localStorage.setItem("todos", JSON.stringify(existingTodos));

    title.value = "";
    desc.value = "";

    displayTodos();
});

deleteb.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("todos"); 
    todo.innerHTML = ""; 
});

function displayTodos() {

    let tasks = JSON.parse(localStorage.getItem("todos")) || [];

    todo.innerHTML = "";

    tasks.forEach((task, index) => {
        let taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerHTML = `
            <h2>${task.title}</h2>
            <p>${task.description}</p>
            <button class="deleteTask btn btn-danger" data-index="${index}">Delete</button>
        `;
        todo.appendChild(taskElement);
    });

    document.querySelectorAll(".deleteTask").forEach(button => {
        button.addEventListener("click", (e) => {
            let index = e.target.getAttribute("data-index");
            deleteTask(index);
        });
    });
}

function deleteTask(index) {

    let tasks = JSON.parse(localStorage.getItem("todos")) || [];

    tasks.splice(index, 1);

    localStorage.setItem("todos", JSON.stringify(tasks));

    displayTodos();
}

window.onload = displayTodos;
