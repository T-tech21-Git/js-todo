
const listcontainer = document.getElementById("list-container");
const tasktitle = document.getElementById("task-title");
const datepicker = document.getElementById("date-picker");

const modal = document.getElementById('calendar-modal');
const addTaskBtn = document.getElementById('add-task-btn');
const cancelBtn = document.getElementById('cancel-btn');
const addTaskFooterBtn = document.getElementById('add-task-footer-btn');

let tasks = [];

const today = new Date();
const weekday = today.toLocaleString('default', { weekday: 'short' });
const day = today.getDate();
const month = today.toLocaleString('default', { month: 'short' });
const year = today.getFullYear();
const formattedDate = `Today's, ${weekday} ${day} ${month} ${year}`;
document.getElementById('current-date').textContent = formattedDate;

const taskTitles = [

    "Complete the project",
    "Buy groceries",
    "Pick up the laundry",
    "Finish reading the book",
    "Prepare the presentation",
    "Call mom",
    "Go for a walk",
    "Water the plants",
    "Clean the kitchen",
    "Check emails",
    "Do my laundry",
    "Cancel milk delivery",
    "Clean fridge",
    "Check passport",
    "Do web check-in",
    "Download a movie for the flight",
    "Recharge mobile",
    "Pack swimsuit",
    "Complete the Monthly Report",
    "Attend Team Meeting at 10 AM",
    "Respond to Important Emails",
    "Organize Work Files",
    "Check and Update the Calendar",
    "Follow Up on Pending Tasks",
    "Schedule Client Call",
    "Prepare Meeting Agenda",
    "Submit Project Proposal",
    "Vacuum the Living Room",
    "Go for a Run",
    "Attend Yoga Class",
    "Do 30 Minutes of Cardio",
    "Stretch for 10 Minutes",
    "Track Caloric Intake",
    "Take a Walk After Lunch",
    "Prepare Healthy Snack",
    "Do Strength Training",
    "Take a Cold Shower",
    "Get 8 Hours of Sleep",
    "Write a Blog Post",
    "Draw or Paint",
    "Learn a New Language",
    "Watch a New Episode of a Series",
    "Start a New DIY Project",
    "Practice Playing the Guitar"

];

function getRandomTaskTitle() {
    const randomIndex = Math.floor(Math.random() * taskTitles.length);
    return taskTitles[randomIndex];
}

addTaskBtn.addEventListener('click', function() {

    tasktitle.placeholder = getRandomTaskTitle(); 
})

window.onload = function () {
    loadTasksFromLocalStorage();
};

addTaskBtn.addEventListener('click', function () {
    modal.style.display = 'flex';
});

window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

cancelBtn.addEventListener('click', function () {
    modal.style.display = 'none';  
    tasktitle.value = '';          
    datepicker.value = '';         
});

addTaskFooterBtn.addEventListener('click', function () {
    const title = tasktitle.value.trim();
    const date = datepicker.value;

    if (title === '') {
        alert('Please provide a title for the task!');
        return;
    }

    const task = {
        title: title,
        date: date,
        completed: false
    };

    tasks.push(task);

    saveTasksToLocalStorage();

    renderTasks();

    tasktitle.value = '';
    datepicker.value = '';
    modal.style.display = 'none';
    
});

const renderTasks = () => {
    listcontainer.innerHTML = ''; 

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('task-item');

        let titleInput = document.createElement('input');
        titleInput.type = 'text';  
        titleInput.value = task.title;  

        if (task.completed) {
            titleInput.checked = true;
            titleInput.classList.add('checked'); 
        }

        const titleLabel = document.createElement('span');
        titleLabel.textContent = task.title;

        titleInput.addEventListener('click', () => {
            task.completed = !task.completed;  
            if (task.completed) {
                titleInput.classList.add('checked');  

            } else {
                titleInput.classList.remove('checked');  

            }
            
            saveTasksToLocalStorage();
            renderTasks();  
        });
      
         titleInput.addEventListener('animationend', (e) => {
            if (e.animationName === 'crackerEffect' && titleInput.classList.contains('checked')) {

                li.style.opacity = 0; 
                setTimeout(() => {
                    tasks.splice(index, 1); 
                    saveTasksToLocalStorage();
                    renderTasks(); 
                }, 500); 
            }
        });

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.style.display = "none";  
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            saveTasksToLocalStorage();
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-btn');  

        editButton.addEventListener('click', () => {
            if (editButton.textContent === 'Edit') {

                titleInput.disabled = false;
                titleInput.focus();  

        checkbox.checked = false; 
        task.completed = false;   

                editButton.textContent = 'Save';
                editButton.classList.add('save-btn'); 
                editButton.classList.remove('edit-btn'); 
            } else {

                task.title = titleInput.value;
                saveTasksToLocalStorage();  
                renderTasks(); 

                editButton.textContent = 'Edit';
                editButton.classList.remove('save-btn');
                editButton.classList.add('edit-btn');
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1); 
            saveTasksToLocalStorage();
            renderTasks(); 
        });

        const buttonContainer = document.createElement('div')
        buttonContainer.classList.add('button-container')

        li.appendChild(checkbox);
        li.appendChild(titleInput);
        li.appendChild(buttonContainer)
        li.appendChild(deleteButton);
        li.appendChild(editButton);

       

        listcontainer.appendChild(li);
    });
};

const saveTasksToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasksFromLocalStorage = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
};

listcontainer.addEventListener('click', function(e){

    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    }

    else if(e.target.tagName === "deleteButton") {
        e.target.parentElement.remove();
    }

},false)

