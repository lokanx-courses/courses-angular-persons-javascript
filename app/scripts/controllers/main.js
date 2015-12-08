'use strict';

/**
 * @ngdoc function
 * @name lab02App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lab02App
 */
angular.module('lab02App')
  .controller('MainCtrl', function ($scope, $window, PersonDirectoryService) {
        $scope.personDirectory = [];

    var persistPersonDirectory = function() {
        if (!$scope.disableStorage) {
            PersonDirectoryService.persistPersonDirectory($scope.personDirectory);
        }
    };
    var loadPersonDirectory = function () {
        if (!$scope.disableStorage) {
                    PersonDirectoryService.loadPersonDirectory(function(data) {
            $scope.personDirectory = data;
        });

        }
    }

    loadPersonDirectory();
    $scope.isAddFormVisible = false;
    $scope.name = '';
    $scope.email = '';
    $scope.city = '';
    $scope.sortByField = 'name';

    $scope.confirmAction = function(msg) {
        return $window.confirm(msg);
    };

    $scope.displayAlert = function(msg) {
        $window.alert(msg);
    };

    $scope.removePerson = function(person) {
        var index = $scope.personDirectory.indexOf(person);
        if (index > -1) {
            if ($scope.confirmAction('Are you sure?')) {
                $scope.personDirectory.splice(index, 1);
                persistPersonDirectory();
            }
        }
    };

    var findPerson = function(id) {
        var i;
        for(i = 0; i < $scope.personDirectory.length; i++) {
            if ($scope.personDirectory[i].id === id) {
                return $scope.personDirectory[i];
            }
        }

        return null;
    };

    var doPersonExist = function(id, name, email, city) {
        var i;
        var foundId = null;
        for(i = 0; i < $scope.personDirectory.length; i++) {
            if ($scope.personDirectory[i].name === name  &&
                $scope.personDirectory[i].email === email  &&
                $scope.personDirectory[i].city === city) {
                if ($scope.personDirectory[i].id !== id) {
                    foundId = $scope.personDirectory[i].id;
                }
            }
        }

        return foundId;
    };

    $scope.savePerson = function(id, name, email, city) {
        if (name === '' || typeof(name) === 'undefined' ||
            email === ''  ||  typeof(email) === 'undefined' ||
            city === ''  || typeof(city) === 'undefined') {
            return;
        }

        var existingId = doPersonExist(id, name, email, city);

        if (id === '') {
            if (existingId) {
                $scope.displayAlert('Person already exists in directory!');
                return;
            }
            $scope.personDirectory.push({'id': new Date().getTime(),'name':name, 'email':email,'city': city});
        } else {
            var p = findPerson(id);
            if (!p) {
                $scope.displayAlert('Fail locate person in directiry!');
                return;
            }
            if (existingId !== null  &&  id !== existingId) {
                $scope.displayAlert('Identical person already exists in directory!');
                return;
            }

            p.name = name;
            p.email = email;
            p.city = city;
        }
        persistPersonDirectory();
        $scope.personFilter = '';
        $scope.isAddFormVisible = false;
    };

    $scope.editPerson = function(person) {
        $scope.name = person.name;
        $scope.email = person.email;
        $scope.city = person.city;
        $scope.id = person.id;
        $scope.isAddFormVisible = true;
    };

    $scope.showAddForm = function() {
        $scope.id = '';
        $scope.name = '';
        $scope.email = '';
        $scope.city = '';
        $scope.isAddFormVisible = true;
    };

    $scope.cancelDialog = function() {
        $scope.isAddFormVisible = false;
    };
  });
