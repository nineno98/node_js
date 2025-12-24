const colors = ['darkred', 'darkblue', 'darkgreen', 
    'darkorange', 'grey', 'darkgreen', 'darkred'
    ];
const root = document.getElementById('root');

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

        div_area.appendChild(p);
        div_area.appendChild(span);
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

