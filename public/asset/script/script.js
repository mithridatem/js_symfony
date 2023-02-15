const tasks = document.querySelectorAll('.tasks');
console.log(tasks);

tasks.forEach(element => {
    element.children[2].addEventListener('click', (e)=>{
        const json = {'id':element.children[1].id, 'name':element.children[0].textContent,'status':true}
        let xhr = new XMLHttpRequest();
        xhr.open("POST", '/task/update', true);
        //Envoie les informations du header adaptées avec la requête
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(json); 
        console.log(json);})
});
    