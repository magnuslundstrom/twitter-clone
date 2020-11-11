<?php

require_once __DIR__ . '/helperFunctions/sendRes.php';
require_once __DIR__ . '/helperFunctions/validator.php';
require_once __DIR__ . '/private/db.php';

session_start();
$loggedInUser = $_SESSION['user']['user_id'] ?? null;
$receiverId = $_POST['receiverId'];

// LATER --- CHECK FOR IF USERS ACTUALLY EXISTS AND IF THE IDS ARE VALID

try {
    $db = new Database();
    $sql = '
    SELECT conversation_id FROM
    conversations
    WHERE
    user_one = :loggedInUser AND user_two = :receiverId OR
    user_two = :loggedInUser AND user_one = :receiverId';

    $conversationId = $db->prepare($sql)->bindAndExecute(['loggedInUser', $loggedInUser, 'receiverId', $receiverId])->getOne();

    if (isset($conversationId['conversation_id'])) {
        header('Content-type: application/json');
        echo '{"conversation_id": "' . $conversationId['conversation_id'] . '"}';
        exit();
    }

    $sql = '
        INSERT INTO
        conversations
        (user_one, user_two)
        VALUES
        (:loggedInUser, :receiverId)';
    $conversationId = $db->prepare($sql)->bindAndExecute(['loggedInUser', $loggedInUser, 'receiverId', $receiverId])->getLastId();

    header('Content-type: application/json');
    echo '{"conversation_id": "' . $conversationId . '"}';
    exit();

} catch (Exception $ex) {

}