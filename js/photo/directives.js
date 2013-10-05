angular.module('photoappDirectives', [])
    .directive('paPhoto', function() {
        // load the photo partial, replacing <pa-photo> element
        return {
            templateUrl: 'partials/photo.html',
            restrict: 'E',
            replace: true
        };
    });
