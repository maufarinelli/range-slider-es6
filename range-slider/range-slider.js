import angular from 'angular';
import _ from 'lodash';
import Segment from '../segment/segment';
import Handler from '../handler/handler';

export class SegmentFactory {
    constructor() {
        return {
            id: 1,
            width: 400,
            posLeft: 0,
            posRight: 400,
            scale: 5
        };
    }
}

export class RangeSlider {
    constructor() {
        this.segment = new SegmentFactory();
    }

    allowDrop(event) {
        event.preventDefault();
    }

    getSegment() {
        return this.segment;
    }

    getWidth(segment) {
        return segment.width;
    }

    getHandlerPosition(side) {
        if(side === 'left') {
            return this.segment.posLeft;
        }
        else if (side === 'right') {
            return this.segment.posRight;
        }
    }

    handleDragEnd(change) {
        console.log('change : ', change);

        if(change.side === 'left') {
            this.segment.posLeft = change.newPosition;
        }
        else if(change.side === 'right') {
            this.segment.posRight = change.newPosition;
        }

        this.segment.width = this.segment.posRight - this.segment.posLeft;
    }
}

angular.module('rangeSliderModule', [
    'segment',
    'handler'
])
    .component('rangeSlider', {
        controller: RangeSlider,
        controllerAs: 'rangeSlider',
        templateUrl: 'range-slider/range-slider.html'
    });