import angular from 'angular';

export class Segment {
    constructor($element) {
        this.$element = $element;
        this.adjustSegmentPosition = 12;
    }

    $onChanges(change) {
        if(change.width && change.width.currentValue !== change.width.previousValue) {
            this.$element.css('width', change.width.currentValue + 'px');
            this.$element.css('transform', 'translateX(' + (this.position + this.adjustSegmentPosition) + 'px)');
        }
    }
}


angular.module('segment', [])
    .component('segment', {
        controller: Segment,
        controllerAs: 'segmentCtrl',
        templateUrl: 'segment/segment.html',
        bindings: {
            segment: '<',
            width: '<',
            position: '<'
        }
    });