<?php
session_start();
$host = "localhost";
$database = "dots_php";
$username = "postgres";
$password = "3361";
$dbconn = pg_connect("host=$host port=5432 dbname=$database user=$username password=$password");
$leftLimit = $_GET["leftLimit"];
$rightLimit = $_GET["rightLimit"];
if (isset($_SESSION["ent"])){
    $_SESSION["ent"] += 1;
}
else {
    $_SESSION["ent"] = 0;
}


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
    $sql = "SELECT * FROM dots
            WHERE y <= sin(x/120)*20 + 600 AND y >= sin(x/100)*50 + 200 AND x >= $leftLimit AND x <= $rightLimit
            LIMIT 100 OFFSET " . $_SESSION["ent"] * 100;
    $result = pg_query($dbconn,$sql);
    $_SESSION["dots"] = pg_fetch_all($result);
}
$_SESSION['flag'] = 1;


echo json_encode($_SESSION["dots"]);





