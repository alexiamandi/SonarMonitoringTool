var myApp = angular.module('myApp', [ 'ngRoute']);

myApp.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/project/:projectId', {
		controller : 'GetProjectCtrl',
		templateUrl : 'project.html'
	})

	$locationProvider.html5Mode(true);
});
myApp.controller("basicExampleCtrl", ["$scope", function($scope) {
	  $scope.list = $scope.$parent.personList
	  $scope.config = {
	    itemsPerPage: 5,
	    fillLastPage: true
	  }
	}]);

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
		// FirstChart
						$scope.chart = null;
					    $scope.config={};
					    $scope.config.Blocker=blockerValues;
					    $scope.config.Critical = criticalValues;
					    $scope.config.Major = majorValues;
					    $scope.config.Minor = minorValues;
					    $scope.config.Info = infoValues;
					    $scope.config.Date= Dates;
					    $scope.typeOptions=["line","bar","spline","step","area","area-step","area-spline"];
					    $scope.config.type1="line";
					    
		// 2nd Chart
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
					        config2.data.json.Ncloc = $scope.config2.ncloc.split(",");
					        config2.data.json.SqaleIndex = $scope.config2.sqaleIndex.split(",");
					        config2.data.json.Coverage = $scope.config2.coverage.split(",");
					        config2.data.json.DuplicatedLines = $scope.config2.duplicatedLines.split(",");
					        config2.data.json.Complexity = $scope.config2.complexity.split(",");
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

