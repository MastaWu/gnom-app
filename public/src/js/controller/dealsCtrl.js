(function() {
    getAllDealsController.$inject = ['getAllDealsService'];
    angular.module('tomorrow-app')
        .controller('getAllDealsCtrl', getAllDealsController);

    function getAllDealsController(getAllDealsService) {
        var vm = this;
        vm.allDeals = [];

        activate();

        function activate() {
            return getAllDeals().then(function() {
                console.log('Activated get all deals');
            });
        }

        function getAllDeals() {
            return getAllDealsService.getAllDeals()
                .then(getAllDataResponse);
        }

        function getAllDataResponse(data) {
            vm.allDeals = data;
            console.log(vm.allDeals);
            console.log(vm.allDeals[0].deal_name);
            return vm.allDeals;
        }
    }
})();