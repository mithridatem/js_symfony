//récupération des taches
const tasks = document.querySelectorAll('.tasks');
//récupération zone messages d'erreurs et de résultats
const msg_zone = document.querySelector('#msg_zone');

//delete version fetch
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
                        //vider la zone message au bout de 2 secondes
                        const myTimeout = setTimeout(()=>{
                            msg_zone.textContent = "";  
                        }, 2000);
                    }
                    //test la tache n'existe pas
                    else if(response.status === 400){
                        //message d'erreur
                        msg_zone.style.color = "tomato";
                        msg_zone.textContent = response.status+" : "+data.error;
                        //vider la zone message au bout de 2 secondes
                        const myTimeout = setTimeout(()=>{
                            msg_zone.textContent = "";  
                        }, 2000);
                    }
                    //test erreur il n'y a pas de json
                    else if(response.status === 404){
                        //suppression de l'element HTML du DOM
                        element.remove();
                        //message d'erreur
                        msg_zone.style.color = "red";
                        msg_zone.textContent = response.status+" : "+data.error;
                        //vider la zone message au bout de 2 secondes
                        const myTimeout = setTimeout(()=>{
                            msg_zone.textContent = "";  
                        }, 2000);
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
            //vider la zone message au bout de 2 secondes
            const myTimeout = setTimeout(()=>{
                msg_zone.textContent = "";  
            }, 2000);
        }
    })
});
console.log(tasks);
//edit version fetch
tasks.forEach(element=>{
    element.children[3].addEventListener('click', (e)=>{
        //récupération de la value
        const name = element.children[0].textContent;
        //récupération de l'id
        const id = element.children[1].id;
        //test si la checkbox est cochée
        if(element.children[1].checked){
            //stockage du nouveau nom
            let newName = "";
            //si le nom de la tache n'est pas changé
            if(newName == ""){
                //coloration du bouton
                element.children[3].style.backgroundColor = '#EFEFEF';
                //remplacement texte du bouton
                element.children[3].innerText = 'edit';
            }
            //test si le nouveau nom existe
            if(element.children[0].type == 'text' && element.children[0].value !=null){
                //stockage du nouveau nom de la tache
                newName = element.children[0].value;
            }
            //test si le premier enfant est un paragraphe
            if(element.children[0].type!== 'text'){
                //préparation du nouvel enfant
                const input = document.createElement("input");
                input.setAttribute('type','text');
                input.setAttribute('name',name);
                input.setAttribute('placeholder', name);
                //récupération de l'ancien enfant
                const old = element.children[0];
                // Remplacer l'ancien enfant par le nouveau
                element.replaceChild(input, old);
                //coloration du bouton
                element.children[3].style.backgroundColor = 'rgb(222, 119, 51)';
                //remplacement texte du bouton
                element.children[3].innerText = 'Valider';
            }
            //test si le premier enfant est un input
            else{
                //test si new name est vide
                if(newName == ""){
                    msg_zone.style.color = "orange";
                    msg_zone.textContent = "Modification annulée";
                    //vider la zone message au bout de 2 secondes
                    const myTimeout = setTimeout(()=>{
                        msg_zone.textContent = "";  
                    }, 2000);
                    //décocher la checkbox
                    element.children[1].checked = false;
                }
                //récupération du name
                const texte = element.children[0].name;
                //préparation du nouvel enfant
                const p = document.createElement("p");
                p.setAttribute('name',texte);
                p.setAttribute('id',id);
                p.textContent = texte;
                //récupération de l'ancien enfant
                const old = element.children[0];
                // Remplacer l'ancien enfant par le nouveau
                element.replaceChild(p, old);
                //decocher la checkbox
                element.children[1].checked = false;
            }
            //envoi en bdd fetch
            if(newName!=""){
                //update de la valeur
                element.children[0].textContent = newName;
                //création des ressources pour API
                const url = '/task/update/name/'+id;
                const json = JSON.stringify({id:id, name:newName, status:true});
                //coloration du bouton reset to color default
                element.children[3].style.backgroundColor = '#EFEFEF';
                //fetch api
                fetch(url,
                    {   
                        method :'POST',
                        headers :{
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body:json
                    })//réponse API
                    .then(async response => {
                        const data = await response.json();
                        console.log(data.error);
                        console.log(response.status);
                        //test si le code http est 200
                        if(response.status === 200){
                            //message confirmation
                            msg_zone.style.color = "green";
                            msg_zone.textContent = response.status+" : "+data.error;
                            //vider la zone message au bout de 2 secondes
                            const myTimeout = setTimeout(()=>{
                                msg_zone.textContent = "";  
                            }, 2000);
                            //decocher la checkbox
                            element.children[1].checked = false;
                        }
                        //test la tache n'existe pas
                        else if(response.status === 400){
                            //message d'erreur
                            msg_zone.style.color = "tomato";
                            msg_zone.textContent = response.status+" : "+data.error;
                            //vider la zone message au bout de 2 secondes
                            const myTimeout = setTimeout(()=>{
                                msg_zone.textContent = "";  
                            }, 2000);
                            //decocher la checkbox
                            element.children[1].checked = false;
                        }
                        //test erreur il n'y a pas de json
                        else if(response.status === 404){
                            //suppression de l'element HTML du DOM
                            element.remove();
                            //message d'erreur
                            msg_zone.style.color = "red";
                            msg_zone.textContent = response.status+" : "+data.error;
                            //vider la zone message au bout de 2 secondes
                            const myTimeout = setTimeout(()=>{
                                msg_zone.textContent = "";  
                            }, 2000);
                            //decocher la checkbox
                            element.children[1].checked = false;
                        }
                        // check for error response
                        if (!response.ok) {
                        // get error message from body or default to response statusText
                        const error = (data && data.message) || response.statusText;
                        //ƒ° native de JS utilisé sur les objets de type Promise
                        return Promise.reject(error);
                        }
                    })//catch des erreurs
                    .catch(error => {
                        console.error("There was an error!", error);
                        //decocher la checkbox
                        element.children[1].checked = false;
                    });
            }
        }
        //test si la checkbox n'est pas cochée
        else{
            //affichage de l'erreur
            msg_zone.style.color = "tomato";
            msg_zone.textContent = 'cocher la checkbox';
            //vider la zone message au bout de 2 secondes
            const myTimeout = setTimeout(()=>{
                msg_zone.textContent = "";  
            }, 2000);
            element.children[1].checked = false;
        }
    })
});

//delete version xhr
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