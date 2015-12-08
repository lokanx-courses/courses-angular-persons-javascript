'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('myApp'));

    var MainCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        scope.confirmAction = function (msg) {
            console.log(msg);
        };
        scope.disableStorage = true;
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));

    it('test savePerson', function () {
        scope.personDirectory = [];
        scope.savePerson('', 'John Doe', 'john.doe@nobody.com', 'Nowhere');
        expect(scope.personDirectory.length).toBe(1);
    });

    it('test deletePerson', function () {
        scope.personDirectory = [
            {
                'id': 0,
                'name': 'Donkey Kong',
                'email': 'monkey@zoo.com',
                'city': 'New York'
            },
            {
                'id': 1,
                'name': 'Kalle Anka',
                'email': 'kalle.anka@disney.com',
                'city': 'Ankeborg'
            },
            {
                'id': 2,
                'name': 'Björn Sjögren',
                'email': 'bjorn.sjogren@hiq.se',
                'city': 'Stockholm'
            }
            ];
        scope.confirmAction = function (msg) {
            expect(msg).toBe('Are you sure?');
            return true;
        };
        scope.removePerson(scope.personDirectory[1]);
        expect(scope.personDirectory.length).toBe(2);
    });

    it('test deletePerson confirm abort', function () {
        scope.personDirectory = [
            {
                'id': 0,
                'name': 'Donkey Kong',
                'email': 'monkey@zoo.com',
                'city': 'New York'
            },
            {
                'id': 1,
                'name': 'Kalle Anka',
                'email': 'kalle.anka@disney.com',
                'city': 'Ankeborg'
            },
            {
                'id': 2,
                'name': 'Björn Sjögren',
                'email': 'bjorn.sjogren@hiq.se',
                'city': 'Stockholm'
            }
            ];
        scope.confirmAction = function (msg) {
            expect(msg).toBe('Are you sure?');
            return false;
        };
        scope.removePerson(scope.personDirectory[1]);
        expect(scope.personDirectory.length).toBe(3);
    });

});
