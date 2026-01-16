async function savePost(text) {
    try{
        const data = {
        usertext: text
        };
        console.log(data);
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
        console.log(response);
    }catch(e){
        console.log(e);
    }
}


document.getElementById("sendtext").addEventListener("submit",async (e) => {
        try{
            e.preventDefault();
            
            const content = e.target.usertext.value.trim();
            console.log(content);
            
            if(content.length > 0){
                
                console.log("bggb");
                await savePost(content);
            }
            else{
                alert("Empty post is invalid!");
                return;
            }
                
            
            
        } catch (err){
            console.log(err);
        }
        
        
        
    });

