app.controller('leaderboardController', ['$scope', function($scope) {
	$scope.leaders = [
		{
			name: 'Person 1',
			points: 10,
			class: ''
		},
		{
			name: 'Person 2',
			points: 12,
			class: ''
		},
		{
			name: 'Person 3',
			points: 6,
			class: ''
		}
	];
	$scope.sort = function() {
		$scope.leaders.sort(function(a, b) {
			return b.points - a.points
		});
	};
	$scope.sort();
	$scope.setActive = function() {
		$scope.leaders[0].class = 'active';
	}
	$scope.setActive();
}]);