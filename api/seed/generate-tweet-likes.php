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
INSERT INTO likes
(tweet_fk, user_fk)
VALUES
(:tweetId, :userId);';

$stmt = $dbObj->db->prepare($sql);

$stmt->bindParam(':tweetId', $tweet_fk);
$stmt->bindParam(':userId', $user_fk);

for ($i = 1; $i < 21; $i++) {
    $user_fk = $i;
    $alrdyFound = [];
    for ($j = 1; $j < 3; $j++) {
        $tweet_fk = $faker->numberBetween($min = 1, $max = 60);
        while (indexOf($alrdyFound, $tweet_fk)) {
            $tweet_fk = $faker->numberBetween($min = 1, $max = 60);
        }
        array_push($alrdyFound, $tweet_fk);

        $stmt->execute();
    }
}