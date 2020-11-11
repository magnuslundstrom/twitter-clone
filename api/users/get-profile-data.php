<?php

require_once __DIR__ . '/private/db.php';
require_once __DIR__ . '/helperFunctions/sendRes.php';

session_start();
$loggedInUser = $_SESSION['user']['user_id'] ?? null;
$userId = $_GET['userId'] ?? null;

if (!ctype_digit($userId)) {
    sendJSON(400, 'error', 'invalid id');
}

try {
    $db = new Database();
    $sql = "SELECT
    u.user_id,
    CONCAT(u.firstName, ' ', u.lastName) as fullName,
    u.createdAt,
    u.followingCount,
    u.followerCount,
    CASE
    WHEN f.followee_fk IS NULL THEN 0
    ELSE 1
    END AS followStatus,
    u.tweetCount
    FROM users as u
    LEFT JOIN follows as f
    ON f.followee_fk = :loggedInUser AND follower_fk = u.user_id
    WHERE user_id = :id;";
    $user = $db->prepare($sql)->bindAndExecute(['id', $userId, 'loggedInUser', $loggedInUser])->getOne();
    $user['createdAt'] = date_format(new DateTime($user['createdAt']), "F Y");

    sendJSON(200, 'profile', $user);
} catch (Exception $ex) {
    sendJSON(400, 'error', $ex);
}