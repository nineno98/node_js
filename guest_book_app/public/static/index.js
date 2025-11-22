const root = document.getElementById('root');
window.onload = function(){
    fetchMessages();
}

async function fetchMessages(){
    const response = await fetch("/get_all_text");
    const data = await response.json();
    return data;
    
}

fetchMessages().then(data => {
    const ol = document.createElement('ol');
    data.forEach(element => {
        const li = document.createElement('li');
        li.textContent = element.content;
        ol.appendChild(li);
        
    });
    root.appendChild(ol);
});

