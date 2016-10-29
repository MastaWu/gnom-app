(function() {
    angular.module('gnom-app')
        .controller('dashboardCtrl', dashboardController);

    function dashboardController() {
        var vm = this;

        vm.animationsEnabled = true;

        vm.open = function(size, parentSelector) {
            var parentElem = parentSelector ? angular.element($document[0].querySelectro('.flexbox-parent')) : undefined;
            var modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'add-deal.html',
                controller: 'addDealCtrl',
                controllerAs: 'addDeal',
                size: size,
                appendTo: parentElem,
                resolve: {
                    items: function () {
                        return $ctrl.items;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                vm.selected = selectedItem;
            }, function() {
                console.log('Modal dismissed at: ' + new Date());
            });
        };
    }
})();