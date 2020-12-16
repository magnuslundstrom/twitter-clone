<?php

require_once __DIR__ . '/../private/db.php';
require_once 'vendor/autoload.php';
$faker = Faker\Factory::create();

$dbObj = new Database();

$sql = '
INSERT INTO tweets
(body, user_fk)
VALUES
(:body, :user_fk);';

$stmt = $dbObj->db->prepare($sql);

$stmt->bindParam(':body', $body);
$stmt->bindParam(':user_fk', $userId);

for ($i = 0; $i < 100; $i++) {
    $userId = 36;
    $body = $faker->text($maxNbChars = 140);

    $stmt->execute();
}