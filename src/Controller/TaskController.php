<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Task;
use App\Repository\TaskRepository;
use Doctrine\ORM\EntityManagerInterface;

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
}
