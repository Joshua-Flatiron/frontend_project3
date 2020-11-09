const projectURL = "http://localhost:3000/projects"


const fetchProject = () => {
    fetch(projectURL)
    .then(resp => resp.json())
    .then(console.log)
}


fetchProject()