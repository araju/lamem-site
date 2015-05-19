var imagesApp = angular.module('imagesApp', []);

imagesApp.controller('ImageListCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('images/images.json').success(function(data) {
      $scope.images = data;
    });

    $scope.orderProp = 'memscore';
  }]);