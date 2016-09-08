angular.module('starter.controllers')
    .controller('DeliverymanOrderCtrl',[
        '$scope','$state','$ionicLoading','$ionicActionSheet','DeliverymanOrder','$ionicPopup',
        function ($scope, $state,$ionicLoading,$ionicActionSheet,DeliverymanOrder,$ionicPopup) {

        $scope.items = [];

        $ionicLoading.show({
           template: 'Carregando...'
        });

        $scope.doRefresh = function () {
          getOrders().then(function (data) {

              $scope.items = data.data;

              $scope.$broadcast('scroll.refreshComplete');
          },function (dataError) {
              $scope.$broadcast('scroll.refreshComplete');
          });
        };
        
        $scope.openOrderDetail = function (order) {
            console.log(order);
            if (order.status == 1) {
                $state.go('deliveryman.view_close', {id: order.id});
            }else {
                $state.go('deliveryman.view_order', {id: order.id});
            }
        };
            $scope.showActionSheet = function (order) {
                $ionicActionSheet.show({
                    buttons:[
                        {text:'Ver detalhes'}
                        ],
                    titleText:'O que fazer?',
                    cancelText:'Cancelar',
                    cancel:function () {

                    },
                    buttonClicked:function (index) {
                        switch (index){
                            case 0:
                                if (order.status == 1) {
                                    $state.go('deliveryman.view_close', {id: order.id});
                                }else {
                                    $state.go('deliveryman.view_order', {id: order.id});
                                }
                                break;
                            case 1:
                                break
                        }
                    }
                });
            };
            function getOrders() {
                return DeliverymanOrder.query({
                    id:null,
                    orderBy:'created_at',
                    sortedBy:'asc'
                }).$promise;
            }

            getOrders().then(function (data) {
                if(data.data.length==0){
                    $ionicPopup.alert({
                        title: 'Atenção',
                        template: 'Não existe novas Ordens'
                    }).then(function(res) {
                        if(res){
                            $state.go('deliveryman.home');
                        }else{
                            $state.go('deliveryman.home');
                        }
                    });
                }
                $scope.items = data.data;
                $ionicLoading.hide();
            },function (dataError) {
                $ionicLoading.hide();
            });
    }]);