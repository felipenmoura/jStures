<?php
    header("Content-type: application/JavaScript");
    $d = dir("./");
    while (false !== ($entry = $d->read())) {
        if(substr($entry, 0, 1) != '.' && $entry != 'jstures.js')
            echo file_get_contents($entry)."\n\n";
    }
    $d->close();