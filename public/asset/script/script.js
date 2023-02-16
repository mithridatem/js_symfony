const tasks = document.querySelectorAll('.tasks');
const msg_zone = document.querySelector('#msg_zone');
console.log(tasks);
//version xhr
/* tasks.forEach(element => {
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
                //OK status de la tache mise à jour
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    console.log(this.response);
                    //suppression de l'element HTML du DOM
                    element.remove();
                }
                //Erreur il n'y a pas de taches
                else if(this.status === 400){
                    console.log(this.reponse);
                }
                //Erreur pas de json
                else if(this.status === 404){
                    console.log(this.response);
                }
            }
            //envoi du json
            xhr.send(json);
        // test si la chebox n'est pas cochée 
        }else{
            console.log('cocher la checkbox');
        }
       })
}); */

//version fetch
tasks.forEach(element=>{
    element.children[2].addEventListener('click', (e)=>{
        //test si checked
        if(element.children[1].checked){
            //stokage data pour route api
            const id = element.children[1].id;
            const name = element.children[0].textContent;
            const url = '/task/update/'+id;
            const json = JSON.stringify({id:id,name:name, status:false});
            //fetch api
            fetch(url,
                {   
                    method :'POST',
                    headers :{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:json
                })
                .then(async response => {
                    const data = await response.json();
                    console.log(data.error);
                    console.log(response.status);
                    //test si le code http est 200
                    if(response.status === 200){
                        //suppression de l'element HTML du DOM
                        element.remove();
                        //message confirmation
                        msg_zone.style.color = "green";
                        msg_zone.textContent = response.status+" : "+data.error;
                    }
                    //test la tache n'existe pas
                    else if(response.status === 400){
                        //message d'erreur
                        msg_zone.style.color = "tomato";
                        msg_zone.textContent = response.status+" : "+data.error;
                    }
                    //test erreur il n'y a pas de json
                    else if(response.status === 404){
                        //message d'erreur
                        msg_zone.style.color = "red";
                        msg_zone.textContent = response.status+" : "+data.error;
                    }
                    // check for error response
                    if (!response.ok) {
                      // get error message from body or default to response statusText
                      const error = (data && data.message) || response.statusText;
                      //ƒ° native de JS utilisé sur les objets de type Promise
                      return Promise.reject(error);
                    }
                })
                .catch(error => {
                    console.error("There was an error!", error);
                });
        }
        //test si pas checked
        else{
            msg_zone.style.color = "orange";
            msg_zone.textContent = "Veuillez cocher la checkbox !!!";
        }
    })
});