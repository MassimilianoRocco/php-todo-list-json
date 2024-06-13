<?php 

$tasks = [
    [
        'name' => 'Chiamare ufficio',
        'completed' => false,
    ],
    [
        'name' => 'Sistemare progetto',
        'completed' => false,
    ],
    [
        'name' => 'Chiamare cliente',
        'completed' => false,
    ],
    [
        'name' => 'Bug Fix',
        'completed' => false,
    ],
    [
        'name' => 'Riunione con il team',
        'completed' => false,
    ],
];

header('Content-Type: application/json');

$jsonString = json_encode($tasks);

echo $jsonString;