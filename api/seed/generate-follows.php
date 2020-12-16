<?php

require_once __DIR__ . '/../private/db.php';
require_once 'vendor/autoload.php';

function indexOf($arr, $val)
{
    foreach ($arr as $i) {
        if ($i === $val) {
            return true;
        }

    }
    return false;
}

$faker = Faker\Factory::create();

$dbObj = new Database();

$sql = '
INSERT INTO follows
(followee_fk, follower_fk)
VALUES
(:followee_fk, :follower_fk);';

$stmt = $dbObj->db->prepare($sql);

$stmt->bindParam(':followee_fk', $followee_fk);
$stmt->bindParam(':follower_fk', $follower_fk);

for ($i = 1; $i < 21; $i++) {
    $followee_fk = $i;
    $alrdyFound = [];
    for ($j = 1; $j < 5; $j++) {
        $follower_fk = $faker->numberBetween($min = 1, $max = 20);
        while ($followee_fk == $follower_fk || indexOf($alrdyFound, $follower_fk)) {
            $follower_fk = $faker->numberBetween($min = 1, $max = 20);
        }
        array_push($alrdyFound, $follower_fk);

        $stmt->execute();
    }
}