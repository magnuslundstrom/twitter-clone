<?php

require_once __DIR__ . '/helperFunctions/sendRes.php';
require_once __DIR__ . '/helperFunctions/validator.php';
require_once __DIR__ . '/private/db.php';

session_start();
$userId = $_GET['userId'] ?? null;
$loggedInUser = $_SESSION['user']['user_id'] ?? null;

if (!$userId) {
    sendJSON(400, 'message', 'you must provide an userId');
}
if (!$loggedInUser) {
    sendJSON(400, 'message', 'you must be logged in');
}

try {
    $db = new Database();
    $sql = '
    SELECT
    CONCAT(firstName, " ", lastName) as fullName,
    followee_fk as userId,
    users.createdAt,
    users.followerCount,
    users.followingCount,
    CASE
    WHEN (SELECT COUNT(*) FROM follows WHERE follower_fk = user_id AND followee_fk = :loggedInUser) != 0 THEN "true"
    ELSE "false"
    END AS status
    FROM follows
    JOIN users
    ON user_id = followee_fk
    WHERE follower_fk = :userId
    ';

    $followers = $db->prepare($sql)->bindAndExecute(['userId', $userId, 'loggedInUser', $loggedInUser])->getAll();
    sendJSON(200, 'followers', $followers);
} catch (Exception $ex) {
    echo $ex;
}