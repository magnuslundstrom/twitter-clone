<?php

require_once __DIR__ . '/helperFunctions/sendRes.php';
require_once __DIR__ . '/helperFunctions/validator.php';
require_once __DIR__ . '/private/db.php';

session_start();
$userId = $_SESSION['user']['user_id'] ?? null;

try {
    $db = new Database();
    $sql = '
        SELECT
        t.createdAt,
        t.tweet_id,
        u.user_id,
        t.body,
        t.num_likes as numLikes,
        t.num_comments as numComments,
        CONCAT(u.firstName, " ", u.lastName) AS fullName,
        CASE
        WHEN l.tweet_fk IS NULL THEN 0
        ELSE 1
        END AS likedStatus
        FROM follows AS f
        JOIN tweets AS t
        ON t.user_fk = f.follower_fk
        JOIN users AS u
        ON u.user_id = f.follower_fk
        LEFT JOIN likes as l
        ON l.user_fk = :id AND l.tweet_fk = t.tweet_id
        WHERE f.followee_fk = :id
    ';

    $tweets = $db->prepare($sql)->bindAndExecute(['id', $userId])->getAll();

    foreach ($tweets as &$tweet) {
        $tweet['createdAt'] = date_format(new DateTime($tweet['createdAt']), "g:i A - M d, Y");
    }

    sendJSON(200, 'tweets', $tweets);

} catch (Exception $ex) {

}