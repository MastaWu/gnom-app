(function() {
    dashboardController.$inject = ['$uibModal', '$document'];
    angular.module('gnom-app')
        .controller('dashboardCtrl', dashboardController);

    function dashboardController($uibModal, $document) {
        var vm = this;

        // vm.animationsEnabled = true;
        //
        console.log("Dashboard Controller loaded");

        // vm.open = function(size, parentSelector) {
        //     console.log("Attempting to open modal");
        //     var parentElem = parentSelector ? angular.element($document[0].querySelector('.flexbox-parent' + parentSelector)) : undefined;
        //
        //     console.log(angular.element($document[0].querySelector('.flexbox-parent' + parentSelector)));
        //     console.log(parentSelector);
        //     console.log(parentElem);
        //     var modalInstance = $uibModal.open({
        //         animation: vm.animationsEnabled,
        //         templateUrl: 'add-deal.html',
        //         ariaLabelledBy: 'modal-title',
        //         ariaDescribedBy: 'modal-body',
        //         controller: 'addDealCtrl',
        //         controllerAs: 'addDeal',
        //         size: size,
        //         appendTo: parentElem,
        //         resolve: {
        //             items: function () {
        //                 return vm.items;
        //             }
        //         }
        //     });
        // };
    }
})();