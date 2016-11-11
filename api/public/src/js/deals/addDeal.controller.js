(function() {
    addDealController.$inject = ['$scope', 'Upload', '$timeout', '$uibModalInstance', '$window'];
    angular.module('gnom-app')
        .controller('addDealCtrl', addDealController);

    function addDealController($scope, Upload, $timeout, $uibModalInstance, $window) {
        var vm = this;

        vm.dealInfo = {};
        // $scope.$watch('files', function () {
        //     $scope.upload($scope.files);
        // });
        // $scope.$watch('file', function () {
        //     if ($scope.file !== null) {
        //         $scope.files = [$scope.file];
        //     }
        // });
        $scope.log = '';
        vm.upload = function (files) {
            var currentUser = JSON.parse($window.localStorage.currentUser);
            console.log("Restaurant: " + currentUser.restaurant);
            vm.dealInfo.restaurant_name = currentUser.restaurant;

            if (files) {
                console.log(files);
                files.upload = Upload.upload({
                    url: '/api/deal/',
                    arrayKey: '',
                    data: {
                        dealInfo: vm.dealInfo,
                        files: files
                    }
                });

                files.upload.then(function (response) {
                    $timeout(function () {
                        $scope.result = response.data;
                        $uibModalInstance.close();
                    }, 3000);
                }, function (response) {
                    if (response.status > 0) {
                        $scope.errorMsg = response.status + ': ' + response.data;
                    }
                }, function (evt) {
                    // $scope.progress =
                    //     Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    $scope.progressVisible = true;
                    $scope.progress = Math.round(evt.loaded * 100 / evt.total);
                });
            }
        };

        vm.close = function() {
            $uibModalInstance.dismiss('close');
        };
    }
})();