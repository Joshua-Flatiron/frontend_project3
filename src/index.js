let addProject = false;
let editProject = false;
const projectURL = "http://localhost:3000/projects"
const taskURL = "http://localhost:3000/tasks"
const mainContainer = document.querySelector('#main-container')
const projectFormContainer = document.querySelector(".projectContainer")
const addProjectBtn = document.querySelector("#new-project-btn")
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
    projectDiv.setAttribute('class', "projects")
    const title = ce('h1')

    delBtn = ce("button")
    delBtn.className = "project-release"
    delBtn.setAttribute("project-task-id", project.id)
    delBtn.innerText = "Delete Project"

    editBtn = ce("button")
    editBtn.className = "project-edit"
    editBtn.setAttribute("id", project.id)
    editBtn.innerText = "Edit Project"

        const handleEdit = (event) => {
            const name = event.target.parentElement.firstElementChild.innerText
            const importance = parseInt(event.target.parentElement.children[1].innerText.split(' ')[1]) 
            const time = parseInt(event.target.parentElement.children[2].innerText.split(' ')[2])
            const editProjectId = event.target.id
        
            const editProjectForm = ce('FORM')
                    editProjectForm.setAttribute('class', 'edit-project' )
                    editProjectForm.name = 'taskForm'
        
            editProject = !editProject
            editProject ? editProjectForm.style.display = "block" : editProjectForm.style.display = "none";
            
           
            
                
                const nameInput = ce('INPUT')
                    nameInput.type="TEXT";
                    nameInput.name="name"
                    nameInput.value= name
                    nameInput.placeholder="Insert Task Name"
                    
                const timeInput = ce('INPUT')
                    timeInput.type="INTEGER";
                    timeInput.name="time"
                    timeInput.value= time
                    timeInput.placeholder="Time required(in mins)"

                const importanceInput = ce('INPUT')
                    importanceInput.type="INTEGER";
                    importanceInput.name="time"
                    importanceInput.value= importance
                    importanceInput.placeholder="Time required(in mins)"
                
                const projectId = ce('INPUT')
                    projectId.type="HIDDEN"
                    projectId.name="ProjectId"
                    projectId.value=`${editProjectId}`
                
                const submit = ce('INPUT')
                    submit.type="submit"
                    submit.name="submit"
                    submit.value="Update Project"
                    submit.class="submit"
            
                editProjectForm.append(nameInput, importanceInput, timeInput,  projectId, submit)
                projectDiv.prepend(editProjectForm)

                editProjectForm.addEventListener('submit', event =>{
                    editProject = false
                    event.preventDefault()
                    console.log('clicked')
                    let name = event.target[0].value
                    let importance = event.target[1].value
                    let time = event.target[2].value
                    let thisId = parseInt(event.target['ProjectId'].value)

                    fetch(projectURL + '/' + `${thisId}`, {
                        method: "PATCH", 
                        headers: {
                            'Content-Type' : 'application/json',
                            'Accept' : 'application/json'
                        },
                        body: JSON.stringify({
                            name : name, 
                            importance: importance,
                            time: time
                        })
                    })
                    .then(resp => resp.json())
                    .then(fetchProject)
                })
        }

    editBtn.addEventListener('click', handleEdit)
        


    delBtn.addEventListener("click", () => {
        fetch(projectURL+"/"+project.id, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(console.log)
        projectDiv.remove()
    })

    title.innerHTML += `${project.name} `
 
    
    const importance = ce('p')
    const time = ce('p')
    importance.innerText = `Importance: ${project.importance}`
    time.innerText = `Time needed: ${project.time} mins`
    
    const taskTitle = ce('h2')
    taskTitle.innerText = 'List of the tasks:'
    const addNewTask = ce('button')
    addNewTask.innerText = "Add new task"


    const addTaskForm = ce('FORM')
        addTaskForm.setAttribute('class', 'add-task' )
        addTaskForm.name = 'taskForm'
        
        const nameInput = ce('INPUT')
            nameInput.type="TEXT";
            nameInput.name="name"
            nameInput.value=""
            nameInput.placeholder="Insert Task Name"
            
        const timeInput = ce('INPUT')
            timeInput.type="INTEGER";
            timeInput.name="time"
            timeInput.value=""
            timeInput.placeholder="Time required(in mins)"
        
        const projectId = ce('INPUT')
            projectId.type="HIDDEN"
            projectId.name="ProjectId"
            projectId.value=`${project.id}`
        
        const submit = ce('INPUT')
            submit.type="submit"
            submit.name="submit"
            submit.value="Create Task"
            submit.class="submit"
    
addTaskForm.append(nameInput, timeInput, projectId, submit)

    const handleNewTask = (event) => {
        event.preventDefault()
        let name = event.target[0].value
        let time = parseInt(event.target[1].value)
        let projectID = parseInt(event.target['ProjectId'].value)
        event.target.reset()



        fetch(taskURL, {
            method: "POST", 
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }, 
            body: JSON.stringify({
                name : name, 
                time : time, 
                project_id : projectID
            })
        })
        .then(resp => resp.json())
        .then(fetchProject)
    } 
    
addTaskForm.addEventListener('submit', handleNewTask)   
const addTask = (task) => {

    const taskDiv = ce('div')

            
            delBtn = ce("button")
            delBtn.className = "release"
            delBtn.setAttribute("data-task-id", task.id)
            delBtn.innerText = "Delete Task"

            editBtn = ce("button")
            editBtn.className = "task-edit"
            editBtn.setAttribute("edit-task-id", task.id)
            editBtn.innerText = "Edit Task"

        
            taskDiv.setAttribute('id', task.id)
            const tTitle = ce('h2')
            tTitle.innerHTML += `${task.name}  `
            //  <button class= "edit-btn" id = "${task.id}">Edit</button> <button class= "delete-btn" id = "${task.id}">Delete</button> `
            // tTitle.append(delBtn)
            const tTime = ce('p')
            tTime.innerText = `Time needed: ${task.time} mins`
            tTitle.append(editBtn,delBtn)

            taskDiv.append(tTitle, tTime)

            
            return taskDiv
}

    projectDiv.append(title, importance, time,  editBtn, delBtn, taskTitle)

    if(project.tasks.length > 0){
        project.tasks.forEach(task => {
            const newTask = addTask(task)
            projectDiv.append(newTask)
        })
    }

    
    projectDiv.append(addTaskForm)
    

    mainContainer.append(projectDiv)
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
    .then(fetchProject
    )   
}


// CALLS // 

fetchProject()

// EVENT LISTENERS //

addProjectBtn.addEventListener("click", () => {
    addProject = !addProject;
    addProject ? projectFormContainer.style.display = "block" : projectFormContainer.style.display = "none";
  });

newProjectForm.addEventListener('submit', handleNewProject)
