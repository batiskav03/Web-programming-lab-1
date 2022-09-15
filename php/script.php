<?php
session_start();



date_default_timezone_set("Europe/Moscow");
$x = $_GET["x"];
$y = $_GET["y"];
$date = date("H:i:s");
if (!isset($_SESSION["rows"])) {
    $_SESSION["rows"] = [];
}
if (isset($_GET["x"]) && isset($_GET["y"])); {
    $executionTime = microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"];
    array_push($_SESSION["rows"],"<tr>
    <td>$x</td>
    <td>$y</td>
    <td>$date</td>
    <td>$executionTime</td>
    </tr>");
    echo "<table id='output-table'>x</table>
        <tr>
            <th>x</th>
            <th>y</th>
            <th>Дата</th>
            <th>Время выполнения скрипта</th>
        </tr>";
    foreach ($_SESSION["rows"] as $row) {
        echo $row;
    }
    echo "</table>";

}



