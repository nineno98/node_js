const colors = ['darkred', 'darkblue', 'darkgreen', 
    'darkorange', 'grey', 'darkgreen', 'darkred'
    ];
const root = document.getElementById('root');


async function addVote(vote, post_id, voteRatio){
    console.log("addvote");
    
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
    
    voteRatio.textContent = response.message;
}

async function deleteVote(post_id, voteRatio) {
    console.log("deletevote");
    const data = {
        post_id:post_id
    }
    const req = await fetch("/delete_vote", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const response = await req.json();
    voteRatio.textContent = response.message;
}

function renderMessages(data){
    data.forEach(element => {
        let isLiked = false;
        const div_area = document.createElement('div');
        div_area.classList.add("text_area");
        div_area.style.backgroundColor = colors[getRandomInt(colors.length)];
        
        const voteRatio = document.createElement('p');
        voteRatio.textContent = element.vote;

        const p = document.createElement('p');
        p.textContent = element.content;

        const span = document.createElement("span");
        span.textContent = `Created by ${element.username}`;
        span.classList.add("crated-by-span");

        const votes_container = document.createElement('div');
        votes_container.classList.add('votes-container');

        const like = document.createElement('a');
        like.classList.add("bi");
        const dislike = document.createElement('a');
        dislike.classList.add("bi");
        const UpdateUI = () => {
            like.className = element.vote === 1 ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up";
            dislike.className = element.vote === -1 ? "bi bi-hand-thumbs-down-fill" : "bi bi-hand-thumbs-down";
            voteRatio.textContent = element.vote;
            if(!element.vote || element.vote === 0){
                voteRatio.textContent = 0;
            }
        };

        like.onclick = async (event) => {
            event.preventDefault();
            if(element.vote === 1){
                await deleteVote(element.id, voteRatio);
                element.vote = 0;
            }
            else if(element.vote === -1){
                await deleteVote(element.id, voteRatio);
                await addVote(1, element.id, voteRatio);
                element.vote = 1;
            }
            else{
                await addVote(1, element.id, voteRatio);
                element.vote = 1;
            }
            UpdateUI();
        };

        dislike.onclick = async (event) => {
            console.log(element.vote);
            event.preventDefault();
            if(element.vote === -1){
                await deleteVote(element.id, voteRatio);
                element.vote = 0;
            }
            else if(element.vote === 1){
                await deleteVote(element.id, voteRatio);
                await addVote(-1, element.id, voteRatio);
                element.vote = -1;
            }
            else
            {
                
                await addVote(-1, element.id, voteRatio);
                element.vote = -1;
            }
            UpdateUI();
        };
        UpdateUI();
        

        
        votes_container.appendChild(span);
        votes_container.appendChild(like);
        votes_container.appendChild(voteRatio);
        votes_container.appendChild(dislike);

        div_area.appendChild(p);
        
        
        div_area.appendChild(votes_container);

        root.appendChild(div_area);
        
    });
}

async function fetchMessages(){
    const response = await fetch("/get_all_text");
    const data = await response.json();
    
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

