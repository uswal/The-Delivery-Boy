<?php

//feedback_page
/*
$name=$_REQUEST['name'];
$email=$_REQUEST['email'];
$number=$_REQUEST['number'];
$sugg=$_REQUEST['sug'];

$conn=mysqli_connect("localhost","root","","tdb"); //enter your server name

$sql="INSERT INTO feedback(email ,content,name , contact  ) VALUES ('$email',$sugg,'$name',$number)";

$result=mysqli_query($conn,$sql) or die("error");

mysqli_close($conn);

*/
?>

<?php
  require 'config.php';
  if(!empty($_POST)) {
    $name=$_REQUEST['name'];
    $email=$_REQUEST['email'];
    $number=$_REQUEST['number'];
    $sugg=$_REQUEST['sug'];;
    $conn = new mysqli($host,$username,$password,$db);
    if($conn->connect_error) die("Connection failed".$connect_error."<br>");
    $sql = "INSERT INTO feedback(email,content,name,contact) VALUES ('$email','$sugg','$name','$number')";
    if($conn->query($sql) === TRUE){
      echo "Success!";                
    }else
      echo "Failed!".$conn->error;

    $conn->close();
  }else{
      echo "Data not received.";
  }
?>