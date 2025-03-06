document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const loginForm = document.getElementById('login-form');

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
});

document.addEventListener('DOMContentLoaded', () => {
    const skillsForm = document.getElementById('skills-form');
    let myProfile = {};
    const progressBar = document.querySelector('.progress');
