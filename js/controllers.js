var imagesApp = angular.module('imagesApp', ['infinite-scroll']);

imagesApp.controller('ImageListCtrl', ['$scope', '$http', '$filter', '$window',
  
  function ($scope, $http, $filter, $window) {
    angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 500);
    $scope.images = [];
    $scope.possibleImages = [];
    $scope.allImages = [];

    $scope.spinnerStyle = "display: block; text-align: center;";
    $scope.imagesStyle = "display: none;";

    $http.get('data/allimages2.json').success(function(data) {
      $scope.allImages = data;
      //$scope.images = $scope.allImages.slice(0,12);
      console.log('calling from here');
      $scope.sortAndFilter();
     // for (var i = 0; i < 20; i++) {
     //   $scope.images.push($scope.possibleImages[i]);
     // }
      $scope.spinnerStyle = "display: none";
      $scope.imagesStyle = "";
    });
    $http.get('data/datasets.json').success(function(data) {
      $scope.datasets = data;
      console.log('got datasets');
      $scope.selectedDataset = $scope.datasets[0];
    });
    // $scope.images = [];
    $scope.sortStat = 'memscore';
    $scope.sortStatName = 'Memorability (hi to lo)';
    $scope.reverse = true;
    $scope.furtherFilterName = 'All';
    $scope.furtherFilter = '';

    $scope.selectedDataset = {name: "All", filtername: ""};

    $scope.sortAndFilter = function() {
      //console.log($scope.selectedDataset.displayname);
      $scope.possibleImages = $filter('filter')($scope.allImages, $scope.selectedDataset.filtername, false);
     // console.log($scope.possibleImages.length);
      $scope.possibleImages = $filter('filter')($scope.possibleImages, $scope.furtherFilter, false);
      $scope.possibleImages = $filter('orderBy')($scope.possibleImages, $scope.sortFunc, $scope.reverse);
     //console.log('in sort and filter');
     console.log($scope.possibleImages.length);
     $scope.images = [];
     $scope.loadMore();
    };
    
    $scope.selectDataset = function(dataset) {
      $scope.selectedDataset = dataset;
      $scope.sortStat = 'memscore';
      $scope.sortStatName = 'Memorability (hi to lo)';
      $scope.reverse = true;
      $scope.furtherFilterName = 'All';
      $scope.furtherFilter = '';
    }

    $scope.sortFunc = function(img) {
      var slash = img.name.indexOf("/");
      var dot = img.name.indexOf(".");
      var num = parseInt(img.name.substring(slash+1, dot));
      // the following is very hacky!!!!
      // HARD-CODING AHEAD!
      if ($scope.sortStat === 'memscore') {
        return img.memscore*1000 + (num*0.00001);
      } else if ($scope.sortStat === 'aesthetics') {
        return img.aesthetics + (num*0.00001);
      } else if ($scope.sortStat === 'popularity') {
        return img.popularity + (num*0.00001);
      } else {
        return img.memscore;
      }
    };

    $scope.loadMore = function() {
      console.log("loading more");
      var last = $scope.images.length;
      var cur = 0;
      var count = 0;
      var minNum = ($window.innerHeight / 90) * ($window.innerWidth / 90);
      if (cur < $scope.possibleImages.length) {
        while((count < 3 || $scope.images.length < minNum) && cur < $scope.possibleImages.length) {
          if (!contains($scope.images, $scope.possibleImages[cur])) {
            $scope.images.push($scope.possibleImages[cur]);
            count++;
          }
          cur++;
        }
      }
    };

    var contains = function(arr, img) {
      for (var i=0; i < arr.length; i++) {
        if (arr[i].name === img.name) {
          return true;
        }
      }
      return false;
    };

    $scope.getStat = function(img) {
      if ($scope.sortStat === 'memscore') {
        return img.memscore;
      } else if ($scope.sortStat === 'aesthetics') {
        return img.aesthetics;
      } else if ($scope.sortStat === 'popularity') {
        //console.log(img.popularity);
        return img.popularity;
      } else {
        return img.memscore;
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
      $http.get('http://memorability.csail.mit.edu/cgi-bin/image.py', {params: {'url': url}}).success(
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
