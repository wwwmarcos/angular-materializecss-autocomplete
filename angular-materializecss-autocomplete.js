(function () {
  'use strict'

  angular
    .module('angularMaterializeAutoComplete', [])
    .directive('autoComplete', autoComplete)
    .directive('autoCompleteViewValue', autoCompleteViewValue)
    .run(run)

  run.$inject = ['$templateCache']
  function run($templateCache) {
    $templateCache
      .put('angular-materializecss-autocomplete.template.html',
        '<ng-form name="autoCompleteForm">'
      + '	<div class="row">'
      + '		<div class="input-field">'
      + '			<i class="material-icons prefix" data-ng-if="iconPrefixDefined()">{{iconPrefix}}</i>'
      + '			<input type="text" auto-complete-view-value="{{property}}" validate-obj="{{validadeObject}}" data-ng-model="model" class="autocomplete"'
      + '				data-ng-change="modelChanged(model)" />'
      + '			<label for="autocomplete-input">{{label}}</label>'
      + '			<ul class="autocomplete-content dropdown-content">'
      + '				<li data-ng-repeat="item in itens track by $index" data-ng-if="match(item[property], model) && !closed" data-ng-click="select(item, model)">'
      + '					<span>'
      + '              <!--<span class="highlight">{{item[property]}}</span>--> {{item[property]}}'
      + '					<!--<span class="highlight">{{ buildItemDescription(item[property], model, true) }}</span>{{ buildItemDescription(item[property], model, false) }}-->'
      + '					</span>'
      + '				</li>'
      + '			</ul>'
      + '		</div>'
      + '	</div>'
      + '</ng-form>')
  }

  autoComplete.$inject = ['$q']
  function autoComplete($q) {
    var directive = {
      restrict: 'E',
      scope: {
        model: '=',
        label: '@',
        func: '&',
        iconPrefix: '@',
        property: '@',
        onModelChanged: '&',
        onSelect: '&',
        validadeObject: '@',
        limit: '@'
      },
      link: link,
      templateUrl: 'angular-materializecss-autocomplete.template.html'
    }
    return directive

    function link(scope, element, attrs) {

      scope.func = scope.func()
      scope.onModelChanged = scope.onModelChanged()
      scope.onSelect = scope.onSelect()

      scope.closed = false
      // in progress
      scope.limit = scope.limit || 10

      scope.iconPrefixDefined = iconPrefixDefined
      scope.modelChanged = modelChanged
      scope.match = match
      scope.select = select
      scope.buildItemDescription = buildItemDescription

      function modelChanged(model) {
        scope.closed = false
        callIfDefined(scope.onModelChanged, model)
        
        $q.when(scope.func(model))
        .then(function(response){
           scope.itens = response
        })

      }

      function iconPrefixDefined() {
        return angular.isDefined(scope.iconPrefix)
      }

      function match(item, model) {
        if (!angular.isObject(model)) {
          return (item.toUpperCase()).indexOf(model.toUpperCase()) != -1
        }
      }

      function select(item, model) {
        scope.model = item
        scope.closed = true
        callIfDefined(scope.onSelect, item, model)
      }

      function callIfDefined(func, argumentOne, argumentTwo) {
        if (func) {
          func(argumentOne, argumentTwo)
        }
      }

      // in progress
      function buildItemDescription(item, model, isHighlightText) {
        if (isHighlightText) {
          var rg = new RegExp(item, "g")
          return model.replace(rg, '')
        }
        var rg = new RegExp(model, "g")
        return item.replace(rg, '')
      }

      function validadeObject(model) {
        if (!angular.isObject(model) && scope.autoCompleteForm.$dirty) {
          return setValidity('invalidObject', false)
        }
      }

      function setValidity(key, isValid) {
        ngForm.$setValidity(key, isValid)
      }

      // in progress
      element.bind('blur', function () {
        if (scope.validadeObject != false || scope.validadeObject != 'false') {
          validadeObject()
        }
      })
    }
  }

  function autoCompleteViewValue() {
    var directive = {
      restrict: 'A',
      scope: {
        ngModel: '=',
        autoCompleteViewValue: '@',
      },
      link: link
    }
    return directive

    function link(scope, element, attrs, ngForm) {

      scope.$watch('ngModel', function (value) {
        if (value && angular.isObject(value)) {
          setInputViewValue(value[getVisibleProperty()])
        }
      })

      function getVisibleProperty() {
        return scope.autoCompleteViewValue
      }

      function setInputViewValue(value) {
        return element.val(value)
      }
    }
  }

})()