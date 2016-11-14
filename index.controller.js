(function () {
  'use strict'

  angular
    .module('app', ['angularMaterializeAutoComplete'])
    .controller('IndexController', IndexController)

  IndexController.$inject = ['$http']
  function IndexController($http) {
    var vm = this

    vm.getLocation = getLocation

    function getLocation(search) {
      return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: search,
          sensor: false
        }
      }).then(function (response) {
        console.log('response {}', response);
        return response.data.results
      })
    }

  }
})()