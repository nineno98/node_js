document.getElementById('forgot-pass-form').addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
        email: e.target.email.value
    }

    const req = await fetch("/forgott-password", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const response = await req.json();
    if(response.status === 'success'){
            
        window.location.href = "/index";
    }
    else if(response.status === 'warning'){
         window.alert(response.message);
    }
    else {
         window.alert(response.message);
    }
})