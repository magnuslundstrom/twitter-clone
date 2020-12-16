<?php

require_once __DIR__ . '/../../private/db.php';
require_once __DIR__ . '/../vendor/autoload.php';
$faker = Faker\Factory::create();

$dbObj = new Database();

$sql = '
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE tweets;
TRUNCATE TABLE likes;
TRUNCATE TABLE comments;
SET FOREIGN_KEY_CHECKS = 1;';

$stmt = $dbObj->db->prepare($sql);
$stmt->execute();