<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Feedback form</title>
    <link rel="stylesheet" href="css/temp3.css" />
    <link rel="stylesheet" href="css/index.css" />

    <script>
      
      function check1()
      {
        var a=document.getElementById("name").value;
        var regx=/^([a-z]+) ([a-z]+?)$/i;
        if(regx.test(a))
        {
            document.getElementById("name").style.background="green";
        }
        else
        {
          document.getElementById("name").style.background="red";
        }
      }


      function check2()
      {
        var a=document.getElementById("number").value;
        var regx=/^[6-9]\d{9}$/;
        if(regx.test(a))
        {
            document.getElementById("number").style.background="green";
        }
        else
        {
          document.getElementById("number").style.background="red";
        }
      }

      function check3()
      {
        var a=document.getElementById("email").value;
        var regx=/\S+@\S+\.\S+/
        if(regx.test(a))
        {
            document.getElementById("email").style.background="green";
        }
        else
        {
          document.getElementById("email").style.background="red";
        }
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



<div class="background">
  <div class="container">
    <div class="screen">
      <div class="screen-header">

      <div class="screen-body">
        <div class="screen-body-item left">
          <div class="app-title">
            <span>CONTACT</span>
            <span>US</span>
          </div>
          <div class="app-contact"> Write to us at webprojectdelivery@protonmail.com</div>
        </div>
        <form action="">
        <div class="screen-body-item">
          <div class="app-form">
            <div class="app-form-group">
              <input type="text"  placeholder="NAME" id="name" onmouseout="check1()">
            </div>
            <div class="app-form-group">
              <input type="text" placeholder="EMAIL" id="email" onmouseout="check3()">
            </div>
            <div class="app-form-group">
              <input type="text" placeholder="CONTACT NO" id="number" onmouseout="check2()">
            </div>
            <label for="name" style="visibility: hidden;" id="lable">wrong input </label>
            <div class="app-form-group message">
              <input type="text" placeholder="SUGGESTIONS" id="suggestion">
            </div>
            <div class="app-form-group buttons">
              <button class="app-form-button">CANCEL</button>
              <input type="submit" value="submit">
            </div>
          </form>
          </div>
        </div>
      </div>
    
      </a>
    </div>
    </div>
  </div>
</div>
</body>
<style>
	*, *:before, *:after {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background: linear-gradient(to right, #fffcdc 1000%, #eb466b 0%);
  font-size: 12px;
}

body, button, input {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  letter-spacing: 1.4px;
}

.background {
  display: flex;
  min-height: 100vh;
}

.container {
  flex: 0 1 700px;
  margin: auto;
  padding: 10px;
}

.screen {
  position: relative;
  background: #acacac;
  border-radius: 15px;
}

.screen:after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 20px;
  right: 20px;
  bottom: 0;
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, .4);
  z-index: -1;
}

.screen-header {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background: #4d4d4f;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.screen-header-left {
  margin-right: auto;
}

.screen-header-button {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 3px;
  border-radius: 8px;
  background: white;
}

.screen-header-button.close {
  background: #ed1c6f;
}

.screen-header-button.maximize {
  background: #e8e925;
}

.screen-header-button.minimize {
  background: #74c54f;
}

.screen-header-right {
  display: flex;
}

.screen-header-ellipsis {
  width: 3px;
  height: 3px;
  margin-left: 2px;
  border-radius: 8px;
  background: #999;
}

.screen-body {
  display: flex;
}

.screen-body-item {
  flex: 1;
  padding: 50px;
}

.screen-body-item.left {
  display: flex;
  flex-direction: column;
}

.app-title {
  display: flex;
  flex-direction: column;
  position: relative;
  color: #fffcdc;
  font-size: 26px;
}

.app-title:after {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 25px;
  height: 4px;
  background: #fffcdc;
}

.app-contact {
  margin-top: auto;
  font-size: 14px;
  color: #fffcdc;
}

.app-form-group {
  margin-bottom: 15px;
}

.app-form-group.message {
  margin-top: 40px;
}

.app-form-group.buttons {
  margin-bottom: 0;
  text-align: right;
}

.app-form-control {
  width: 100%;
  padding: 10px 0;
  background: none;
  border: none;
  border-bottom: 1px solid #666;
  color: #ddd;
  font-size: 14px;
  text-transform: uppercase;
  outline: none;
  transition: border-color .2s;
}

.app-form-control::placeholder {
  color: #666;
}

.app-form-control:focus {
  border-bottom-color: #ddd;
}

.app-form-button {
  background: none;
  border: none;
  color: #fffcdc;
  font-size: 14px;
  cursor: pointer;
  outline: none;
}

.app-form-button:hover {
  color: #b9134f;
}







/*@media screen and (max-width: 520px) {
  .screen-body {
    flex-direction: column;
  }
  .screen-body-item.left {
    margin-bottom: 30px;
  }
  .app-title {
    flex-direction: row;
  }
  .app-title span {
    margin-right: 12px;
  }
  .app-title:after {
    display: none;
  }
}
@media screen and (max-width: 600px) {
  .screen-body {
    padding: 40px;
  }
  .screen-body-item {
    padding: 0;
  }
} */
</style>
</html>