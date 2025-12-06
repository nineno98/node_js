

const root = document.getElementById('root');
window.onload = function(){
    fetchMessages();
}

async function fetchMessages(){
    const response = await fetch("/get_all_text");
    const data = await response.json();
    return data;
    
}
const colors = ['darkred', 'darkblue', 'darkgreen', 
    'darkorange', 'grey', 'darkgreen', 'darkred'
    ];
function getRandomInt(max){
    return Math.floor(Math.random() * max);
}
fetchMessages().then(data => {
    
    data.forEach(element => {
        const div_area = document.createElement('div');
        div_area.classList.add("text_area");
        div_area.style.backgroundColor = colors[getRandomInt(7)];
        
        const p = document.createElement('p');
        p.textContent = element.content;
        const span = document.createElement("span");
        span.textContent = element.username;
        div_area.appendChild(p);
        div_area.appendChild(span);
        root.appendChild(div_area);
        
    });
    
});

