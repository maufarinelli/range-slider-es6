import angular from 'angular';
import _ from 'lodash';
import Segment from '../segment/segment';
import SegmentBackground from '../segment-background/segment-background';
import Handler from '../handler/handler';

export class SegmentFactory {
    constructor(min, max, scale) {
        return {
            id: 1,
            width: (max / scale),
            posLeft: (min / scale),
            posRight: (max / scale),
            scale: scale
        };
    }
}

export class RangeSlider {
    constructor() {
        this.segment = new SegmentFactory(this.min, this.max, this.scale);
        this.initialMin = this.min / this.scale;
        this.initialMax = this.max / this.scale;
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
        if(change.side === 'left' && this.initialMin < change.newPosition) {
            this.segment.posLeft = change.newPosition;
        }
        else if(change.side === 'right' && this.initialMax > change.newPosition) {
            this.segment.posRight = change.newPosition;
        }

        this.segment.width = this.segment.posRight - this.segment.posLeft;
    }
}

angular.module('rangeSliderModule', [
    'segmentBackground',
    'segment',
    'handler'
])
    .component('rangeSlider', {
        controller: RangeSlider,
        controllerAs: 'rangeSlider',
        templateUrl: 'range-slider/range-slider.html',
        bindings: {
            min: '<',
            max: '<',
            scale: '<'
        }
    });