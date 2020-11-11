let addProject = false;
const projectURL = "http://localhost:3000/projects"
const mainContainer = document.querySelector('#main-container')
const projectFormContainer = document.querySelector(".projectContainer")
const addProjectBtn = document.querySelector("#new-project-btn")
const addTaskBtn = document.querySelector(".add-task-id")
const newProjectForm = document.querySelector('.add-project-form')
const ce = (element) => {
    return document.createElement(element)
}

const fetchProject = () => {
    fetch(projectURL)
    .then(resp => resp.json())
    .then(data => renderProjects(data))
    // debugger
}




const renderOneProject = (project) => {
    const projectDiv = ce('div')
    projectDiv.setAttribute('data-project-id', project.id)
    const title = ce('h1')

    delBtn = ce("button")
    delBtn.className = "project-release"
    delBtn.setAttribute("project-task-id", project.id)
    delBtn.innerText = "Delete"

    editBtn = ce("button")
    editBtn.className = "project-edit"
    editBtn.setAttribute("edit-project-id", project.id)
    editBtn.innerText = "Edit"

    delBtn.addEventListener("click", () => {
        fetch(projectURL+"/"+project.id, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(console.log)
        projectDiv.remove()
    })

    title.innerHTML += `${project.name} `
    // <button class= "edit-btn" id = "${project.id}">Edit</button> <button class= "delete-btn" id = "${project.id}">Delete</button> `
   
    title.append("  ",delBtn, "         ",editBtn)
    
    const importance = ce('p')
    const time = ce('p')
    importance.innerText = `Importance: ${project.importance}`
    time.innerText = `Time needed: ${project.time}`
    
    const taskTitle = ce('h2')
    taskTitle.innerText = 'List of the tasks:'
    const addNewTask = ce('button')
    addNewTask.innerText = "Add new task"

    const formAddTask = ce('div')
        formAddTask.setAttribute('class', 'add-task-id' )
            formAddTask.innerHTML = `        <form class="add-task-form">
            
            <input
              type="text"
              name="name"
              value=""
              placeholder="Task's name..."
              class="input-text"
            />
            
            <input
              type="text"
              name="name"
              value=""
              placeholder="Time needed..."
              class="input-text"
            />

            <input
              type="hidden"
              name="image"
              value="${project.id}"
              placeholder="Project's name..."
              class="input-text"
            />
            
            <input
              type="submit"
              name="submit"
              value="New Task"
              class="submit"
            />
          </form>`

    projectDiv.append(title, importance, time, taskTitle,formAddTask) 

    if(project.task){
        project.tasks.forEach(task => {
            const newTask = addTask(task)
            projectDiv.append(newTask)
        })
    }

    mainContainer.append(projectDiv)
}

const addTask = (task) => {

    const taskDiv = ce('div')

            
            delBtn = ce("button")
            delBtn.className = "release"
            delBtn.setAttribute("data-task-id", task.id)
            delBtn.innerText = "X"

            editBtn = ce("button")
            editBtn.className = "task-edit"
            editBtn.setAttribute("edit-task-id", task.id)
            editBtn.innerText = "E"

       
            taskDiv.setAttribute('id', task.id)
            const tTitle = ce('h2')
            tTitle.innerHTML += `${task.name}  `
            //  <button class= "edit-btn" id = "${task.id}">Edit</button> <button class= "delete-btn" id = "${task.id}">Delete</button> `
            // tTitle.append(delBtn)
            const tTime = ce('p')
            tTime.innerText = `Time needed: ${task.time}`
            tTitle.append("  ",delBtn," ",editBtn)

            taskDiv.append(tTitle, tTime)

            
            return taskDiv
}

const renderProjects = (projects) => {
    mainContainer.innerHTML = ``

    projects.forEach(project => {
        renderOneProject(project)
    })
}

const handleNewProject = (event) =>{
    event.preventDefault()

    const name = event.target[0].value
    const time = parseInt(event.target[1].value)
    const importance = parseInt(event.target[2].value)

    event.target.reset()

    fetch(projectURL, {
        method: "POST", 
        headers: {
            'Content-Type' : 'application/json', 
            'Accept' : 'application/json'
        }, 
        body: JSON.stringify({
            name: name, 
            time: time, 
            importance: importance,
            tasks : {}
        })
    })
    .then(resp => resp.json())
    .then(newProject => {
        renderOneProject(newProject)
    })   
}


// CALLS // 

fetchProject()

// EVENT LISTENERS //

addProjectBtn.addEventListener("click", () => {
    addProject = !addProject;
    addProject ? projectFormContainer.style.display = "block" : projectFormContainer.style.display = "none";
  });

newProjectForm.addEventListener('submit', handleNewProject)
