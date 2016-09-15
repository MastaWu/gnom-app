(function(){
    angular.module('tomorrow-app')
        .controller('toolbarCtrl', toolbarController);
    
    function toolbarController($mdDialog, $location, $rootScope, userService){
        var vm = this;
        
        vm.showLogin = showLogin;
        vm.logout = logout;
        vm.go = goToView;
            
        function showLogin() {
            $mdDialog.show({
                parent: angular.element(document.body),
                templateUrl: '/assets/views/login.html',
                controller: 'loginCtrl',
                controllerAs: 'login',
                clicksOutsideToClose: true
            });
        };
        
        function logout() {
            userService.logout();
            $rootScope.currentUserSignedIn = false;
            $location.path('/');
            console.log("User has been logged out.");
        }
        
        function goToView(path) {
            $location.path(path);
        }
    }
})();