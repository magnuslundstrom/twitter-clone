<?php
header("Access-Control-Allow-Origin: *");
require_once __DIR__ . '/helperFunctions/sendRes.php';
require_once __DIR__ . '/helperFunctions/validator.php';
require_once __DIR__ . '/private/db.php';

$firstName = $_POST['firstName'] ?? null;
$lastName = $_POST['lastName'] ?? null;
$password = $_POST['password'] ?? null;
$email = $_POST['email'] ?? null;

validator($firstName, 'firstName', 2, 20);
validator($lastName, 'lastName', 2, 20);
validator($password, 'password', 2, 20);
validator($email, 'email');

try {
    $connection = new Database();
    $sql = 'INSERT INTO USERS (firstName, lastName, password, email) VALUES(:firstName, :lastName, :password, :email)';
    $binds = [
        'firstName', $firstName,
        'lastName', $lastName,
        'password', password_hash($password, PASSWORD_DEFAULT),
        'email', $email,
    ];

    $connection->prepare($sql)->bindAndExecute($binds);
    $id = $connection->getLastId();

    $user = [
        "id" => $id,
        "firstName" => $firstName,
        "lastName" => $lastName,
        "email" => $email,
    ];

    session_start();
    $_SESSION['id'] = $id;
    http_response_code(200);

} catch (Exception $ex) {
    echo $ex;
    exit();
    sendJSONError(400, 'error on line' . __LINE__);
}