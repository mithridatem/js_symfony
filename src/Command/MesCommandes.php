<?php
namespace App\Command;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;


#[AsCommand(
    name:'app:test-cmd',
    hidden:false,
    aliases: ['app:test1']
)]
class MesCommandes extends Command{
    public function __construct(){
        parent::__construct();
    }
    public function configure(){}
    public function execute(InputInterface $input, OutputInterface $output):int{
        $test = new Process(['ls','al']);
        $test->run();
        /*  $output->writeln($test);*/
        $test->getOutput();
        return Command::SUCCESS;
    }
}