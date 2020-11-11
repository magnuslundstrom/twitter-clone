<?php
require_once __DIR__ . '/helperFunctions/sendRes.php';
require_once __DIR__ . '/helperFunctions/validator.php';
require_once __DIR__ . '/private/db.php';
session_start();

$loggedInUser = $_SESSION['user']['user_id'] ?? null;
$receiver = $_POST['receiverId'] ?? null;
$conversationId = $_POST['conversationId'] ?? null;
$message = $_POST['body'] ?? null;

if (!$loggedInUser) {
    sendJSON(400, 'message', 'you must be authenticated');
}

if (!$receiver) {
    sendJSON(400, 'message', 'you must provide a receiver id');
}
if (!ctype_digit($receiver)) {
    sendJSON(400, 'message', 'you must provide a valid receiver id');
}

validator($message, 'message', 1, 280);

try {

    $db = new Database();

    $sql = '
    INSERT INTO messages
    (body, sender_fk, receiver_fk, conversation_fk)
    VALUES
    (:body, :loggedInUser, :receiver, :conversation)';
    $data = $db->prepare($sql)->bindAndExecute(['body', $message, 'loggedInUser', $loggedInUser, 'receiver', $receiver, 'conversation', $conversationId])->rowCount();

    if (!$data) {
        sendJSON(400, 'message', 'something went wrong');
    }
    sendJSON(200, 'message', 'message was sent!');

} catch (Exception $ex) {
    echo $ex;
}