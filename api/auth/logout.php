<?php
require_once __DIR__ . '/helperFunctions/sendRes.php';
session_start();
session_destroy();
sendJSON(200, 'message', 'success');