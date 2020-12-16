<?php

require_once __DIR__ . '/../private/db.php';
require_once 'vendor/autoload.php';

$faker = Faker\Factory::create();

$dbObj = new Database();

$sql = '
INSERT INTO comments
(tweet_fk, user_fk, comment_body)
VALUES
(:tweetId, :userId, :commentBody);';

$stmt = $dbObj->db->prepare($sql);

$stmt->bindParam(':tweetId', $tweetId);
$stmt->bindParam(':userId', $userId);
$stmt->bindParam(':commentBody', $commentBody);

for ($i = 1; $i < 21; $i++) {
    $randomAmountOfComments = $faker->numberBetween($min = 1, $max = 12);
    $userId = $i;

    for ($j = 0; $j < $randomAmountOfComments; $j++) {

        $commentBody = $faker->text($maxNbChars = 140);

        $tweetId = $faker->numberBetween(1, 60);

        $stmt->execute();
    }
}