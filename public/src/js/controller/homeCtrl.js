(function(){
        homeController.$inject = ['$window', '$scope', '$rootScope', '$auth'];
     angular.module('tomorrow-app')
         .controller('homeCtrl', homeController);
        
        function homeController($window, $scope, $rootScope, $auth) {
            var vm = $scope;
            this.isAuthenticated = function() {
                return $auth.isAuthenticated();
            };

            this.linkInstagram = function() {
                $auth.link('instagram')
                    .then(function(res) {
                        $window.localStorage.currentUser = JSON.stringify(res.data.user);
                        $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
                    });
            };
        }
})();