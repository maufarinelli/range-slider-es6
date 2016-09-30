import angular from 'angular';
import PositionDisplay from '../position-display/position-display';

export class Handler {
    newPosition;
    $timeout;

    constructor($element, $timeout) {
        this.$timeout = $timeout;
        this.element = $element;

        console.log(this);

        this.onDragEnd();
    }

    onDragEnd() {
        this.element.on('dragend', event => {
            this.newPosition = event.clientX;

            this.$timeout(() => {
                this.dragEnd({
                    newPosition: this.newPosition
                });
            });
        });
    }

    $onChanges(change) {
        if(change.position && change.position.currentValue !== change.position.previousValue) {
            this.element.css('left', this.position + 'px');
        }
    }
}

angular.module('handler', ['positionDisplay'])
    .component('handler', {
        controller: Handler,
        controllerAs: 'handler',
        templateUrl: 'handler/handler.html',
        bindings: {
            position: '<',
            side: '<',
            dragEnd: '&'
        }
    });