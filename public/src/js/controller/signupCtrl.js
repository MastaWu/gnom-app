(function(){
    signupCtrl.$inject = ['$scope', '$location', '$http', '$window', '$rootScope'];
    angular.module('tomorrow-app')
        .controller('signupCtrl', signupCtrl);

    function signupCtrl($scope, $location, $http, $window, $rootScope) {

        $scope.localSignup = function() {
            console.log("Signing up!");
            var req = {
                method: 'POST',
                url: '/api/auth/signup',
                data: {
                    email: $scope.email,
                    password: $scope.password
                }
            };

            $http(req)
                .then(function(res) {
                    $window.localStorage.currentUser = JSON.stringify(res.data.user);
                    $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
                    $location.path('/');
                }, function(response) {
                    console.log(response.data);
                    }
                );
        };
    }
})();