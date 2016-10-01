(function() {
    getAllDealsController.$inject = ['getAllDealsService', '$state'];
    angular.module('gnom-app')
        .controller('getAllDealsCtrl', getAllDealsController);

    function getAllDealsController(getAllDealsService, $state) {
        var vm = this;
        vm.allDeals = [];
        vm.$state = $state;

        activate();

        function activate() {
            return getAllDeals().then(function() {
                console.log("Deals have been activated!");
            });
        }

        function getAllDeals() {
            return getAllDealsService.getAllDeals()
                .then(getAllDataResponse);
        }

        function getAllDataResponse(data) {
            vm.allDeals = data;
            return vm.allDeals;
        }
    }
})();