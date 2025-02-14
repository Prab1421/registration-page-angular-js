var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope, $http, $window) {
    $scope.btnName = "Login";
    $scope.showsignup = false;
    $scope.showlogin = true;
    $scope.passwordType = "password";

    $scope.togglePasswordVisibility = function() {
        $scope.passwordType = $scope.passwordType === "password" ? "text" : "password";
    };

    $scope.signuppage = function() {
        $scope.showsignup = true;
        $scope.showlogin = false;
        $scope.btnName = "Sign Up";
        if ($scope.signupform) $scope.signupform.$setPristine();
        $scope.username = null;
        $scope.password = null;
        $scope.cpassword = null;
    };

    $scope.loginpage = function() {
        $scope.showlogin = true;
        $scope.showsignup = false;
        $scope.btnName = "Login";
        if ($scope.signupform) $scope.signupform.$setPristine();
        $scope.username = null;
        $scope.password = null;
        $scope.cpassword = null;
    };

    $scope.login = function() {
        if ($scope.btnName === "Sign Up") {
            if (!$scope.username || !$scope.password || !$scope.cpassword) return;
            if ($scope.password !== $scope.cpassword) return alert("Passwords do not match");
        } else if ($scope.btnName === "Login") {
            if (!$scope.username || !$scope.password) return;
        }
        $scope.postf();
    };

    $scope.postf = function() {
        $http.post("Login.php", {
            username: $scope.username,
            password: $scope.password,
            btnName: $scope.btnName
        }).then(function(response) {
            alert(response.data);
            if (response.data === "Username already exists. Use a different username") return;
            if (response.data === "Login Successful") {
                $window.location.href = 'WebTech.html';
            } else {
                $window.location.reload();
            }
        }, function(error) {
            alert("Error occurred while processing the request.");
        });
    };
});
