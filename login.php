<?php

$conn = mysqli_connect("localhost", "root","1234", "registration_angularjs");
$array = json_decode(file_get_contents("php://input"));
if($array) {
    $username = mysqli_real_escape_string($conn,$array->username);
    $password = mysqli_real_escape_string($conn,$array->password);
    $btnName = $array->btnName;
    $adminuser="admin";
    $adminpass="administrator";
    if($btnName == 'Login') {
        $query = "select user, password from signup";
        $result = mysqli_query($conn,$query);
        if($username==$adminuser && $password==$adminpass) {
            echo "Login Successful";
        }
        while($r = mysqli_fetch_array($result)) {
            $user=$r['user'];
            $pass=$r['password'];
            if($username==$user && $password==$password) {
                echo "Login Successful";
                exit();
            }
        }
        if($username!=$adminuser || $password!=$adminpass) {
            echo "Incorrect Credentials";
        }
    }
    if($btnName == "Sign Up") {
        $query2 = "insert into signup(user, password) values ('$username', '$password')";
        if(mysqli_query($conn,$query2)) {
            echo "Congratulations, your account has been successfully created.";
        } else {
            echo "Username already exists. Use a different username";
        }
    }
}

?>
