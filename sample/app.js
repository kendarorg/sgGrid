var myApp = angular.module('myApp',['sgGrid']);



myApp.controller('myController',['$scope','$q',function($scope,$q){
	$scope.fakeData = [];
		
	for(var i=0;i<111;i++){
		var lastName = Math.floor(i/20);
		$scope.fakeData.push({
			id: i, 
			first_name: 'First'+i, 
			last_name: 'Last'+lastName
		})
	}
	$scope.data = [];
	$scope.pageSize = 10;
	$scope.maxPages = 10;
	$scope.totalCount = 0;
	$scope.currentPage = 0;
	$scope.buttons = [];
	
	//Simulate the http get
	var httpGet = function(requiredPage,start,count){
		return $q(function(resolve, reject) {
			setTimeout(function() {
				var start = requiredPage*$scope.pageSize;
				var end = requiredPage*$scope.pageSize+$scope.pageSize+1;
				var data = $scope.fakeData.slice(start,end);
				resolve(data);
			}, 100);
	  });
	}
	
	var getListCount = function(){
		return $scope.fakeData.length;
	}
	
	$scope.loadData = function(requiredPage){
		//Sanity check
		if(!requiredPage){
			requiredPage = 0;
		}
		
		//Getting the address
		httpGet(requiredPage,$scope.pageSize,$scope.pageSize+1)
			.then(function(data){
				$scope.hasNext = data.length > $scope.pageSize;
				if($scope.hasNext){
					data = data.splice(0,$scope.pageSize);
				}
				//If has a count
				listTotal = getListCount();
				
				$scope.currentPage = requiredPage;
				$scope.listTotal = listTotal;
				$scope.data = data;
			});
		}
	$scope.show = function(customer){
		alert('Clicked Customer '+customer.id)
	}
	$scope.loadData();
}]);


myApp.controller('myControllerProgressive',['$scope','$q',function($scope,$q){
	$scope.fakeData = [];
	
	for(var i=0;i<111;i++){
		var lastName = Math.floor(i/20);
		$scope.fakeData.push({
			id: i, 
			first_name: 'First'+i, 
			last_name: 'Last'+lastName
		})
	}
	$scope.data = [];
	$scope.pageSize = 10;
	$scope.maxPages = 10;
	$scope.totalCount = 0;
	$scope.currentPage = 0;
	$scope.buttons = [];
	
	//Simulate the http get
	var httpGet = function(requiredPage,start,count){
		return $q(function(resolve, reject) {
			setTimeout(function() {
				var start = requiredPage*$scope.pageSize;
				var end = requiredPage*$scope.pageSize+$scope.pageSize+1;
				var data = $scope.fakeData.slice(start,end);
				resolve(data);
			}, 100);
	  });
	}
		
	$scope.loadData = function(requiredPage){
			//Sanity check
			if(!requiredPage){
				requiredPage = 0;
			}
			
			//Getting the address
			httpGet(requiredPage,$scope.pageSize,$scope.pageSize+1)
				.then(function(data){
					$scope.hasNext = data.length > $scope.pageSize;
					if($scope.hasNext){
						data = data.splice(0,$scope.pageSize);
					}
					//If has not count
					listTotal =  $scope.pageSize*(requiredPage+1) + ($scope.hasNext?1:0);
					
					$scope.currentPage = requiredPage;
					$scope.listTotal = listTotal;
					$scope.data = data;
				});
		}
	$scope.show = function(customer){
		alert('Clicked Customer '+customer.id)
	}
	$scope.loadData();
}]);