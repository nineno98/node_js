document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        const req = await fetch("/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const response = await req.json();
        console.log(response);
        if(response.status === 'success'){
            
            window.location.href = "/index";
        }
        else if(response.status === 'warning'){
            window.alert(response.message);
        }
        else {
            window.alert(response.message);
        }
    });