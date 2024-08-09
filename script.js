document.addEventListener('DOMContentLoaded', () => {
    const projectForm = document.getElementById('projectForm');
    const projectList = document.getElementById('projects');
    const searchInput = document.getElementById('search');
    const timerElement = document.getElementById('timer');
 
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
 
    // Countdown Timer
    const deadline = new Date("2024-12-31T23:59:59").getTime(); // Set your deadline here
 
    const updateTimer = () => {
        const now = new Date().getTime();
        const timeLeft = deadline - now;
 
        if (timeLeft <= 0) {
            timerElement.innerHTML = "Registration closed";
            projectForm.querySelector('button').disabled = true; // Disable the form button
            return;
        }
 
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
 
        timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };
 
    setInterval(updateTimer, 1000);
 
    const renderProjects = () => {
        const searchTerm = searchInput.value.toLowerCase();
        projectList.innerHTML = '';
 
        const filteredProjects = projects.filter(project => 
            project.title.toLowerCase().includes(searchTerm)
        );
 
        filteredProjects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project-item';
            projectElement.innerHTML = `
                <h3>${project.title}</h3>
                <p><strong>Description:</strong> ${project.description}</p>
                <p><strong>Team:</strong> ${project.team.join(', ')}</p>
                <p><strong>Theme:</strong> ${project.theme}</p>
            `;
            projectList.appendChild(projectElement);
        });
    };
 
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
 
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const team = document.getElementById('team').value.split(',').map(member => member.trim());
        const theme = document.getElementById('theme').value;
 
        const newProject = { title, description, team, theme };
        projects.push(newProject);
        localStorage.setItem('projects', JSON.stringify(projects));
        renderProjects();
 
        projectForm.reset();
    });
 
    searchInput.addEventListener('input', renderProjects);
 
    // Initial render
    renderProjects();
});
