(function() {
    getAllDealService.$inject = ['$http'];
    angular.module('gnom-app')
        .factory('getAllDealsService', getAllDealService);

    function getAllDealService($http) {
        return {
            getAllDeals: getAllDeals
        };

        function getAllDeals() {
            return $http.get('/api/deal/all')
                .then(getAllDealsComplete)
                .catch(getAllDealsFailed);
        }

        function getAllDealsComplete(res) {
            return res.data;
        }

        function getAllDealsFailed(err) {
            console.log("getAllDealsFailed: " + err);
        }
    }
})();