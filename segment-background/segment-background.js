import angular from 'angular';

export class SegmentBackground {
	constructor($element) {
		this.$element = $element;
		this.adjustSegmentPosition = 12;
	}

	$onChanges(change) {
		if(change.initialMin && change.initialMax) {
			this.$element.css('width', change.initialMax.currentValue - change.initialMin.currentValue + 'px');
			this.$element.css('background', 'repeating-linear-gradient(to right, #fbfbfb, #fbfbfb 1px, #f3f3f3 1px, #f3f3f3 10px');
			this.$element.css('transform',  'translateX(' + (this.position + this.adjustSegmentPosition) + 'px)');
		}
	}
}

angular.module('segmentBackground', [])
	.component('segmentBackground', {
		controller: SegmentBackground,
		controllerAs: 'segmentBackground',
		bindings: {
			position: '<',
			initialMin: '<',
			initialMax: '<'
		}
	});