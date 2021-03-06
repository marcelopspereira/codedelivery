angular.module('starter.services')
    .service('$cart',['$localStorage',function ($localStorage) {
        var key = 'cart', cartAux = $localStorage.getObject(key);
        var key1 = 'auxiliar', aux = $localStorage.getObject(key1);
        if(!cartAux){
            initCart();
        }
        if(!aux){
            initAux();
        }

        this.clear = function () {
            initCart();
        };
        this.get = function () {
            return $localStorage.getObject(key);
        };
        this.getAux = function () {
            return $localStorage.getObject(key1);
        };
        this.getItem = function (i) {
            return this.get().items[i];
        };
        this.addItem = function (item) {
            var cart = this.get(), itemAux, exists = false;
            for (var index in cart.items){
                itemAux = cart.items[index];
                if (itemAux.id == item.id){
                    itemAux.qtd = item.qtd + itemAux.qtd;
                    itemAux.subTotal = calculateSubtotal(itemAux);
                    exists = true;
                    break;
                }
            }
            if (!exists){
                item.subTotal = calculateSubtotal(item);
                cart.items.push(item);
            }
            cart.total = getTotal(cart.items);
            $localStorage.setObject(key,cart);
        };
        //auxiliares
        this.addAux = function (item) {
            var cart = this.getAux(), itemAux, exists = false;
            for (var index in cart.auxiliar){
                itemAux = cart.auxiliar[index];
                if (itemAux.id == item.id){
                    exists = true;
                    break;
                }
            }
            if (!exists){
                cart.auxiliar.push(item);
            }
            $localStorage.setObject(key1,cart);
        };

        this.removeAux = function (i) {
            var aux = this.getAux();
            aux.auxiliar.splice(i,1);
            $localStorage.setObject(key1,aux);
        };
        this.removeItem = function (i) {
            var cart = this.get();
            cart.items.splice(i,1);
            cart.total = getTotal(cart.items);
            $localStorage.setObject(key,cart);
        };

        this.updateQtd = function(i, qtd){
            var cart = this.get(),
                itemAux = cart.items[i];
            itemAux.qtd = qtd;
            itemAux.subTotal = calculateSubtotal(itemAux);
            cart.total = getTotal(cart.items);
            $localStorage.setObject(key,cart);
        };

        this.setCupom = function (code,value) {
            var cart = this.get();
            cart.cupom = {
                code: code,
                value: value
            };
            $localStorage.setObject(key,cart);
        };


        this.removeCupom = function () {
            var cart = this.get();
            cart.cupom = {
                code:null,
                value:null
            };
            $localStorage.setObject(key,cart);

        };

        this.getTotalFinal = function () {
            var cart = this.get();
            return cart.total - (cart.cupom.value || 0);
        };
        function calculateSubtotal(item) {
            return item.price * item.qtd;
        }
        
        function getTotal(items) {
            var sum = 0;
            angular.forEach(items,function (item) {
                sum += item.subTotal;
            });
            return sum;
        }
        
        function initCart() {
            $localStorage.setObject(key,{

                items:[],
                total:0,
                cupom:{
                    code:null,
                    value:null,
                }
            })

            $localStorage.setObject(key1,{
                auxiliar:[]
            });
        }

        function initAux() {
            $localStorage.setObject(key1,{
                auxiliar:[]
            });
        }
    }]);