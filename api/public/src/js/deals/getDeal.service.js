(function() {
    getDealService.$inject = ['$http'];
    angular.module('gnom-app')
        .factory('getDealService', getDealService);

    function getDealService($http) {
        return {
            getDeal : getDeal
        };

        function getDeal(productId) {
            console.log("getDealService: " + productId);
            return $http.get('/api/deal/' + productId)
                .then(getDealComplete)
                .catch(getDealFailed);
        }

        function getDealComplete(res) {
            console.log("getDealComplete: ");
            console.log(res.data);
            return res.data;
        }

        function getDealFailed(err) {
            console.log("getDealFailed: " + err);
        }
    }
})();