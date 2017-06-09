<?php

require "connect.db";

//CREATE QUERY TO DB AND PUT RECEIVED DATA INTO ASSOCIATIVE ARRAY
if (isset($_REQUEST['query'])) {
    $query = $_REQUEST['query'];
    $sql = mysql_query ("SELECT branchName FROM branches WHERE branchName LIKE '%{$query}%' ");
	$array = array();
    while ($row = mysql_fetch_array($sql)) {
        $array[] = array (
            'label' => $row['branchName'],
            'value' => $row['branchName'],
        );
    }
    //RETURN JSON ARRAY
    echo json_encode ($array);
}

?>
