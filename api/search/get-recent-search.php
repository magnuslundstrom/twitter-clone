<?php

require_once __DIR__ . '/private/db.php';
require_once __DIR__ . '/helperFunctions/sendRes.php';

session_start();
$loggedInUser = $_SESSION['user']['user_id'] ?? null;

try {
    $db = new Database();
    $sql = "
    SELECT
    search_term
    FROM
    recent_search
    WHERE user_search_fk = :loggedInUser
    GROUP BY search_term
    ORDER BY createdAt DESC
    LIMIT 5
    ";
    $data = $db->prepare($sql)->bindAndExecute(['loggedInUser', $loggedInUser])->getAll();

    sendJSON(200, 'recent', $data);
} catch (Exception $ex) {
    sendJSON(400, 'error', $ex);
}