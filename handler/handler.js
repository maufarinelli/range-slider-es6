import angular from 'angular';

export class Handler {
    newPosition;
    $timeout;

    constructor($element, $timeout) {
        this.$timeout = $timeout;
        this.element = $element;

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

angular.module('handler', [])
    .component('handler', {
        controller: Handler,
        controllerAs: 'handler',
        templateUrl: 'handler/handler.html',
        bindings: {
            position: '<',
            dragEnd: '&'
        }
    });