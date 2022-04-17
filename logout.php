<?php
    setcookie('user', '', time()-7000000, "/");  
    header('Location: ' . 'index.php');
?>