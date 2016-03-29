var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider,$locationProvider){
                    $routeProvider
                    	.when('/project/:projectId',{
		                    controller:'GetProjectCtrl',
		                    templateUrl:'project.html'
		                })

	$locationProvider.html5Mode(true); 		 
});              
myApp.controller('Hello', ['$scope', '$http', function($scope, $http) {
    $http.get('http://localhost:8080/projects').
    success(function(data) {
        $scope.projects = data;
    });
}]);

myApp.controller('URLCtrl',['$window','$scope', '$http', function($window, $scope, $http) {
 
  $scope.saveURL = function(URLInfo) {
		if(URLInfo.fURL.substring(4, 5) == 's')
			var URL = 'http://localhost:8080/newURL/'+URLInfo.fURL.substring(8)+'/true';
		else
			var URL = 'http://localhost:8080/newURL/'+URLInfo.fURL.substring(7)+'/false'
		console.log(URL);
		$http.get(URL).
		success(function(data) {
				$window.location.href = 'sonar-projects.html';
    });
  }
}]);

myApp.controller('GetProjectCtrl', ['$location','$scope','$http', function($location,$scope,$http){
		$http.get('http://localhost:8080/project/'+$location.search().projectId).
    success(function(data) {
        $scope.project = data;
    });
	console.log($location.search().projectId);
}]);