myApp.controller('GetProjectCtrl2', [
                                    '$filter',
                            		'$location',
                            		'$scope',
                            		'$http',
                           function($filter,$location, $scope, $http) {
                             $http.get(
                            		'http://localhost:8080/project/'
                            		+ $location.search().projectId).success(
                            			function(data) { 
                            				console.log($scope.metricName);
                                        	var Reliability = new Array();
                                        	var Security = new Array();
                                        	var Maintainability = new Array();
                                        	var Tests = new Array();
                                        	var Duplication = new Array();
                                        	var Size = new Array();
                                        	var Complexity = new Array();
                                        	var Documentation = new Array();
                                        	var General = new Array();
                                        	var Issues = new Array();
                                        	$scope.project = new Object;
                                        	$scope.project.name = data.name;
                                        	$scope.project.description = data.description;
                                        	$scope.project.id = data.id;
                                        	$scope.project.url = data.url;
                                        	$scope.project.date = data.date;
                                        	console.log(data.id);		
                                        	data.allMsr.forEach(setInfo);
                                        	
                                        	function setInfo(element, index, array){
                                        							// Issues
                                                                    		if (element.key === "violations" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "violations";
                                            									Metric.name= "Issues";
                                            									if(element.frmt_val===null)Metric.value = 0; else if(element.frmt_val===null)Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Issues.push(Metric);
                                                                			}
                                                                    		if (element.key === "new_violations" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.name = "New issues";
                                            									Metric.key = "new_violations";
                                            									if(element.frmt_val===null)Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Issues.push(Metric);
                                                                			}
                                                                    		if (element.key === "new_blocker_violations" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.name = "New blocker issues";
                                            									Metric.key = "new_blocker_violations";
                                            									if(element.frmt_val===null)Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Issues.push(Metric);
                                                                			}
                                                                    		if (element.key === "critical_violations" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "critical_violations";
                                            									Metric.name = "Critical issues";
                                            									if(element.frmt_val===null)Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Issues.push(Metric);
                                                                			}
                                                                    		if (element.key === "new_critical_violations" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "new_critical_violations";
                                            									Metric.name = "New critical issues";
                                            									if(element.frmt_val===null)Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Issues.push(Metric);
                                                                			}
                                                                    		if (element.key === "major_violations" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "major_violations";
                                            									Metric.name = "Major issues";
                                            									if(element.frmt_val===null)Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Issues.push(Metric);
                                                                			}
                                                                    		if (element.key === "new_major_violations" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "new_major_violations";
                                            									Metric.name = "New major issues";
                                            									if(element.frmt_val===null)Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Issues.push(Metric);
                                                                			}
                                                                    		if (element.key === "minor_violations" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "minor_violations";
                                            									Metric.name = "Minor issues";
                                            									if(element.frmt_val===null)Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Issues.push(Metric);
                                                                			}
                                                                    		if (element.key === "new_minor_violations" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "new_minor_violations";
                                            									Metric.name = "New minor issues";
                                            									if(element.frmt_val===null)Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Issues.push(Metric);
                                                                			}
                                                                    		if (element.key === "info_violations" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "info_violations";
                                            									Metric.name = "Info issues";
                                            									if(element.frmt_val===null)Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Issues.push(Metric);
                                                                			}
                                                                    		if (element.key === "new_info_violations" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "new_info_violations";
                                            									Metric.name = "New info issues";
                                            									if(element.frmt_val===null)Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Issues.push(Metric);
                                                                			}
                                                                    		if (element.key === "open_issues" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "open_issues";
                                            									Metric.name = "Open issues";
                                            									if(element.frmt_val===null)Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Issues.push(Metric);
                                                                			}
                                                                    		if (element.key === "reopened_issues" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "reopened_issues";
                                            									Metric.name = "Reopened issues";
                                            									if(element.frmt_val===null)Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Issues.push(Metric);
                                                                			}
                                                                    		if (element.key === "confirmed_issues" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "confirmed_issues";
                                            									Metric.name = "Confirmed issues";
                                            									if(element.frmt_val===null)Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Issues.push(Metric);
                                                                			}
                                                                    		if (element.key === "false_positive_issues" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "false_positive_issues";
                                            									Metric.name = "False positive issues";
                                            									if(element.frmt_val===null)Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Issues.push(Metric);
                                                                			}
                                                                    //General 		
                                                                    		if (element.key === "alert_status" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "alert_status";
                                            									Metric.name = "Quality Gate Status";
                                            									if(element.frmt_val===null)Metric.value = 0; else Metric.value = element.frmt_val;
                                            									General.push(Metric);
                                                                			}
                                                                    //Documentation
                                                                    		if (element.key === "comment_lines" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "comment_lines";
                                            									Metric.name = "Comment lines";
                                            									if(element.frmt_val===null)Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Documentation.push(Metric);
                                                                			}
                                                                    		if (element.key === "comment_lines_density" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "comment_lines_density";
                                            									Metric.name = "Comment lines(%)";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Documentation.push(Metric);
                                                                			}
                                                                    		if (element.key === "public_documented_api_density" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "public_documented_api_density";
                                            									Metric.name = "Public documented API(%)";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Documentation.push(Metric);
                                                                			}
                                                                    		if (element.key === "public_api" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "public_api";
                                            									Metric.name = "Public API";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Documentation.push(Metric);
                                                                			}
                                                                    		if (element.key === "public_undocumented_api" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "public_undocumented_api";
                                            									Metric.name = "Public undocumented API";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Documentation.push(Metric);
                                                                			}
                                                                    	//Complexity
                                                                    		if (element.key === "complexity" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "complexity";
                                            									Metric.name = "Complexity";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Complexity.push(Metric);
                                                                			}if (element.key === "class_complexity" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "class_complexity";
                                            									Metric.name = "Class complexity";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Complexity.push(Metric);
                                                                			}if (element.key === "file_complexity" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "file_complexity";
                                            									Metric.name = "File complexity";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Complexity.push(Metric);
                                                                			}if (element.key === "function_complexity" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "function_complexity";
                                            									Metric.name = "Function complexity";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Complexity.push(Metric);
                                                                			}
                                                                		//Size
                                                                			if (element.key === "ncloc" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "ncloc";
                                            									Metric.name = "Lines of code";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Size.push(Metric);
                                                                			}if (element.key === "classes" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "classes";
                                            									Metric.name = "Classes";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Size.push(Metric);
                                                                			}if (element.key === "directories" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "directories";
                                            									Metric.name = "Directories";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Size.push(Metric);
                                                                			}if (element.key === "files" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "files";
                                            									Metric.name = "Files";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Size.push(Metric);
                                                                			}if (element.key === "functions" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "functions";
                                            									Metric.name = "Functions";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Size.push(Metric);
                                                                			}if (element.key === "lines" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "lines";
                                            									Metric.name = "Lines";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Size.push(Metric);
                                                                			}if (element.key === "statements" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "statements";
                                            									Metric.name = "Statements";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Size.push(Metric);
                                                                			}
                                                                		//Duplication
                                                                			if (element.key === "duplicated_lines_density" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "duplicated_lines_density";
                                            									Metric.name = "Duplicated lines(%)";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Duplication.push(Metric);
                                                                			}if (element.key === "duplicated_blocks" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "duplicated_blocks";
                                            									Metric.name = "Duplicated blocks";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Duplication.push(Metric);
                                                                			}if (element.key === "duplicated_lines" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "duplicated_lines";
                                            									Metric.name = "Duplicated lines";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Duplication.push(Metric);
                                                                			}if (element.key === "duplicated_files" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "duplicated_files";
                                            									Metric.name = "Duplicated files";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Duplication.push(Metric);
                                                                			}
                                                                    	//Tests
                                                                			if (element.key === "coverage" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "coverage";
                                            									Metric.name = "Coverage";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Tests.push(Metric);
                                                                			}if (element.key === "line_coverage" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.name = "Line coverage";
                                            									Metric.key = "line_coverage";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Tests.push(Metric);
                                                                			}if (element.key === "branch_coverage" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "branch_coverage";
                                            									Metric.name = "Condition coverage";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Tests.push(Metric);
                                                                			}if (element.key === "uncovered_lines" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "uncovered_lines";
                                            									Metric.name = "Uncovered lines";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Tests.push(Metric);
                                                                			}if (element.key === "lines_to_cover" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "lines_to_cover";
                                            									Metric.name = "Lines to cover";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Tests.push(Metric);
                                                                			}if (element.key === "tests" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "tests";
                                            									Metric.name = "Unit tests";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Tests.push(Metric);
                                                                			}if (element.key === "test_errors" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "test_errors";
                                            									Metric.name = "Tests errors";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Tests.push(Metric);
                                                                			}if (element.key === "skipped_tests" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "skipped_tests";
                                            									Metric.name = "Skipped tests";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Tests.push(Metric);
                                                                			}if (element.key === "test_failures" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "test_failures";
                                            									Metric.name = "Test failures";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Tests.push(Metric);
                                                                			}if (element.key === "test_success_density" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "test_success_density";
                                            									Metric.name = "Test success(%)";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Tests.push(Metric);
                                                                			}
                                                                	//Maintainability
                                                                			if (element.key === "sqale_index" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "sqale_index";
                                            									Metric.name = "Technical debt";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Maintainability.push(Metric);
                                                                			}if (element.key === "sqale_debt_ratio" && element.date === data.date) {
                                            									var Metric = new Object();
                                            									Metric.key = "sqale_debt_ratio";
                                            									Metric.name = "Technical debt ratio";
                                            									if(element.frmt_val===null) Metric.value = 0; else Metric.value = element.frmt_val;
                                            									Maintainability.push(Metric);
                                                                			}
                                                                	
                                                                			
                                                                    			} 
                                                                    	$scope.issues = Issues;
                                                                    	$scope.maintains = Maintainability;
                                                                    	$scope.tests=Tests;
                                                                    	$scope.general = General;
                                                                    	$scope.complexity = Complexity;
                                                                    	$scope.documentation = Documentation;
                                                                    	$scope.sizes = Size;
                                                                    	$scope.duplications = Duplication;
                                    									$scope.loadingBox = "loading-hidden";

                            			}
                            			)
                                    }]);

