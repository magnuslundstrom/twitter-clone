<?php

require_once __DIR__ . '/private/db.php';
require_once __DIR__ . '/helperFunctions/sendRes.php';
session_start();

$loggedInUser = $_SESSION['user']['user_id'] ?? null;

if (!$loggedInUser) {
    sendJSON(400, 'error', 'you must be authenticated');
}

try {
    $bindArr = ['loggedInUser', $loggedInUser];
    $db = new Database();
    $sql = '
    SELECT
    u.user_id,
    CONCAT(u.firstName, " ", u.lastName) as fullName,
    latest_activity,
    c.conversation_id,
    latest_message_fk
    FROM conversations as c
    JOIN users as u
    ON c.user_one = user_id AND user_id != :loggedInUser OR c.user_two = user_id AND user_id != :loggedInUser
    WHERE user_one = :loggedInUser OR user_two = :loggedInUser
    ORDER BY c.latest_activity DESC';

    $data = $db->prepare($sql)->bindAndExecute($bindArr)->getAll();

    foreach ($data as &$chat) {
        $chat['latest_activity'] = date_format(new DateTime($chat['latest_activity']), "M d - g:i A");
    }

    sendJSON(200, 'chats', $data);

} catch (Exception $ex) {
    echo $ex;
};