window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('logout').style.display = 'none';
    const form = document.querySelector('form');
    form.addEventListener('submit', registerUser);
});

async function registerUser(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');

    //we can use a better validation, but it don't matters right now
    if (!email.trim() || !password.trim() || !rePass || password !== rePass) {
        event.target.reset();
        alert('try again');
    }

    try {
        const res = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });

        if (res.ok !== true) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();
        const userData = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        };
        event.target.reset();
        sessionStorage.setItem('userData', JSON.stringify(userData));
        window.location = 'index.html';

    } catch (error) {
        alert(error.message)
    }
}