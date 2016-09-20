(function(){
    signupCtrl.$inject = ['$scope', '$auth'];
    angular.module('tomorrow-app')
        .controller('signupCtrl', signupCtrl);

    function signupCtrl($scope, $auth) {
        var vm = $scope;

        $scope.signup = function() {
            var user = {
                email: vm.email,
                password: vm.password
            };

            $auth.signup(user)
                .catch(function(res) {
                    console.log(res.data);
                });
        };
    }
})();