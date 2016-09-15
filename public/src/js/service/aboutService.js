(function(){
    angular.module('tomorrow-app')
        .service('aboutService', aboutService);

    function aboutService($http) {

        this.checkRole = function checkRole() {
            var response = {};
            response.id = 1;
            response.content = "This is a test";

            return $http.get('/api/role').then(function(res){
                response.role = res.data;
                return response;
            });
        }
    }
})();