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
                /* OK status de la tache mise à jour  */
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    console.log(this.response);
                    //suppression de l'element HTML du DOM
                    element.remove();
                }
                /* Erreur il n'y a pas de taches */
                else if(this.status === 400){
                    console.log(this.reponse);
                }
                /* Erreur pas de json*/
                else if(this.status === 404){
                    console.log(this.response);
                }
            }
            //envoi du json
            xhr.send(json);
        /* test si la chebox n'est pas cochée */   
        }else{
            console.log('cocher la checkbox');
        }
       })
});
    