<?php

//leggo il file json dal disco
$fileContent = file_get_contents("../dati.json");



// ADD NEW DATA IN JSON
//se ho i dati per aggiungere un task...
if( isset($_POST["name"]) && isset($_POST["completed"])) {

    //converto il json in un array associativo php
    $tasks = json_decode($fileContent, true);

    // Siccome in php completed mi arriva come stringa "false", farò il controllo per restituirlo boolean
    if($_POST["completed"]=="false"){
        $_POST["completed"] = false;
    }
    else{
        $_POST["completed"] = true;
    }
    //creo un nuovo task in php
    $newTask = [
        "name" => $_POST["name"],
        "completed" => $_POST["completed"]
    ];


    //pusho il nuovo task nel mio array
    $tasks[] = $newTask;

    //converto tutto l'array in un json
    $fileContent = json_encode($tasks);

    //scrivo il json su disco
    file_put_contents("../dati.json", $fileContent);
    
}

// REMOVE DATA FROM JSON
elseif(isset($_POST["id"])){
    
    $index = (int)$_POST["id"];
    
    $tasks = json_decode($fileContent, true);
    array_splice($tasks, $index, 1);
    
    $fileContent = json_encode($tasks);
    file_put_contents("../dati.json", $fileContent);
}

// MODIFY DATA FROM JSON
elseif(isset($_POST["id_toModify"]) && isset($_POST["newTaskName"])){
    
    $index = (int)$_POST["id_toModify"];
    
    $tasks = json_decode($fileContent, true);
    $tasks[$index]["name"] = $_POST["newTaskName"];
    
    
    $fileContent = json_encode($tasks);
    file_put_contents("../dati.json", $fileContent);
}

header('Content-Type: application/json');

echo $fileContent;