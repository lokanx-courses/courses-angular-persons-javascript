'use strict';

/**
 * @ngdoc directive
 * @name myApp.directive:modalDialog
 * @description
 * # modalDialog
 */
angular.module('myApp')
    .directive('modalDialog', function () {
        return {
            restrict: 'E',
            scope: {
                show: '='
            },
            replace: true, // Replace with the template below
            transclude: true, // we want to insert custom content inside the directive
            link: function (scope, element, attrs) {
                scope.dialogStyle = {};
                if (attrs.width) {
                    scope.dialogStyle.width = attrs.width;
                }
                if (attrs.height) {
                    scope.dialogStyle.height = attrs.height;
                }
                scope.hideModal = function () {
                    scope.show = false;
                };
            },
            templateUrl: 'scripts/directives/modalDialog.html' // See below
        };
    });
