<?php
session_start();

$host = "localhost";
$database = "dots_php";
$username = "postgres";
$password = "3361";

$dbconn = pg_connect("host=$host port=5432 dbname=$database user=$username password=$password");

if (!$dbconn) {
    die("Could not connect");
} else {
    echo "Connection to local DB";
}



//date_default_timezone_set("Europe/Moscow");
//$x = $_GET["x"];
//$y = $_GET["y"];
//$date = date("H:i:s");
//if (!isset($_SESSION["rows"])) {
//    $_SESSION["rows"] = [];
//}
//if (isset($_GET["x"]) && isset($_GET["y"])); {
//    $executionTime = microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"];
//    array_push($_SESSION["rows"],"<tr>
//    <td>$x</td>
//    <td>$y</td>
//    <td>$date</td>
//    <td>$executionTime</td>
//    </tr>");
//    echo "<table id='output-table'>x</table>
//        <tr>
//            <th>x</th>
//            <th>y</th>
//            <th>Дата</th>
//            <th>Время выполнения скрипта</th>
//        </tr>";
//    foreach ($_SESSION["rows"] as $row) {
//        echo $row;
//    }
//    echo "</table>";
//
//}



