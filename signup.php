

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Signup</title>
    <link rel="stylesheet" href="css/index.css" />
    <!-- <link
      href="https://fonts.googleapis.com/css?family=Montserrat"
      rel="stylesheet"
    /> -->

    <script>
      var values = [
        "name must not have numbers",
        "Minimum eight characters, at least one letter and one number:",
        "sorry dont math from above password",
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

      function check3() {
        var a = document.getElementById("pass").value;
        var regx = document.getElementById("pass2").value;
        if (a == regx) {
          document.getElementById("pass2").style.background = "green";
        } else {
          document.getElementById("pass2").style.background = "red";
          document.getElementById("message").value = values[2];
        }
      }
    </script>

    <script>
      //Ujjwal's

      function resetRedBorders(nickname, pass, repass) {
        nickname.style.borderColor = "black";
        pass.style.borderColor = "black";
        repass.style.borderColor = "black";
      }
      function validate() {
        const nickname = document.getElementById("name");
        const pass = document.getElementById("pass");
        const repass = document.getElementById("pass2");
        const err = document.getElementById("err");

        resetRedBorders(nickname, pass, repass);
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
        if (pass.value !== repass.value) {
          repass.style.borderColor = "red";
          err.innerHTML = "Password didn't match!";
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
        <?php if(isset($_COOKIE['user'])) echo '<a href="logout.php" id="n5">LOGOUT</a>'; else echo '<a href="login.php" id="n5">LOGIN</a>'?>
        <!-- <a href="login.html" id="n5">LOGIN</a> -->
        <a href="app.php" id="n6" target="_blank">APP</a>
      </div>
    </nav>
    <form
      action="signup.php"
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
        >SIGNUP</label
      >
      <label>New Username:</label>
      <input
        type="text"
        placeholder="Username"
        id="name"
        onmouseout="//validate()"
        name="nick"
      />
      <label style="margin-top: 20px">Create Password:</label>
      <input
        style="margin-bottom: 20px"
        type="password"
        placeholder="Password"
        id="pass"
        onmouseout="//validate()"
        name="pass"
      />
      <label style="margin-top: 0">Re-Enter Password:</label>
      <input
        style="margin-bottom: 20px"
        type="password"
        placeholder="Re-Enter Password"
        id="pass2"
        onmouseout="//validate()"
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

    $sql = "insert into user(nick,pass) values('$nick','$pass');";
    
    if($conn->query($sql) === TRUE){
      setcookie('user', $nick, time() + (86400 * 30), "/");  
      echo "Success!";
      
    }else
      echo "Username already exist!";

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
      <label>Already registered? <a id="l" href="login.html">Login!</a></label>
      <input class="button" type="submit" value="SIGNUP" />
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
    body .container .button:disabled {
      background-color: grey;
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
