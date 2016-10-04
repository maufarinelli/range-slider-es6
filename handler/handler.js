import angular from 'angular';
import PositionDisplay from '../position-display/position-display';

export class Handler {
    constructor($element, $timeout) {
        this.$timeout = $timeout;
        this.element = $element;

        this.onDragChange();
        this.onDragEnd();
    }

    onDragChange() {
        this.element.on('drag', event => {
            console.log('DRAG : ', event);
            this.newPosition = event.clientX;

            this.$timeout(() => {
                this.dragChange({
                    newPosition: this.newPosition
                });
            });
        });
    }

    onDragEnd() {
        this.element.on('dragend', event => {
            this.newPosition = event.clientX;

            this.$timeout(() => {
                this.dragChange({
                    newPosition: this.newPosition
                });
            });
        });
    }

    $onChanges(change) {
        if(change.position && change.position.currentValue !== change.position.previousValue) {
            this.element.css('left', this.position + 'px');
            this.value = this.position * this.scale;
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
            scale: '<',
            side: '<',
            dragEnd: '&',
            dragChange: '&'
        }
    });