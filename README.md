# angular-materializecss-autocomplete
Angular directive to create autocompletes with [materialize-css](http://materializecss.com/)

# Install

## Bower
`bower install angular-materializecss-autocomplete`

## npm
`npm i angular-materializecss-autocomplete`

Import the file in your index.  
  
```html
 <script src="app/angular-materializecss-autocomplete.js"></script>
```  

Declare a dependency on principal module  
```javascript
angular.module('myModule', ['angularMaterializeAutoComplete']);
```

# Usage
In your view declare the directive  

```html
  <auto-complete model="vm.cidade" func="vm.getDragons" property="name" icon-prefix="textsms" label="olosco"></auto-complete>
```
## Options:

| Atributte           | Required  | Description  |
| -------------       | --------- |------------- |
| model `'='`         | true      | Model of input|
| label `'@'`         | true      | Label of input|
| func `'&'`          | true      | Function to return data (promisse or array) |
| iconPrefix `'@'`    | false     | Incon of input|
| property `'@'`      | true      | Property of data object display in search|
| onModelChanged `'&'`| false     | A callback executed when a match is selected|
| validadeObject `'&'`| false     | [in progress](https://github.com/marcosflorencio/angular-materializecss-autocomplete/issues/4) |
| limit `'@'`         | false     | [in progress](https://github.com/marcosflorencio/angular-materializecss-autocomplete/issues/6)|

