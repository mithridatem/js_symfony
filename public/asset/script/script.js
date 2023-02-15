const tasks = document.querySelectorAll('.tasks');
console.log(tasks);

tasks.forEach(element => {
    element.children[2].addEventListener('click', (e)=>{
        //test si checked
        if(element.children[1].checked){
            const id = element.children[1].id;
            const name = element.children[0].textContent;
             //création du json
            const json = '{"id":'+'"'+id+'"'+',"name":'+'"'+name+'"'+', "status":false}';
            let xhr = new XMLHttpRequest();
            console.log(element.children[1].id);  
            //connexion
            xhr.open("POST", '/task/update/'+element.children[1].id, true);
            //Envoie les informations du header adaptées avec la requête
            xhr.setRequestHeader("Content-Type", "application/json");
            //Appelle une fonction au changement d'état.
            xhr.onreadystatechange = function() { 
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    //refresh ton interface
                    console.log('ok');
                }else{
                    console.log('erreur');
                }
            }
            //envoi du json
            xhr.send(json);
            //suppression de l'element
            element.remove();
            console.log(json);
        }else{
            console.log('cocher la checkbox');
        }
       })
});
    