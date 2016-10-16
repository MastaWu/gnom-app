(function() {
    detailedDealController.$inject = ['getDealService', '$stateParams'];
    angular.module('gnom-app')
        .controller('detailedDealCtrl', detailedDealController);

    function detailedDealController(getDealService, $stateParams) {
        var vm = this;
        vm.detailedDeal = [];

        activate();

        function activate() {
            return getDeal().then(function() {
            });
        }

        function getDeal() {
            return getDealService.getDeal($stateParams.id)
                .then(getAllDataResponse);
        }

        function getAllDataResponse(data) {
            vm.detailedDeal = data;
            return vm.detailedDeal;
        }
    }
})();
