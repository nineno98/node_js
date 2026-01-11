const colors = ['darkred', 'darkblue', 'darkgreen', 
    'darkorange', 'grey', 'darkgreen', 'darkred'
    ];
const root = document.getElementById('root');


async function handleVote(vote, post_id, vote){
    console.log("handlevode")
    const data = {
        vote:vote,
        post_id:post_id
    }
    const req = await fetch("/add_vote",{
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const response = await req.json();
    
    vote.textContent = response.message;
}

function renderMessages(data){
    data.forEach(element => {
        const div_area = document.createElement('div');
        div_area.classList.add("text_area");
        div_area.style.backgroundColor = colors[getRandomInt(colors.length)];
        
        const vote = document.createElement('p');
        vote.textContent = element.votes;

        const p = document.createElement('p');
        p.textContent = element.content;

        const span = document.createElement("span");
        span.textContent = element.username;
        span.classList.add("crated-by-span");

        const votes_container = document.createElement('div');
        votes_container.classList.add('votes-container');

        const like = document.createElement('a');
        like.textContent = "Like";
        like.onclick=(event) => {
            event.preventDefault();
            handleVote(1, element.id, vote);
        }

        const dislike = document.createElement('a');
        dislike.textContent = "Dislike";
        dislike.onclick = (event) => {
            event.preventDefault();
            handleVote(-1, element.id, vote);
        }

        

        votes_container.appendChild(like);
        votes_container.appendChild(vote);
        votes_container.appendChild(dislike);

        div_area.appendChild(p);
        div_area.appendChild(span);
        
        div_area.appendChild(votes_container);

        root.appendChild(div_area);
        
    });
}

async function fetchMessages(){
    const response = await fetch("/get_all_text");
    const data = await response.json();
    console.log(data.data)
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

