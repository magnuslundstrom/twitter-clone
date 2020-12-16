<?php

require_once __DIR__ . '/../private/db.php';
require_once 'vendor/autoload.php';
$faker = Faker\Factory::create();

$dbObj = new Database();

$sql = '
INSERT INTO users
(first_name,last_name, email, password)
VALUES
(:firstName, :lastName, :email, :password);';

$stmt = $dbObj->db->prepare($sql);

$stmt->bindParam(':firstName', $firstName);
$stmt->bindParam(':lastName', $lastName);
$stmt->bindParam(':email', $email);
$stmt->bindValue(':password', password_hash('12345', PASSWORD_DEFAULT));

for ($i = 0; $i < 20; $i++) {
    $firstName = $faker->firstName;
    $lastName = $faker->lastName;
    $email = $faker->email;

    if ($i === 0) {
        $email = 'lswift@gmail.com';
    }

    $stmt->execute();
}