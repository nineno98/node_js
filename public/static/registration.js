document.getElementById('registration-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            username: e.target.username.value,
            firstname: e.target.firstname.value,
            lastname: e.target.lastname.value,
            password: e.target.password.value,
            email: e.target.email.value
        };

        if(e.target.password.value.localeCompare(e.target.password_again.value) != 0){
            window.alert("A beírt jelszó nem egyezik!");
            return 0;
        } 

        const res = await fetch("/registration", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const response = await res.json();
        if(response.status === 'success'){
            window.alert(response.message);
            window.location.href = "/login";
        }
    });