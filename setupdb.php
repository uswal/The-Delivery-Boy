<?php
    $servername = "localhost";
    $username = "root";
    $password = "";

    $conn = new mysqli($servername, $username, $password);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "CREATE DATABASE tdb";
    if ($conn->query($sql) === TRUE) {
        echo "Database created successfully <br>";
    } else {
        echo "Error creating database: " . $conn->error."<br>";
    }

    $conn->close();

    $db = "tdb";
    $conn = new mysqli($servername, $username, $password, $db);

    if($conn->connect_error)
        die("Connection failed: ".$conn->connect_error."<br>");
    

    $sql = "create table user(nick varchar(100) primary key, pass varchar(100),time timestamp)";

    if($conn->query($sql) === TRUE)
        echo "User table creation success"."<br>";
    else
        echo "Error creating user table"."<br>";

    $sql = "create table leaderboard(s_id varchar(100) primary key, nick varchar(100), score int(10),time timestamp, foreign key(nick) references user(nick))";

    if($conn->query($sql) === TRUE)
        echo "Leaderboard table creation success"."<br>";
    else
        echo "Error creating leaderboard table."."<br>";

    $sql = "create table feedback(id int(10) primary key auto_increment, email varchar(100), content varchar(1000), name varchar(100), contact varchar(20), time timestamp )";

    if($conn->query($sql) === TRUE)
        echo "Feedback table creation success"."<br>";
    else
        echo "Error creating feedback table"."<br>";

    $sql = "insert into user(nick,pass) values('GuestPlayer','notgonnalogin');";
    $conn->query($sql);

    $conn->close();
    
?>