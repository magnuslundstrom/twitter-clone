<?php
require_once __DIR__ . '/helperFunctions/sendRes.php';
require_once __DIR__ . '/helperFunctions/validator.php';
require_once __DIR__ . '/private/db.php';

session_start();

$search = $_POST['search'] ?? '';
validator($search, 'search', 1, 140);

try {
    $db = new Database();
    $sql = '
    SELECT
    u.user_id,
    CONCAT(firstName, " ", lastName) as fullName
    FROM users as u
    WHERE CONCAT(firstName, " ", lastName)
    LIKE :search';
    $data = $db->prepare($sql)->bindAndExecute(['search', "$search%"])->getAll();

    if (!$data) {
        sendJSON(400, 'message', 'something went wrong');
    }

    sendJSON(200, 'search', $data);

} catch (Exception $ex) {
    echo $ex;
}