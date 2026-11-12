document.addEventListener('DOMContentLoaded', () => {
    
    // --- SIGNUP FORM LOGIC ---
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Page refresh hone se rokein

            const username = document.getElementById('signupUser').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPass').value;

            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password })
                });
                
                const data = await response.json();

                if (response.ok) {
                    alert(data.message); // "User registered successfully"
                    window.location.href = './login.html'; // Login page par bhej dein
                } else {
                    alert(data.message); // Error message dikhayein
                }
            } catch (error) {
                alert("Something went wrong. Please try again.");
            }
        });
    }

    // --- LOGIN FORM LOGIC ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Page refresh hone se rokein

            const loginId = document.getElementById('loginId').value;
            const password = document.getElementById('loginPass').value;

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ loginId, password })
                });
                
                const data = await response.json();

                if (response.ok) {
                    // Token localStorage 
                    localStorage.setItem('token', data.token);
                    alert(data.message); // "Logged in successfully"
                    window.location.href = './index.html'; // Home page par bhej dein
                } else {
                    alert(data.message); // "Invalid credentials"
                }
            } catch (error) {
                alert("Something went wrong. Please try again.");
            }
        });
    }
});