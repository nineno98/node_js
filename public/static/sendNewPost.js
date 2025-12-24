document.getElementById("sendtext").addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = {
            usertext: e.target.usertext.value
        };

        const res = await fetch("/text_input_post", {
            method:'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const response = await res.json();
        if(response.status === 'success'){
            window.alert(response.message);
            window.location.href = "/index";
        }
    });