(function(){
    navController.$inject = ['$location', '$window', '$scope', '$auth', '$state'];
    angular.module('gnom-app').controller('navCtrl', navController);
    
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
            return $auth.isAuthenticated();
        }

        function goToView(path) {
            $location.path(path);
        }
    }
})();