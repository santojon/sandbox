<?php
    if(!empty($_POST['text'])){
        $data = $_POST['text'];
        $fname = mktime() . ".js"; //generates random name

        $file = fopen("saved/" .$fname, 'a') or die();  //creates new file
        fwrite($file, $data);
        fclose($file);
    }
?>