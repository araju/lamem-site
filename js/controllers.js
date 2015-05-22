var imagesApp = angular.module('imagesApp', ['infinite-scroll']);

imagesApp.controller('ImageListCtrl', ['$scope', '$http',
  
  function ($scope, $http) {
    angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 500);
    $scope.images = [];
    $scope.allImages = [];
    $http.get('data/images.json').success(function(data) {
      $scope.allImages = data;
      //$scope.images = $scope.allImages.slice(0,12);
      for (var i = 0; i < 5; i++) {
        $scope.images.push($scope.allImages[i]);
      }
    });
    $http.get('data/datasets.json').success(function(data) {
      $scope.datasets = data;
      $scope.selectedDataset = $scope.datasets[0];
    });
    // $scope.images = [];
    $scope.sortStat = 'memscore';
    $scope.reverse = true;

    

    $scope.loadMore = function() {
      console.log("loading more");
      var last = $scope.images.length;
      if (last < $scope.allImages.length) {
        for(var i = 0; i < 5; i++) {
          $scope.images.push($scope.allImages[last + i]);
        }
      }
    };
    


    // $scope.loadMore = function() {
    //   var last = $scope.images[$scope.images.length - 1];
    //   for(var i = 1; i <= 8; i++) {
    //     $scope.images.push(last + i);
    //   }
    // };
}]);