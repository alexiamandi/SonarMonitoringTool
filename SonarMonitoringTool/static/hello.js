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
			var minorValues = null;
			var infoValues = null;
			var nclocValues = null;
			var sqaleIndexValues = null;
			var coverageValues = null;
			var duplicatedLinesValues = null;
			var complexityValues = null;
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
									Dates = Date;
									console.log(Date);
								}
								else{
									blockerValues = blockerValues+','+element.frmt_val
									var Date = $filter('date')(element.date, 'dd/MM/yyyy HH:MM:s');
									Dates = Dates+","+Date;
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
							if (element.key === "info_violations") {
								if(infoValues===null ){
									infoValues = element.frmt_val; 
								}
								else{
									infoValues = infoValues+ ','+element.frmt_val; 
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
							if (element.key === "ncloc") {
								if(nclocValues===null ){
									nclocValues = element.frmt_val; 
								}
								else{
									nclocValues = nclocValues + ','+element.frmt_val;
									}
								}
							if (element.key === "sqale_index") {
								if(sqaleIndexValues===null ){
									sqaleIndexValues = element.frmt_val; 
								}
								else{
									sqaleIndexValues = sqaleIndexValues+ ','+element.frmt_val;
									}
								}
							if (element.key === "coverage") {
								if(coverageValues===null ){
									coverageValues = element.frmt_val; 
								}
								else{
									coverageValues = coverageValues+ ','+element.frmt_val;
									}
								}
							if (element.key === "duplicated_lines") {
								if(duplicatedLinesValues===null ){
									duplicatedLinesValues = element.frmt_val; 
								}
								else{
									duplicatedLinesValues = duplicatedLinesValues+ ','+element.frmt_val;
									}
								}
							if (element.key === "complexity") {
								if(complexityValues===null ){
									complexityValues = element.frmt_val; 
								}
								else{
									complexityValues = complexityValues+ ','+element.frmt_val;
									}
								}
							
							}
						console.log(blockerDates);				
						$scope.project.allMsr.forEach(setViolations);
		//FirstChart				
						$scope.chart = null;
					    $scope.config={};
					    $scope.config.Blocker=nclocValues;
					    $scope.config.Critical = criticalValues;
					    $scope.config.Major = majorValues;
					    $scope.config.Minor = minorValues;
					    $scope.config.Info = infoValues;
					    $scope.config.Date= Dates;
					    $scope.typeOptions=["line","bar","spline","step","area","area-step","area-spline"];
					    $scope.config.type1="line";
					    
		//2nd Chart
					    $scope.chart2 = null;
					    $scope.config2={};
					    $scope.config2.ncloc=nclocValues;
					    $scope.config2.sqaleIndex = sqaleIndexValues;
					    $scope.config2.coverage = coverageValues;
					    $scope.config2.duplicatedLines = duplicatedLinesValues;
					    $scope.config2.complexity = complexityValues;
					    $scope.config.Date= Dates;
					    $scope.typeOptions=["line","bar","spline","step","area","area-step","area-spline"];
					    $scope.config.type1="line"; 
					 
					    function showGraph() {
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
					        config.data.json.Info = $scope.config.Info.split(",");
					        config.axis = {"x": {"type": "timeseries", "tick": {"format": "%d/%m/%Y %H:%m:%S" }},"y":{"label":{"text":"Number of items","position":"outer-middle"}}};
					        config.data.types={"Blocker":$scope.config.type1};
					        config.data.types={"Critical":$scope.config.type1};
					        config.data.types={"Minor":$scope.config.type1};
					        config.data.types={"Major":$scope.config.type1};
					        config.data.types={"Info":$scope.config.type1};
					        config.zoom = {"enabled":"true"};
					        $scope.chart = c3.generate(config);     
					    }
					    showGraph();
						
					    function showGraph2() {
					        var config2 = {};
					        config2.bindto = '#chart2';
					        config2.data = {};
					        config2.data.json = {};
					        config2.data.json.x = $scope.config.Date.split(",");
					        config2.data.x = "x";
					        config2.data.xFormat = "%d/%m/%Y %H:%m:%S";
					        config2.data.json.ncloc = $scope.config2.ncloc.split(",");
					        config2.data.json.sqaleIndex = $scope.config2.sqaleIndex.split(",");
					        config2.data.json.coverage = $scope.config2.coverage.split(",");
					        config2.data.json.duplicatedLines = $scope.config2.duplicatedLines.split(",");
					        config2.data.json.complexity = $scope.config2.complexity.split(",");
					        config2.axis = {"x": {"type": "timeseries", "tick": {"format": "%d/%m/%Y %H:%m:%S" }},"y":{"label":{"text":"Number of items","position":"outer-middle"}}};
					        config2.data.types={"Number of physical lines":$scope.config.type1};
					        config2.data.types={"Effort to fix all issues in minutes":$scope.config.type1};
					        config2.data.types={"Coverge":$scope.config.type1};
					        config2.data.types={"Duplicated lines:":$scope.config.type1};
					        config2.data.types={"Complexity:":$scope.config.type1};
					        config2.zoom = {"enabled":"true"};
					        $scope.chart2 = c3.generate(config2);     
					    }
					    showGraph2();
					    
						
						$scope.loadingBox = "loading-hidden";
					});
			console.log($location.search().projectId);
			
		} ]);
