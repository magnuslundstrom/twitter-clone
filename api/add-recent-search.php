<?php

require_once __DIR__ . '/private/db.php';
require_once __DIR__ . '/helperFunctions/sendRes.php';
require_once __DIR__ . '/helperFunctions/validator.php';

session_start();
$loggedInUser = $_SESSION['user']['user_id'] ?? null;
$searchTerm = $_POST['search'] ?? null;

if (!$searchTerm) {
    sendJSON(400, 'message', 'you must provide a search term');
}

validator($searchTerm, 'search term', 1, 100);

try {
    $db = new Database();
    $sql = '
    SELECT
    *
    FROM recent_search
    WHERE user_search_fk = :loggedInUser AND search_term = :searchTerm
    LIMIT 1';
    $data = $db->prepare($sql)->bindAndExecute(['loggedInUser', $loggedInUser, 'searchTerm', $searchTerm])->getOne();
    if (!$data) {
        $sql = "
        INSERT INTO recent_search
        (user_search_fk, search_term)
        VALUES
        (:loggedInUser, :searchTerm)";
        $db->prepare($sql)->bindAndExecute(['loggedInUser', $loggedInUser, 'searchTerm', $searchTerm]);
        http_response_code(200);
        exit();
    } else {
        $sql = "
        UPDATE recent_search
        SET created_at = CURRENT_TIMESTAMP
        WHERE user_search_fk = :loggedInUser AND search_term = :searchTerm";
        $db->prepare($sql)->bindAndExecute(['loggedInUser', $loggedInUser, 'searchTerm', $searchTerm]);
        http_response_code(200);
        exit();
    }

} catch (Exception $ex) {
    sendJSON(400, 'error', $ex);
}