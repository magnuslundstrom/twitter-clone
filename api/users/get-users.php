<?php

require_once __DIR__ . '/private/db.php';
require_once __DIR__ . '/helperFunctions/sendRes.php';
session_start();

$user = $_SESSION['user'];

try {
    $db = new Database();
    $sql = "
    SELECT
users.createdAt,
user_id,
CONCAT(firstName, ' ', lastName) as fullName,
followerCount,
followingCount,
CASE
WHEN (SELECT count(*)
FROM follows
WHERE follows.followee_fk = 2 AND users.user_id = follows.follower_fk) = 0 THEN 'false'
ELSE 'true'
END AS status
FROM users
WHERE user_id != 2
GROUP BY user_id
LIMIT 10;
    ";
    $data = $db->prepare($sql)->bindAndExecute(['id', $user['user_id']])->getAll();
    sendJSON(200, 'users', $data);
} catch (Exception $ex) {
    sendJSON(400, 'error', $ex);
}