(function(){
    'use strict';

    angular.module('tomorrow-app')
        .controller('loginCtrl', loginController);

    function loginController($mdDialog, $location, userService){
        var vm = this;
        
        vm.cancel = cancel;
        vm.login = login;
        
        initController();
        
        function initController() {
            userService.logout();
        };
        
        function login() {
            vm.loading = true;
            
            userService.login(vm.username, vm.password, function(result){
                if(result === true) {
                    $location.path('/about');
                    $mdDialog.hide();
                } else {
                    vm.error = 'Username or password is incorrect';
                    vm.loading = false;
                }
            });
        };
        
        function cancel() {
            $mdDialog.hide();
        };
    }
})();