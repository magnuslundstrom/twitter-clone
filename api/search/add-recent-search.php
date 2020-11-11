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
    $sql = "
    INSERT INTO recent_search
    (user_search_fk, search_term)
    VALUES
    (:loggedInUser, :search)";
    $db->prepare($sql)->bindAndExecute(['loggedInUser', $loggedInUser, 'search', $searchTerm]);

    http_response_code(200);
} catch (Exception $ex) {
    sendJSON(400, 'error', $ex);
}