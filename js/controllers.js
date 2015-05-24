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

var demoApp = angular.module('demoApp', []);

demoApp.controller('DemoCtrl', ['$scope', '$http',
  
  function ($scope, $http) {
    $scope.memscore = 0;

    $scope.handleImage = function(url) {
      console.log(url);
      $http.post('http://memorability.csail.mit.edu/cgi-bin/image.py', {'url': url}).success(
          function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            console.log('got resposne');
            $scope.memscore = data['memscore'];
          }).error(
          function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('got error');
          }); 
    };
}]);