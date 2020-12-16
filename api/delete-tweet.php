<?php

require_once __DIR__ . '/private/db.php';
require_once __DIR__ . '/helperFunctions/sendRes.php';

session_start();
$loggedInUser = $_SESSION['user']['user_id'] ?? null;
$tweetId = $_GET['tweetId'] ?? null;

if (!$loggedInUser) {
    sendJSONError(400, 'you must be authenticated');
}
if (!$tweetId) {
    sendJSONError(400, 'you must provide a tweet id');
}

try {

    $sql = '
DELETE FROM tweets
WHERE tweet_id = :tweetId
';

    $db = new Database();

    $data = $db->prepare($sql)->bindAndExecute(['tweetId', $tweetId])->rowCount();

    if (!$data) {
        sendJSONError(400, 'no tweet with the provided id');
    }

} catch (Exception $ex) {
    sendJSONError(400, 'something went wrong');
}