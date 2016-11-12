(function () {
  'use strict'

  angular
    .module('app', ['angularMaterializeAutoComplete'])
    .controller('IndexController', IndexController)

  IndexController.$inject = ['$http']
  function IndexController($http) {
    var vm = this

    var cities = [
      {
        name: 'Maringa', uf: 'PR', id: '500c709b-9504-462e-9b24-422852cac418'
      },
      {
        name: 'São Paulo', uf: 'SP', id: '6292ad1a-e80f-4642-9bb7-0c19f10db5b1'
      },
      {
        name: 'Apucarana', uf: 'PR', id: '7aebb3b6-c7ae-42aa-8d11-7b5ecc36b6f1'
      },
      {
        name: 'Londrina', uf: 'PR', id: '560c2ebe-b59f-44b2-99a3-19e9f148e401'
      },
      {
        name: 'Curitiba', uf: 'PR', id: '2b97cb57-46a3-4733-a69b-068f0a3b31ab'
      }
    ]
    
    vm.getDragons = getDragons
    
    function getDragons(search) {

      console.log('search {}', search)
      
      // não faça isso na vida real, isso é apenas para fins de teste

      var request = {
        url: 'https://dragons-api.herokuapp.com/api/dragons',
        method: 'GET',
      }

      return $http(request).then(function (response) {
        console.log('response {}',  response.data.items);
        return response.data.items
      })

    }

  }
})()