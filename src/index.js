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
    title.innerText = project.name
    const importance = ce('p')
    const time = ce('p')
    importance.innerText = `Importance: ${project.importance}`
    time.innerText = `Time needed: ${project.time}`


    projectDiv.append(title, importance, time) 

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
            tTitle.innerText = task.name
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