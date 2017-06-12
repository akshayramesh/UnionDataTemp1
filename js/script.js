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
			controller : 'updateController'
		})
		.when('/displayFromDashboard',{
			templateUrl : 'display_unionEmployees.html',
			controller : 'displayFromDashboardController'
		});
});

unionApp.controller('dashboardController', function($scope, $http, $rootScope){
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
       
    $scope.dashboardButtonClicked = function(value){
    	$rootScope.selectedValue = value;
    }

    
    

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

unionApp.controller('displayController', function($scope, $http, $rootScope){
	$scope.message = "display";
	$scope.showSuccessAlert = false;
	$scope.showErrorAlert = false;
	$scope.idUpdated = {};
	$http.get('http://localhost:8080/union_data_srv/employee').
        then(function(response) {
            $scope.list_employees = response.data;
        });

    $scope.search_by_branch = function(branchName){
    	if ($scope.searchValue === undefined || $scope.searchValue === '') {
		$scope.search_url = 'http://localhost:8080/union_data_srv/employee';
    	}else{
    	$scope.search_url = 'http://localhost:8080/union_data_srv/employee/search/' + $scope.searchValue;
   		 }
    	$http.get($scope.search_url).
    	then(function(response){
    		$scope.list_employees = response.data;
    		// alert("Filterd");
    	});
    }

    $scope.editClicked = function(oEvent){
    	$rootScope.selectedEmployee  = oEvent;
    	$rootScope.selectedEmployee.doj = $rootScope.selectedEmployee.doj .toString();
    }

 
});

unionApp.controller('updateController', function($scope, $http, $rootScope){

	$scope.getDate = function(value){
		return value.toString();
	}

	$scope.editMode = function(){
		$("input").prop('disabled', true);
	}

	$scope.update_employee = function(oEvent){

	var newEmployee = {
				"employeeID" : $rootScope.selectedEmployee.employeeID,
				"name" : $rootScope.selectedEmployee.name,
				"sex" : $rootScope.selectedEmployee.sex,
				"branch" : $rootScope.selectedEmployee.branch,
				"branchID" : "000",
				"doj" : $rootScope.selectedEmployee.doj,
				"dor" : $rootScope.selectedEmployee.dor,
				"contact" : $rootScope.selectedEmployee.contact,
				"address" : $rootScope.selectedEmployee.address,
				"branchReq1" : $rootScope.selectedEmployee.branchReq1,
				"branchReq2" : $rootScope.selectedEmployee.branchReq2,
				"branchReq3" : $rootScope.selectedEmployee.branchReq3,
				"reliefFundMember" : $rootScope.selectedEmployee.reliefFundMember,
				"unionName" : $rootScope.selectedEmployee.unionName
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
        $rootScope.selectedEmployee = {};
        window.history.back();
        alert("Updated");

    }).error(function(error){
        $scope.errorTextAlert = error;

        $scope.showUpdateError = true;
        $scope.showUpdateSuccess = false;
    });

	}


	

});

unionApp.controller("displayFromDashboardController", function($scope, $http, $rootScope){
	$scope.selectedField = $rootScope.selectedValue;


	if($scope.selectedField === 'reliefFundMembers'){
		$scope.selectedField = "Relief Fund"
		$scope.search_url = 'http://localhost:8080/union_data_srv/employee/reliefFundMembers';
	}
	else {
		$scope.search_url = 'http://localhost:8080/union_data_srv/employee/union_employees/' + $scope.selectedField;
	}
	$http.get($scope.search_url).
    	then(function(response){
    		$scope.list_employees = response.data;
    		// alert("Filterd");
    	});

	 $scope.editClicked = function(oEvent){
    	$rootScope.selectedEmployee  = oEvent;
    	$rootScope.selectedEmployee.doj = $rootScope.selectedEmployee.doj .toString();
    }
});