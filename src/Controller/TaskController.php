<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Task;
use App\Repository\TaskRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class TaskController extends AbstractController
{
    #[Route('/task', name: 'app_task')]
    public function showAllTask(TaskRepository $repo): Response
    {
        //récupération de la liste des tâches dont status = 1
        $tasks = $repo->findBy(['status' => 1]);
        //rendu du template twig
        return $this->render('task/index.html.twig',[
                'tasks' => $tasks, 
        ]);
    }
    //fonction qui ajoute une nouvelle catégorie depuis un json
    #[Route('/task/update/{id}', name: 'app_task_update', methods: 'POST')]
    public function updatetask(taskRepository $repo,
    EntityManagerInterface $manager, Request $request,
    SerializerInterface $serializer, $id
    ): Response
    {
        //récupération de l'objet si il existe
        $task = $repo->find($id);
        //test si la catégorie existe
        if($task == null){
            return $this->json(['error'=>'La Tache n\'existe pas'],200,
            ['Content-Type'=>'application/json','Access-Control-Allow-Origin'=> '*',
            'Access-Control-Allow-Methods'=>'PATCH']);
        }
        //test si elle existe
        else{
            //récupérer le json avec Request
            $json = $request->getContent();
            //tester si on à bien récupéré un json
            if($json != null){
                //décoder le json -> convertir en tableau
                $recup = $serializer->decode($json, 'json');
                //setter le nouveau status
                $task->setStatus($recup['status']);
                //sauvegarder la modification dans le manager
                $manager->persist($task);
                //envoyer la modification a la BDD
                $manager->flush();
                //retourne un json
                return $this->json(['error'=>'Le status à été modifié'],200,
                ['Content-Type'=>'application/json','Access-Control-Allow-Origin'=> '*']);
                
            }
            //test si je n'ai pas de json dans le résultat de la requête
            else{
                //retourne une erreur pas de json
                return $this->json(['error'=>'L\'entête http ne contient aucun json'],200,
                ['Content-Type'=>'application/json','Access-Control-Allow-Origin'=> '*']);
            }
        }
    }
}
