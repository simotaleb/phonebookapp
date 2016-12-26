var myApp = angular.module('myApp',[]);
myApp.controller('AppControl',['$scope','$http', function($scope,$http){

//refreshing action on data
	var refresh = function(){
		$http.get('/contactlist').then(function(response) {
		$scope.contactlist = response.data;
		$scope.contact = null;
		});
	}
	
	refresh();

	$scope.addContact = function(){
		$http.post('/contactlist', $scope.contact).then(function(response) {
			refresh();
		});
	};
	
	$scope.removeContact = function(id){
		$http.delete('/contactlist/' + id).then(function(response) {
			refresh();
		});

	};
	$scope.editContact = function(id){
		$http.get('/contactlist/'+id).then(function(response) {
			$scope.contact = response.data;
		});
	};

	$scope.updateContact = function(){
		$http.put('/contactlist/'+$scope.contact._id, $scope.contact).then(function(response){
			refresh();
		});
	};
}]);