document.addEventListener('DOMContentLoaded', () => {
    
    // SIGNUP FORM LOGIC 
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 

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
                    window.location.href = './login.html'; 
                } else {
                    alert(data.message); 
                }
            } catch (error) {
                alert("Something went wrong. Please try again.");
            }
        });
    }

    // LOGIN FORM LOGIC
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 

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
                    window.location.href = './index.html'; 
                } else {
                    alert(data.message); // "Invalid credentials"
                }
            } catch (error) {
                alert("Something went wrong. Please try again.");
            }
        });
    }
});