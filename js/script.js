var unionApp = angular.module('unionApp', ['ngRoute']);

unionApp.config(function ($httpProvider) {
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
});



unionApp.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl : 'index.html',
			controller : 'dashboardController'
		})
		.when('/newEmployee',{
			templateUrl : 'create_new_employee.html',
			controller : 'createEmployeeController'
		})
		.when('/displayEmployee',{
			templateUrl : 'display_employee.html',
			controller : 'displayController'
		})
		.when('/updateEmployee',{
			templateUrl : 'update_employee.html',
			controller : 'displayController'
		});
});

unionApp.controller('dashboardController', function($scope, $http){
	$scope.message = "unionApp loaded";
	$http.get('http://localhost:8080/union_data_srv/employee/count').
        then(function(response) {
            $scope.count_employees = response.data;
        });
    

	$http.get('http://localhost:8080/union_data_srv/employee/count_union_employees/AIBEA').
        then(function(response) {
            $scope.count_AIBEA = response.data;
        });

     $http.get('http://localhost:8080/union_data_srv/employee/count_union_employees/BEFI').
        then(function(response) {
            $scope.count_BEFI = response.data;
        });
      $http.get('http://localhost:8080/union_data_srv/employee/count_union_employees/AIBOA').
        then(function(response) {
            $scope.count_AIBOA = response.data;
        });
      $http.get('http://localhost:8080/union_data_srv/employee/count_union_employees/AIBOC').
        then(function(response) {
            $scope.count_AIBOC = response.data;
        });
      $http.get('http://localhost:8080/union_data_srv/employee/count_reliefFundMembers').
        then(function(response) {
            $scope.reliefFundMembers = response.data;
        });
       
    
    
    

});

unionApp.controller('createEmployeeController', function($scope, $http){ 	
	$scope.message = "create";
	$scope.switchBool = function (value) {
        $scope[value] = !$scope[value];
    };

	$scope.submit = function(employeeForm){
		var newEmployee = {
				"employeeID" : $scope.id,
				"name" : $scope.name,
				"sex" : $scope.sex,
				"branch" : $scope.branch,
				"branchID" : "000",
				"doj" : $scope.doj,
				"dor" : $scope.dor,
				"contact" : $scope.contact,
				"address" : $scope.address,
				"branchReq1" : $scope.branchReq1,
				"branchReq2" : $scope.branchReq1,
				"branchReq3" : $scope.branchReq2,
				"reliefFundMember" : $scope.reliefFundMember,
				"unionName" : $scope.unionName
		};

		$http({
        url: 'http://localhost:8080/union_data_srv/employee',
        dataType: 'json',
        method: 'POST',
        data: newEmployee,
        headers: {
            "Content-Type": "application/json"                 
        }
    }).success(function(response){
        $scope.response = response;
        $scope.showSuccessAlert = true;
        $scope.showErrorAlert = false;
        $scope.id = "";
		$scope.name = "";
		$scope.sex = "";
		$scope.branch = "";
		$scope.doj = "";
		$scope.dor = "";
		$scope.contact = "";
		$scope.address = "";
		$scope.branchReq1 = "";
		$scope.branchReq1 = "";
		$scope.branchReq2 = "";
		$scope.reliefFundMember = "";
		$scope.unionName = "";

    }).error(function(error){
        $scope.errorTextAlert = error;
        $scope.showErrorAlert = true;
        $scope.showSuccessAlert = false;
    });
	}

});

unionApp.controller('displayController', function($scope, $http, EmployeeData){
	$scope.message = "display";
	$scope.showSuccessAlert = false;
	$scope.showErrorAlert = false;
	$scope.idUpdated = {};
	$http.get('http://localhost:8080/union_data_srv/employee').
        then(function(response) {
            $scope.list_employees = response.data;
        });

    $scope.search_by_branch = function(branchName){
    	if ($scope.searchedBranch === undefined || $scope.searchedBranch === '') {
		$scope.search_url = 'http://localhost:8080/union_data_srv/employee';
    	}else{
    	$scope.search_url = 'http://localhost:8080/union_data_srv/employee/branch/' + $scope.searchedBranch;
   		 }
    	$http.get($scope.search_url).
    	then(function(response){
    		$scope.list_employees = response.data;
    		// alert("Filterd");
    	});
    }

    $scope.editClicked = function(oEvent, EmployeeData){
    	$scope.idUpdated  = oEvent.employeeID;
    	$scope.nameUpdated  = oEvent.name;
    	EmployeeData.setData(oEvent);

    }

    $scope.edit_employee = function(employeeForm){

    	var pp = $scope.idUpdated;
		var newEmployee = {
				"employeeID" : $scope.id,
				"name" : $scope.name,
				"sex" : $scope.sex,
				"branch" : $scope.branch,
				"branchID" : "000",
				"doj" : $scope.doj,
				"dor" : $scope.dor,
				"contact" : $scope.contact,
				"address" : $scope.address,
				"branchReq1" : $scope.branchReq1,
				"branchReq2" : $scope.branchReq1,
				"branchReq3" : $scope.branchReq2,
				"reliefFundMember" : $scope.reliefFundMember,
				"unionName" : $scope.unionName
		};

		$http({
        url: 'http://localhost:8080/union_data_srv/employee',
        dataType: 'json',
        method: 'PUT',
        data: newEmployee,
        headers: {
            "Content-Type": "application/json"                 
        }
    }).success(function(response){
        $scope.response = response;
        $scope.showUpdateSuccess = true;
        $scope.showUpdateError = false;
        $scope.id = "";
		$scope.name = "";
		$scope.sex = "";
		$scope.branch = "";
		$scope.doj = "";
		$scope.dor = "";
		$scope.contact = "";
		$scope.address = "";
		$scope.branchReq1 = "";
		$scope.branchReq1 = "";
		$scope.branchReq2 = "";
		$scope.reliefFundMember = "";
		$scope.unionName = "";

    }).error(function(error){
        $scope.errorTextAlert = error;
        $scope.showUpdateError = true;
        $scope.showUpdateSuccess = false;
    });
	}
});

unionApp.controller('updateController', function($scope, $http){

	

});