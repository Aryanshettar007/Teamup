document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const loginForm = document.getElementById('login-form');
    const skillsForm = document.getElementById('skills-form');
    let myProfile = {};
    let teamMembers = [];
    const progressBar = document.querySelector('.progress');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendMessageBtn = document.querySelector('.send-message');
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const addTaskBtn = document.querySelector('.add-task');
    const feedbackInput = document.getElementById('team-feedback');
    const submitFeedbackBtn = document.querySelector('.submit-feedback');

    // Function to switch pages
    function showPage(pageId) {
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
    }

    // Login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember-me').checked;

        // Simulate login (add backend logic later)
        console.log(`Username: ${username}, Password: ${password}, Remember Me: ${rememberMe}`);
        showPage('skills-page');
    });

    // Skills form submission with validation and progress
    skillsForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all required fields
        const requiredFields = ['name', 'college', 'gender', 'dob-day', 'dob-month', 'dob-year', 'skills', 'experience', 'looking-for', 'profile-pic'];
        let isValid = true;

        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            if (!input.value || (input.type === 'file' && !input.files.length)) {
                input.style.borderColor = '#ff4d4d';
                isValid = false;
            } else {
                input.style.borderColor = '#007bff';
            }
        });

        if (!isValid) {
            alert('Please fill in all required fields.');
            return;
        }

        myProfile = {
            name: document.getElementById('name').value,
            skills: document.getElementById('skills').value,
            experience: document.getElementById('experience').value,
            lookingFor: document.getElementById('looking-for').value,
            profilePic: document.getElementById('profile-pic').files[0] ? URL.createObjectURL(document.getElementById('profile-pic').files[0]) : null,
            college: document.getElementById('college').value,
            gender: document.getElementById('gender').value,
            dob: {
                day: document.getElementById('dob-day').value,
                month: document.getElementById('dob-month').value,
                year: document.getElementById('dob-year').value
            }
        };

        // Populate my profile on matching page
        document.getElementById('my-name').textContent = myProfile.name;
        document.getElementById('my-skills').textContent = `Skills: ${myProfile.skills}`;
        document.getElementById('my-experience').textContent = `Experience: ${myProfile.experience}`;
        document.getElementById('my-looking-for').textContent = `Looking for: ${myProfile.lookingFor}`;
        
        // Add college, gender, and DOB to my profile
        const additionalInfo = document.createElement('p');
        additionalInfo.id = 'my-additional-info';
        additionalInfo.textContent = `College: ${myProfile.college}, Gender: ${myProfile.gender}, DOB: ${myProfile.dob.day}/${myProfile.dob.month}/${myProfile.dob.year}`;
        document.getElementById('my-profile').appendChild(additionalInfo);

        // Add profile picture if exists
        if (myProfile.profilePic) {
            const profilePicImg = document.createElement('img');
            profilePicImg.src = myProfile.profilePic;
            profilePicImg.className = 'profile-pic';
            profilePicImg.alt = 'My Profile Pic';
            const myProfileDiv = document.getElementById('my-profile');
            const existingPic = myProfileDiv.querySelector('.profile-pic');
            if (existingPic) existingPic.remove();
            myProfileDiv.insertBefore(profilePicImg, myProfileDiv.firstChild.nextSibling);
        }

        // Update progress bar to 100%
        progressBar.style.width = '100%';

        showPage('matching-page');
    });

    // Update progress bar as user fills out the form
    skillsForm.addEventListener('input', () => {
        const filledFields = Array.from(skillsForm.querySelectorAll('input, select'))
            .filter(input => input.value && (input.type !== 'file' || input.files.length > 0)).length;
        const totalFields = skillsForm.querySelectorAll('input, select').length;
        const progress = (filledFields / totalFields) * 100;
        progressBar.style.width = `${progress}%`;
    });

    // Swipe and team-up functionality
    const cards = document.querySelectorAll('.card-stack .card');
    const swipeLeftButtons = document.querySelectorAll('.swipe-left');
    const swipeRightButtons = document.querySelectorAll('.swipe-right');

    swipeLeftButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            cards[index].classList.add('swiped-left');
            setTimeout(() => cards[index].style.display = 'none', 500);
        });
    });

    swipeRightButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            cards[index].classList.add('swiped-right');
            const teamMember = {
                name: cards[index].querySelector('h2').textContent,
                skills: cards[index].querySelector('p:nth-child(3)').textContent.replace('Skills: ', ''),
                experience: cards[index].querySelector('p:nth-child(4)').textContent.replace('Experience: ', ''),
                lookingFor: cards[index].querySelector('p:nth-child(5)').textContent.replace('Looking for: ', '')
            };
            teamMembers.push(teamMember);
            setTimeout(() => {
                cards[index].style.display = 'none';
                if (teamMembers.length > 0) {
                    updateTeamProfile();
                    showPage('team-hub-page');
                }
            }, 500);
        });
    });

    // Chat System
    sendMessageBtn.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            const messageElement = document.createElement('div');
            messageElement.className = 'chat-message';
            messageElement.textContent = `${myProfile.name}: ${message}`;
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            chatInput.value = '';
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessageBtn.click();
        }
    });

    // Project Management (Task List)
    addTaskBtn.addEventListener('click', () => {
        const task = newTaskInput.value.trim();
        if (task) {
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                <span>${task}</span>
                <button class="delete-task">Delete</button>
            `;
            taskList.appendChild(taskItem);
            newTaskInput.value = '';

            // Delete task functionality
            taskItem.querySelector('.delete-task').addEventListener('click', () => {
                taskList.removeChild(taskItem);
            });
        }
    });

    // Feedback Submission
    submitFeedbackBtn.addEventListener('click', () => {
        const feedback = feedbackInput.value.trim();
        if (feedback) {
            alert(`Feedback submitted: ${feedback}`);
            feedbackInput.value = '';
            // In a real app, you'd send this to a backend database
        }
    });

    // Update Team Profile
    function updateTeamProfile() {
        const teamName = `Team ${myProfile.name} & ${teamMembers.map(member => member.name).join(', ')}`;
        const teamSkills = [...new Set([myProfile.skills, ...teamMembers.map(member => member.skills)].join(', ').split(', '))].join(', ');
        const teamExperience = `Combined: ${parseInt(myProfile.experience) + teamMembers.reduce((sum, member) => sum + parseInt(member.experience), 0)}+ years`;
        const teamLookingFor = myProfile.lookingFor;

        document.getElementById('team-name').textContent = teamName;
        document.getElementById('team-skills').textContent = `Skills: ${teamSkills}`;
        document.getElementById('team-experience').textContent = `Experience: ${teamExperience}`;
        document.getElementById('team-looking-for').textContent = `Looking for: ${teamLookingFor}`;
    }
});
