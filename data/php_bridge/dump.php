<?php
    if(!empty($_POST['text'])){
        $data = $_POST['text'];
        $fname = "database.json";
        $file = fopen("../" .$fname, 'w') or die();  //creates new file
        fwrite($file, $data);
        fclose($file);
    }
?>