angular.module('starter.controllers')
    .controller('DeliverymanViewOrderCtrl',[
        '$scope','$state','$stateParams','DeliverymanOrder','$ionicLoading','$cordovaGeolocation','$ionicPopup','$cart',
        function ($scope,$state, $stateParams, DeliverymanOrder,$ionicLoading,$cordovaGeolocation,$ionicPopup,$cart) {
        var watch;
        $scope.order = [];
        $scope.equipe = [];
        $ionicLoading.show({
           template: 'Carregando...'
        });
        DeliverymanOrder.get({id:$stateParams.id},function (data) {

            $scope.order = data.data;
            $ionicLoading.hide();
        },function (dataError) {
            $ionicLoading.hide();
        });
        $scope.goToOrder = function () {
            $ionicPopup.confirm({
                title: 'Atenção',
                template: 'Cliente não se encontra?'
            }).then(function(res) {
                if(res) {
                    var posOptions = {timeout: 30000, enableHighAccuracy: false, maximumAge: 0};

                    $cordovaGeolocation
                        .getCurrentPosition(posOptions)
                        .then(function (position) {
                            var lat = position.coords.latitude;
                            var long = position.coords.longitude;

                            console.log(lat,long);

                            DeliverymanOrder.updateStatus({id: $stateParams.id}, {
                                status: 0,
                                lat: lat,
                                long: long
                            },function (data) {
                                $scope.order = data;
                                $scope.equipe = $cart.getAux();
                                console.log($scope.equipe.name);
                                $ionicLoading.hide();
                                $state.go('deliveryman.order');
                            });
                        }, function(err) {
                            // error
                            $ionicLoading.hide();
                        });
                } else {
                    $ionicLoading.hide();
                }
            });
        };

        $scope.goToDelivery = function () {

            $ionicPopup.confirm({
                title: 'Atenção',
                template: 'Deseja iniciar esta Ordem?'
            }).then(function(res) {
                if(res) {
                    var posOptions = {timeout: 30000, enableHighAccuracy: false, maximumAge: 0};

                    $cordovaGeolocation
                        .getCurrentPosition(posOptions)
                        .then(function (position) {
                            var lat = position.coords.latitude;
                            var long = position.coords.longitude;

                            console.log(lat,long);

                            DeliverymanOrder.updateStatus({id: $stateParams.id}, {
                                status: 1,
                                lat: lat,
                                long: long
                            },function (data) {
                                $scope.order = data;
                                $scope.equipe = $cart.getAux();
                                console.log(data);
                                $ionicLoading.hide();
                                $state.go('deliveryman.view_close', {id: $scope.order.id});
                            });
                        }, function(err) {
                            // error
                            $ionicLoading.hide();
                        });
                } else {
                    $ionicLoading.hide();
                }
            });
        };
        
        function stopWatchPosition() {
            if(watch && typeof watch =='object' && watch.hasOwnProperty('watchID')){
                $cordovaGeolocation.clearWatch(watch.watchID);
            }
        }
    }]);