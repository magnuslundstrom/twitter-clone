<?php
session_start();

header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/helperFunctions/sendRes.php';

if (!isset($_SESSION['user'])) {
    SendJSONError(401, '0');

}

sendJSON(200, 'user', $_SESSION['user']);