myApp.controller('GetCustomMetrics', [
                                    '$filter',
                            		'$location',
                            		'$scope',
                            		'$http',
                            		function($filter,$location, $scope, $http) {
                        			$scope.metricName = $location.search().key;
                                    var projectId = $location.search().projectId;
                                    var MetricKey = $location.search().key;
                                    var keyValues = null
                        			var keyDates = null
                                    $http.get(
                            				'http://localhost:8080/project/'
                            					+ $location.search().projectId).success(
                            				function(data) {
                            					$scope.project = data;
                            					function setViolations(element, index, array) {
                        							if (element.key === MetricKey) {
                        								if(keyValues===null && keyDates===null ){
                        									keyValues = element.frmt_val;
                        									var Date = $filter('date')(element.date, 'dd/MM/yyyy HH:MM:s');
                        									keyDates = Date;
                        									console.log(Date);
                        								}
                        								else{
                        									keyValues = keyValues+','+element.frmt_val
                        									var Date = $filter('date')(element.date, 'dd/MM/yyyy HH:MM:s');
                        									keyDates = keyDates+","+Date;
                        									console.log(Date);
                        									}
                        								}
                            					}
                            					data.allMsr.forEach(setViolations);
                            					// FirstChart
                            									$scope.chart = null;
                            								    $scope.config={};
                            								    $scope.config.Data=keyValues;
                            								    $scope.config.Date=keyDates;
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
                            								        config.data.json.Data = $scope.config.Data.split(",");
                            								        config.axis = {"x": {"type": "timeseries", "tick": {"format": "%d/%m/%Y %H:%m:%S" }},"y":{"label":{"text":"Number of items","position":"outer-middle"}}};
                            								        config.zoom = {"enabled":"true"};
                            								        $scope.chart = c3.generate(config);     
                            								    }
                            								    showGraph();
                            									$scope.loadingBox = "loading-hidden";

                            				})                	
                                    	
                                    }]);
myApp.filter('myFormat', function() {
    return function(x) {
        var i, c, txt = "";
        x = x.split("")
        for (i = 0; i < x.length; i++) {
            c = x[i];
            if (i == 0) {
                c = c.toUpperCase();
            }
            if(c =='_') c=' ';
            txt += c;
        }
        return txt;
    };
});