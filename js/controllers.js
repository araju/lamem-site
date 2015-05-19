var imagesApp = angular.module('imagesApp', []);

imagesApp.controller('ImageListCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('data/images.json').success(function(data) {
      $scope.images = data;
    });
    $http.get('data/datasets.json').success(function(data) {
      $scope.datasets = data;
      $scope.selectedDataset = $scope.datasets[0];
    });

    $scope.sortStat = 'memscore';
    $scope.reverse = true;
  }]);