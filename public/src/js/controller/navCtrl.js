(function(){
    navController.$inject = ['$location', '$window', '$scope', '$auth'];
    angular.module('tomorrow-app').controller('navCtrl', navController);
    
    function navController($location, $window, $scope, $auth){

        $scope.logout = userLogout;
        $scope.go = goToView;
        $scope.isAuthenticated = isAuthenticated;
            
        function userLogout() {
            $auth.logout();
            delete $window.localStorage.currentUser;
            $location.path('/');
        }

        function isAuthenticated() {
            console.log($auth.isAuthenticated());
            return $auth.isAuthenticated();
        }

        function goToView(path) {
            $location.path(path);
        }
    }
})();