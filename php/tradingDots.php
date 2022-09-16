<?php
session_start();



$host = "localhost";
$database = "dots_php";
$username = "postgres";
$password = "3361";
$dbconn = pg_connect("host=$host port=5432 dbname=$database user=$username password=$password");


if (!$dbconn) {
    die("Could not connect");
}



if (!isset($_SESSION["dots"])) {
    $_SESSION["dots"] = [[]];
}
// фиксирую первый заход в скрипт, чтобы единожды заружать данные в массив из БД

$_SESSION['flag'] = 1;
if (empty($_SESSION["flag"])){
    echo "lox";
} else {
    $sql = "SELECT * FROM dots";
    $result = pg_query($dbconn,$sql);
    $_SESSION["dots"] = pg_fetch_all($result);
}
$_SESSION['flag'] = 1;


echo json_encode($_SESSION["dots"]);





