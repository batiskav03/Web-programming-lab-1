<?php
session_start();
date_default_timezone_set("Europe/Moscow");


$request = $_GET["request"];
$x = $_GET["x_absolute"];
$y = $_GET["y_absolute"];
$date = date("H:i:s");
$validate = validate($x,$y);

if (!isset($_SESSION["rows"])) {
    $_SESSION["rows"] = [];
}

if ($request == "get_from_DB") {
    sendData($x,$y,$date,$validate);
} else if($request == "write_into_DB") {
    writeData($x,$y);
}


function sendData($x,$y,$date,$validate) {
    if (isset($_GET["x_absolute"]) && isset($_GET["y_absolute"])) {
        $executionTime = microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"];
        array_push($_SESSION["rows"],"<tr>
        <td>$x</td>
        <td>$y</td>
        <td>$date</td>
        <td>$validate</td>
        <td>$executionTime</td>
        </tr>");
        echo "<table id='output-table'></table>
            <tr>
                <th>x</th>
                <th>y</th>
                <th>Дата</th>
                <th>Статус</th>
                <th>Время выполнения скрипта</th>
            </tr>";
        foreach ($_SESSION["rows"] as $row) {
            echo $row;
        }
        echo "</table>";

    }
}


function writeData($x,$y) {
    $host = "localhost";
    $database = "dots_php";
    $username = "postgres";
    $password = "3361";
    $dbconn = pg_connect("host=$host port=5432 dbname=$database user=$username password=$password");
    $sql = "INSERT INTO dots VALUES(" . $x . "," . $y . ")";
    pg_query($dbconn,$sql);
    pg_close($dbconn);
}

function validate($x,$y){
    if ($y <= (sin($x/120)*20 + 600) && $y >= (sin($x/100)*50 + 200)) return "Входит в область";
    else return "Не входит в область";
}




