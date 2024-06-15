<?php

//leggo il file json dal disco
$fileContent = file_get_contents("../dati.json");


// REMOVE PART
if(isset($_POST["id"])){
    var_dump($_POST["id"]);
    $index = (int)$_POST["id"];
    var_dump($index);

    $tasks = json_decode($fileContent, true);
    array_splice($tasks, $index, 1);
    
    $fileContent = json_encode($tasks);
    file_put_contents("../dati.json", $fileContent);
}



header('Content-Type: application/json');

echo $fileContent;