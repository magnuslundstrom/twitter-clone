<?php

require_once __DIR__ . '/../private/db.php';
require_once 'vendor/autoload.php';
$faker = Faker\Factory::create();

$dbObj = new Database();

$sql = '
INSERT INTO user_descriptions
(user_fk, description)
VALUES
(:user_id, :description);';

$stmt = $dbObj->db->prepare($sql);

$stmt->bindParam(':user_id', $user_id);
$stmt->bindParam(':description', $description);

for ($i = 1; $i < 21; $i++) {
    $user_id = $i;
    $description = $faker->text($maxNbChars = 140);

    $stmt->execute();
}