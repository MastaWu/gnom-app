(function(){
    loginController.$inject = ['$window', '$scope', '$location', '$rootScope', '$auth', 'userService'];
    angular.module('gnom-app')
        .controller('loginCtrl', loginController);

    function loginController($window, $scope, $location, $rootScope, $auth, userService){

        $scope.instagramLogin = function() {
            $auth.authenticate('instagram')
                .then(function(res) {
                    $window.localStorage.currentUser = JSON.stringify(res.data.user);
                    $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
                    $location.path('/');
                })
                .catch(function(res) {
                    console.log(res.data);
                });
        };

        $scope.emailLogin = function() {
            $auth.login({ email: $scope.email, password: $scope.password })
                .then(function(res) {
                    console.log(JSON.stringify(res.data));
                    $window.localStorage.currentUser = JSON.stringify(res.data.user);
                    $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
                    $location.path('/');
                })
                .catch(function(res) {
                    $scope.errorMessage = {};
                    angular.forEach(res.data.message, function(message, field) {
                        $scope.loginForm[field].$setValidity('server', false);
                        $scope.errorMessage[field] = res.data.message[field];
                    });
                });
        };
    }
})();