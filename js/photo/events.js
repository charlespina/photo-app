angular.module('photoapp')
    .factory('PhotoEvents', function ($rootScope) {
        var service = {};
        service.photosChanged = function(photos) {
            $rootScope.$broadcast('photosChanged', photos);
        };

        service.chosePhoto = function(photo) {
            $rootScope.$broadcast('chosePhoto', photo);
        };

        service.changedPhoto = function(photo) {
            $rootScope.$broadcast('changedPhoto', photo);
        };

        return service;
    });
