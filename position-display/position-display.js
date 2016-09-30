import angular from 'angular';

export class PositionDisplay {

}

angular.module('positionDisplay', [])
	.component('positionDisplay', {
		controller: PositionDisplay,
		controllerAs: 'positionDisplay',
		templateUrl: 'position-display/position-display.html',
		bindings: {
			position: '<',
			side: '<'
		}
	});