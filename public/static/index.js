const colors = ['darkred', 'darkblue', 'darkgreen', 
    'darkorange', 'grey', 'darkgreen', 'darkred'
    ];
const root = document.getElementById('root');

async function handleVote(vote, post_id){
    console.log("handlevode")
    const data = {
        vote:vote,
        post_id:post_id
    }
    const req = await fetch("",{
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const response = await req.json();
    console.log(response);
}

function renderMessages(data){
    data.forEach(element => {
        const div_area = document.createElement('div');
        div_area.classList.add("text_area");
        div_area.style.backgroundColor = colors[getRandomInt(colors.length)];
        
        const p = document.createElement('p');
        p.textContent = element.content;

        const span = document.createElement("span");
        span.textContent = element.username;
        span.classList.add("crated-by-span");

        const like = document.createElement('a');
        like.textContent = "Like";
        like.onclick=(event) => {
            event.preventDefault();
            handleVote(1, element.id);
        }

        div_area.appendChild(p);
        div_area.appendChild(span);
        div_area.appendChild(like);
        root.appendChild(div_area);
        
    });
}

async function fetchMessages(){
    const response = await fetch("/get_all_text");
    const data = await response.json();
    console.log(data.status)
    if(data.status == "sucess"){
        renderMessages(data.data);
    }
    else{
        console.log(data)
    }
    
    
    
}

function getRandomInt(max){
    return Math.floor(Math.random() * max);
}

window.onload = fetchMessages;

