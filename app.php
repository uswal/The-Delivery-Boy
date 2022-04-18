<?php
  // nick score
  require 'config.php';
  if(!empty($_POST)) {
      $nick = $_REQUEST['nick'];
      $score = $_REQUEST['score'];

      $conn = new mysqli($host,$username,$password,$db);
      if($conn->connect_error) die("Connection failed".$connect_error."<br>");
      $sql = "insert into leaderboard(nick,score) values('$nick','$score');";
      $conn->query($sql);

      $conn->close();
  }
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>App</title>
    <link rel="stylesheet" href="css/app.css" />
    <!-- <link
      href="https://fonts.googleapis.com/css?family=Montserrat"
      rel="stylesheet"
    /> -->
  </head>
  <body id="frame">
  </body>
  <script src="js/menu.js" type="module"></script>
  <!-- <script src="js/menu.js"></script> -->
  <script></script>
</html>
