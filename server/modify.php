<?php

//leggo il file json dal disco
$fileContent = file_get_contents("../dati.json");


// MODIFY PART
if(isset($_POST["id_toModify"]) && isset($_POST["newTaskName"])){
    var_dump($_POST["id_toModify"]);
    $index = (int)$_POST["id_toModify"];
    var_dump($index);
    var_dump($_POST["newTaskName"]);

    $tasks = json_decode($fileContent, true);
    $tasks[$index]["name"] = $_POST["newTaskName"];
    var_dump($tasks[$index]["name"]);
    
    $fileContent = json_encode($tasks);
    file_put_contents("../dati.json", $fileContent);
}



header('Content-Type: application/json');

echo $fileContent;