<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login</title>
    <link rel="stylesheet" href="css/index.css" />
    <!-- <link
      href="https://fonts.googleapis.com/css?family=Montserrat"
      rel="stylesheet"
    /> -->

    <script>
      var values = [
        "name must not have numbers",
        "Minimum eight characters, at least one letter and one number:",
      ];

      function check1() {
        var a = document.getElementById("name").value;
        var regx = /^([a-z]+) ([a-z]+?)$/i;
        if (regx.test(a)) {
          document.getElementById("name").style.background = "green";
        } else {
          document.getElementById("name").style.background = "red";
          document.getElementById("message").value = values[0];
        }
      }

      function check2() {
        var a = document.getElementById("pass").value;
        var regx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (regx.test(a)) {
          document.getElementById("pass").style.background = "green";
        } else {
          document.getElementById("pass").style.background = "red";
          document.getElementById("message").value = values[1];
        }
      }
    </script>

    <script>
      //ujjwal's
      function resetRedBorders(nickname, pass) {
        nickname.style.borderColor = "black";
        pass.style.borderColor = "black";
      }
      function validate() {
        const nickname = document.getElementById("name");
        const pass = document.getElementById("pass");

        const err = document.getElementById("err");

        resetRedBorders(nickname, pass);
        if (!/^\w+$/.test(nickname.value)) {
          err.innerHTML =
            "Nickname may only contain underscore, letters and numbers.";
          nickname.style.borderColor = "red";

          return false;
        }
        if (pass.value.length < 6) {
          pass.style.borderColor = "red";
          err.innerHTML = "Password should be greater than 6 characters.";
          return false;
        }
        if (pass.value.length > 18) {
          pass.style.borderColor = "red";
          err.innerHTML = "Password should be smaller than 18 characters.";
          return false;
        }

        err.innerHTML = "";
      }
    </script>
  </head>
  <body>
  

    <nav>
      <div class="ctr">
        <a href="index.php" id="n1">HOME</a>
        <a href="basics.php" id="n2">BASICS</a>
        <a href="about.php" id="n3">ABOUT</a>
        <a href="feedback.php" id="n4">FEEDBACK</a>
        <a href="signup.php" id="n5">SIGNUP</a>
        <a href="app.php" id="n6" target="_blank">APP</a>
      </div>
    </nav>


    <form
      action="login.php"
      method="post"
      class="container col-flex"
      id="container"
      onsubmit="return validate()"
    >
      <label
        style="
          padding: 12px 0;
          border-top: 1px solid #516beb;
          border-bottom: 1px solid #516beb;
          margin-bottom: 10px;
          font-size: 24px;
          font-weight: 800;
          border-radius: 10px;
        "
        >THE DELIVERY BOY</label
      >
      <label
        style="
          color: #516beb;
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 20px;
        "
        >LOGIN</label
      >
      <label>Enter Username:</label>
      <input
        type="text"
        placeholder="Username"
        id="name"
        onmouseout="//check1()"
        name = "nick"
      />
      <label style="margin-top: 20px">Enter Password:</label>
      <input
        style="margin-bottom: 20px"
        type="password"
        placeholder="Password"
        id="pass"
        onmouseout="//check2()"
        name = "pass" 
      />
      <label id="err" style="color: red">
<?php
  
  require 'config.php';
  if(!empty($_POST)) {
    $nick = $_REQUEST['nick'];
    $pass = $_REQUEST['pass'];
    $pass = hash('sha256', $pass);
    $conn = new mysqli($host,$username,$password,$db);

    if($conn->connect_error) die("Connection failed".$connect_error."<br>");

    $sql = "SELECT * FROM user WHERE nick = '$nick';";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      
      //echo $row['nick'];
      if($row['pass'] == $pass) {
      setcookie('user', $row['nick'], time() + (86400 * 30), "/");  
      echo "Success!";
      } else {
        echo "Incorrect password!";
      }
      
    } else {
      echo "Username not found! Please signup!";
    }

    $conn->close();
    
  }

?>
    
    </label>
<script>
  err = document.getElementById("err");
  if(err.innerHTML.trim() === "Success!") {
    window.location.href = "app.php";
  }
</script>
      <label>New? <a href="signup.html">Create an account!</a></label>
      <!-- <button>LOGIN</button> -->
      <input class="button" type="submit" value="LOGIN" />
    </form>

    <!-- <div style="float: right">
      <textarea name="text" id="message" cols="30" rows="10"></textarea>
    </div> -->
  </body>
  <style>
    * {
      transition-duration: 0.4s;
    }
    body {
      background-color: #fffcdc;
    }
    body .container {
      width: 20%;
      padding: 60px;
      background-color: white;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: Center;
      border: 1px solid white;
      border-radius: 4px;
    }
    body .container:hover {
      border: 1px solid #516beb;
    }
    body label {
      margin-top: 10px;
    }
    body .container input {
      padding: 8px 16px;
      outline: none;
      margin-top: 10px;
      border: 1px solid black;
      transition-duration: 0.4s;
    }
    body .container input:focus {
      border-color: #516beb;
    }
    body .container input:focus #container {
      border: 1px solid black;
    }
    body .container input:focus {
      border-color: #516beb;
    }
    body .container .button {
      margin-top: 20px;
      padding: 8px 0;
      outline: none;
      border: none;
      background-color: #516beb;
      font-weight: 800;
      color: White;
      font-size: 18px;
      transition-duration: 0.4s;
    }
    body .container .button:hover {
      background-color: green;
    }
    body .container a {
      text-decoration: none;
      color: #516beb;
    }
    body .container a:hover {
      color: green;
    }
  </style>
</html>
