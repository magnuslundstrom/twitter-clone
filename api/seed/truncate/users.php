<?php

require_once __DIR__ . '/../../private/db.php';
require_once __DIR__ . '/../vendor/autoload.php';
$faker = Faker\Factory::create();

$dbObj = new Database();

$sql = '
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE users;
TRUNCATE TABLE user_descriptions;
TRUNCATE TABLE recent_search;
TRUNCATE TABLE follows;
TRUNCATE TABLE users_in_conversations;
TRUNCATE TABLE messages;
TRUNCATE TABLE conversations;
SET FOREIGN_KEY_CHECKS = 1;';

$stmt = $dbObj->db->prepare($sql);
$stmt->execute();