<?php

require_once __DIR__ . '/private/db.php';
require_once __DIR__ . '/helperFunctions/sendRes.php';

session_start();

$loggedInUserId = $_SESSION['user']['user_id'] ?? null;
$userId = $_GET['userId'] ?? null;

if (!$loggedInUserId) {
    sendJSON(400, 'error', 'you must authenticated');
}

if (!ctype_digit($userId)) {
    sendJSON(400, 'error', 'invalid id');
}

try {
    $db = new Database();
    $sql = "SELECT
    u.user_id,
     CASE
 		WHEN l.tweet_fk IS NULL THEN 0
 		ELSE 1
     END AS likedStatus,
    CONCAT(u.firstName, ' ', u.lastName) as fullName,
    t.tweet_id,
    t.body,
    t.createdAt,
    num_likes as numLikes,
    num_comments as numComments
    FROM tweets as t
    JOIN users as u
    ON u.user_id = t.user_fk
    LEFT JOIN likes as l
    ON l.user_fk = :loggedInUserId AND l.tweet_fk = tweet_id
    WHERE u.user_id = :userId
    ORDER BY t.createdAt DESC"
    ;

    $data = $db->prepare($sql)->bindAndExecute(['userId', $userId, 'loggedInUserId', $loggedInUserId])->getAll();
    sendJSON(200, 'tweets', $data);
} catch (Exception $ex) {
    sendJSON(400, 'error', $ex);
}