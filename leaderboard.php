<html>
<head>
    <title>App</title>
    <link rel="stylesheet" href="css/app.css" />
<head>
<body>
<?php
        require 'config.php';       
        $page = empty($_REQUEST['page']) ? 1 : $_REQUEST['page'];
        $ul = ($page * 10) + 1;
        $ll = $ul - 11;

        $conn = new mysqli($host,$username,$password,$db);

        if($conn->connect_error) die("Connection failed".$connect_error."<br>");
        
        $sql = "SELECT * FROM leaderboard ORDER BY score DESC LIMIT $ll, $ul";
        $first = '<div class="container col-flex leaderboard" style="background-color:white;padding:40px 100px;border-radius: 10px;">
        <label class="header" style="margin-bottom:40px;color:black">LEADERBOARD</label>
        <table>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th> Score</th>
          </tr>';
        
        $c = 0;
        $result = $conn->query($sql);
            $h = "";
            $pPg = $page - 1;
            $nPg = $page + 1;
            $previous = $pPg >= 1 ? "<a id='l-l' href='leaderboard.php?page=$pPg'>PREVIOUS</a>" :  "<a style='visibility:hidden'></a>";
            $next = $result->num_rows > 10 ? "<a id='l-r' href='leaderboard.php?page=$nPg'>NEXT</a>" : "";
            if ($result->num_rows > 0) {
                
                // output data of each row
                while($row = $result->fetch_assoc()) {
                    if($c==10) continue;
                    $ll++; 
                        //echo "id: " . $row["book_id"]. " - Name: " . $row["title"]. " " . $row["author_name"]. "<br>";
                    $nick = $row["nick"];
                    $score = $row["score"];
                    $h .= "<tr><td>$ll</td><td>$nick</td><td>$score</td></tr>";   
                    $c++;                
                }
                $second = "</table>
                    <div class='row-flex'>
                    $previous  $next
                    </div>
                    <button id='main-menu' onclick='mainMenu()' >BACK TO MAIN MENU</button>
                    </div>";
                echo $first . $h .  $second;
            } 
                
        $conn->close();
?>
      
    
<script>
    function mainMenu(){
        window.location.href = "app.php";
    }
</script>
<style>
    
    td,th{
        text-align:center;
    }

</style>
</body>
</html>