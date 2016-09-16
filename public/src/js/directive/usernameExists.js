angular.module('tomorrow-app')
    .directive('usernameExists', ['$http', function($http){
        return {
            require: 'ngModel',
            link: function(scope, element, attr, ngModel){
                ngModel.$asyncValidators.usernameExists = function(username){
                    return $http.get("/user/checkUsernameExists/" + ngModel.username).then(function(res){
                        console.log("Username: " + username);
                            return res.data === true;
                        });
                };
            }
        };
    }]);