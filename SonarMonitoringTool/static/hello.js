var myApp = angular.module('myApp', [ 'ngRoute' ]);

myApp.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/project/:projectId', {
		controller : 'GetProjectCtrl',
		templateUrl : 'project.html'
	})

	$locationProvider.html5Mode(true);
});


myApp.controller('Hello', [ '$scope', '$http', function($scope, $http) {
	$http.get('http://localhost:8080/projects').success(function(data) {
		$scope.loadingBox = "loading-visible";
		var projects = new Array();
		function setInfo(element, index, array) {
			var project = new Object();
			project.name = element.name;
			project.url = element.url;
			project.date = element.date;
			project.id = element.id;
			project.description = element.description;
			projects.push(project);
		}
		data.forEach(setInfo);
		$scope.projects = projects;
		$scope.loadingBox = "loading-hidden";
	});
}

]);

myApp.controller('URLCtrl', [
		'$window',
		'$scope',
		'$http',
		function($window, $scope, $http) {
			$scope.loadingBox = "loading-hidden";
			$scope.notSonarBox = "messageBoxHidden";
			$scope.notURLBox = "messageBoxHidden";
			$scope.button1Class = "button1";
			$scope.saveButtonSwitch = false;
			$scope.saveURL = function(URLInfo) {
				if (URLInfo.fURL.substring(0, 7) == "http://"
						|| URLInfo.fURL.substring(0, 8) == "https://") {
					$scope.loadingBox = "loading-visible";
					$scope.notSonarBox = "messageBoxHidden";
					$scope.notURLBox = "messageBoxHidden";
					$scope.button1Class = "button1 disabled"
					$scope.saveButtonSwitch = true;
					if (URLInfo.fURL.substring(4, 5) == 's')
						var URL = 'http://localhost:8080/newURL/'
								+ URLInfo.fURL.substring(8) + '/true';
					else
						var URL = 'http://localhost:8080/newURL/'
								+ URLInfo.fURL.substring(7) + '/false'
				} else {
					$scope.notURLBox = "messageBoxVisible";
					$scope.loadingBox = "loading-hidden";
					$scope.button1Class = "button1";
					$scope.saveButtonSwitch = false;
				}
				console.log(URL);
				$http.get(URL).success(function(data) {
					if (data == "false") {
						$scope.notSonarBox = "messageBoxVisible";
						$scope.loadingBox = "loading-hidden";
						$scope.button1Class = "button1";
						$scope.saveButtonSwitch = false;
					} else {
						$window.location.href = 'sonar-projects.html';
					}
				});
			}
		} ]);


myApp.controller('GetProjectCtrl', [
        '$filter',
		'$location',
		'$scope',
		'$http',
		function($filter,$location, $scope, $http) {
			var blockerValues = null
			var blockerDates = null
			var criticalValues = null;
			var majorValues = null;
			var minorValues = null
			$scope.loadingBox = "loading-visible";
			$http.get(
					'http://localhost:8080/project/'
							+ $location.search().projectId).success(
					function(data) {
						$scope.project = data;
						var msrs = data.allMsr;
						function setViolations(element, index, array) {
							if (element.key === "blocker_violations") {
								if(blockerValues===null && blockerDates===null ){
									blockerValues = element.frmt_val;
									var Date = $filter('date')(element.date, 'dd/MM/yyyy HH:MM:s');
									blockerDates = Date;
									console.log(Date);
								}
								else{
									blockerValues = blockerValues+','+element.frmt_val
									var Date = $filter('date')(element.date, 'dd/MM/yyyy HH:MM:s');
									blockerDates = blockerDates+","+Date;
									console.log(Date);
									}
								}

							if (element.key === "critical_violations") {
								if(criticalValues===null ){
									criticalValues = element.frmt_val; 
								}
								else{
									criticalValues = criticalValues+ ','+element.frmt_val; 
									}
								}
							if (element.key === "major_violations") {
								if(majorValues===null ){
									majorValues = element.frmt_val;
								}
								else{
									majorValues = majorValues+ ','+element.frmt_val; 
									}
								}
							if (element.key === "minor_violations") {
								if(minorValues===null ){
									minorValues = element.frmt_val; 
								}
								else{
									minorValues = minorValues+ ','+element.frmt_val;
									}
								}
							
							}
						console.log(blockerDates);				
						$scope.project.allMsr.forEach(setViolations);
						
						$scope.chart = null;
					    $scope.config={};
					    $scope.config.Blocker=blockerValues;
					    $scope.config.Critical = criticalValues;
					    $scope.config.Major = majorValues;
					    $scope.config.Minor = minorValues;
					    $scope.config.Date=blockerDates;
					    $scope.typeOptions=["line","bar","spline","step","area","area-step","area-spline"];
					 
					    $scope.config.type1=$scope.typeOptions[0];
					    
					 
					    $scope.showGraph = function() {
					        var config = {};
					        config.bindto = '#chart';
					        config.data = {};
					        config.data.json = {};
					        config.data.json.x = $scope.config.Date.split(",");
					        config.data.x = "x";
					        config.data.xFormat = "%d/%m/%Y %H:%m:%S";
					        config.data.json.Blocker = $scope.config.Blocker.split(",");
					        config.data.json.Critical = $scope.config.Critical.split(",");
					        config.data.json.Major = $scope.config.Major.split(",");
					        config.data.json.Minor = $scope.config.Minor.split(",");
					        config.axis = {"x": {"type": "timeseries", "tick": {"format": "%d/%m/%Y %H:%m:%S" }},"y":{"label":{"text":"Number of items","position":"outer-middle"}}};
					        config.data.types={"Blocker":$scope.config.type1};
					        config.data.types={"Critical":$scope.config.type1};
					        config.data.types={"Minor":$scope.config.type1};
					        config.data.types={"Major":$scope.config.type1};
					        config.zoom = {"enabled":"true"};
					        $scope.chart = c3.generate(config);     
					    }
						
						
						
						$scope.loadingBox = "loading-hidden";
					});
			console.log($location.search().projectId);
		} ]);
