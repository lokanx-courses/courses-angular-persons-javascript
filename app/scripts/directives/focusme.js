'use strict';

/**
 * @ngdoc directive
 * @name myApp.directive:focusMe
 * @description
 * # focusMe
 */
angular.module('myApp')
    .directive('focusMe', function ($timeout) {
        return {
            link: function (scope, element, attrs) {
                scope.$watch(attrs.focusMe, function (value) {
                    if (value === true) {

                        $timeout(function () {
                            element[0].focus();
                        });
                    }
                });
            }
        };
    });
