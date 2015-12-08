'use strict';

/**
 * @ngdoc service
 * @name lab02App.PersonDirectoryService
 * @description
 * # PersonDirectoryService
 * Service in the lab02App.
 */
angular.module('lab02App')
  .service('PersonDirectoryService', function ($window) {
    var persistPersonDirectory = function(personDirectory) {
        if(typeof($window.localStorage) !== 'undefined') {
            $window.localStorage.setItem('personDirectory', angular.toJson(personDirectory));
        }
    };

    var loadPersonDirectory = function (callback) {
        var data;
        if(typeof($window.localStorage) !== 'undefined') {
            var pd = $window.localStorage.getItem('personDirectory');
            data = angular.fromJson(pd);
        } else {
            data = [
                {'id': 0, 'name':'Donkey Kong', 'email':'monkey@zoo.com','city': 'New York'},
                {'id': 1, 'name':'Kalle Anka', 'email':'kalle.anka@disney.com','city': 'Ankeborg'},
                {'id': 2, 'name':'Björn Sjögren', 'email':'bjorn.sjogren@hiq.se','city': 'Stockholm'}
            ];
        }

        callback(data);
    };

    return {
        'persistPersonDirectory': persistPersonDirectory,
        'loadPersonDirectory': loadPersonDirectory
    };
});
