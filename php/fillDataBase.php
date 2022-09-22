<?php
$host = "localhost";
$database = "dots_php";
$username = "postgres";
$password = "3361";
$dbconn = pg_connect("host=$host port=5432 dbname=$database user=$username password=$password");



//$sql = "DELETE FROM dots *";
//pg_query($sql);


for ($i = 0;$i < 100000; $i++) {
    $sql = "INSERT INTO dots VALUES(" . rand(1,1400) . "," . rand(1,800) . ")" ;
    pg_query($sql);
}
