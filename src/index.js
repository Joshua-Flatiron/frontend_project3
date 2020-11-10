const projectURL = "http://localhost:3000/projects"
const mainContainer = document.querySelector('#main-container')
const ce = (element) => {
    return document.createElement(element)
}

const fetchProject = () => {
    fetch(projectURL)
    .then(resp => resp.json())
    .then(data => renderProjects(data))
}




const renderOneProject = (project) => {
    const projectDiv = ce('div')
    projectDiv.setAttribute('data-project-id', project.id)
    const title = ce('h1')
    title.innerHTML += `${project.name} <button class= "edit-btn" id = "${project.id}">Edit</button> <button class= "delete-btn" id = "${project.id}">Delete</button> `
    const importance = ce('p')
    const time = ce('p')
    importance.innerText = `Importance: ${project.importance}`
    time.innerText = `Time needed: ${project.time}`
    
    const taskTitle = ce('h2')
    taskTitle.innerText = 'List of the tasks:'
    const addNewTask = ce('button')
    addNewTask.innerText = `<button class= "edit-btn" id = "${project.id}">Add new task</button>`

    projectDiv.append(title, importance, time, taskTitle, addNewTask) 

    project.tasks.forEach(task => {
            const newTask = addTask(task)
            projectDiv.append(newTask)
        })

    
    
    mainContainer.append(projectDiv)
}

const addTask = (task) => {
    const taskDiv = ce('div')
            taskDiv.setAttribute('id', task.id)
            const tTitle = ce('h2')
            tTitle.innerHTML += `${task.name} <button class= "edit-btn" id = "${task.id}">Edit</button> <button class= "delete-btn" id = "${task.id}">Delete</button> `
            const tTime = ce('p')
            tTime.innerText = `Time needed: ${task.time}`
        
            taskDiv.append(tTitle, tTime)
            return taskDiv
}

const renderProjects = (projects) => {
    mainContainer.innerHTML = ``

    projects.forEach(project => {
        renderOneProject(project)
    })
}

fetchProject()