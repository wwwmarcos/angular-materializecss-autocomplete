(function() {
  'use strict'

   angular
    .module('angularMaterializeAutoComplete', [])
    .directive('autoComplete', autoComplete)
    .run(run)

    run.$inject = ['$templateCache']
    function run($templateCache){
      $templateCache
        .put('angular-materializecss-autocomplete.html', 
               '<div class="row">'
         +     '<div class="col s12">'
         +       '<div class="row">'
         +         '<div class="input-field col s12">'
         +           '<i class="material-icons prefix">textsms</i>'
         +           '<input type="text" id="autocomplete-input" class="autocomplete">'
         +           '<label for="autocomplete-input">Autocomplete</label>'
         +         '</div>'
         +       '</div>'
         +     '</div>'
         +   '</div>')
    }

    function autoComplete(){
      var directive = {
        restrict: 'E',
        scope: {},
        link: link,
        templateUrl: 'angular-materializecss-autocomplete.html'
      }
      return directive

      function link (scope, element, attrs) {

      }

    }
})()