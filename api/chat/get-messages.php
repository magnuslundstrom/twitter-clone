<?php

require_once __DIR__ . '/private/db.php';
require_once __DIR__ . '/helperFunctions/sendRes.php';
session_start();

$loggedInUser = $_SESSION['user']['user_id'] ?? null;
$chattingWithId = $_GET['userId'];

if (!$loggedInUser) {
    sendJSON(400, 'error', 'you must be authenticated');
}
if (!$chattingWithId) {
    sendJSON(400, 'error', 'you must provide a user id to chat with');
}
if (!ctype_digit($chattingWithId)) {
    sendJSON(400, 'error', 'you must provide a valid id');
}

try {
    $bindArr = ['loggedInUser', $loggedInUser, 'chattingWithId', $chattingWithId];
    $db = new Database();
    $sql = '
    SELECT
    message_id,
    body,
    sender_fk,
    receiver_fk,
    conversation_fk,
    user_id,
    CONCAT(firstName, " ", lastName) as fullName,
    messages.createdAt as sentAt
    FROM
    messages
    JOIN users as u
    ON u.user_id = sender_fk
    WHERE
    sender_fk = :loggedInUser AND receiver_fk = :chattingWithId OR
    receiver_fk = :loggedInUser AND sender_fk = :chattingWithId';
    $data = $db->prepare($sql)->bindAndExecute($bindArr)->getAll();

    foreach ($data as &$message) {
        $message['sentAt'] = date_format(new DateTime($message['sentAt']), "M d - g:i A");
    }

    sendJSON(200, 'messages', $data);

} catch (Exception $ex) {
    echo $ex;
};