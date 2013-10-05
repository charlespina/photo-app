'use strict';

angular.module('photoapp', ['flickrService', 'soundcloudService', 'utilDirectives', 'photoappDirectives']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', { 
                templateUrl: 'partials/list.html', 
                controller: 'ListController',
                reloadOnSearch: false // prevents ?foo=bar url's from reloading controllers
            })
            .when('/set/:setId', {
                templateUrl: 'partials/list-set.html',
                controller: 'ListController',
                reloadOnSearch: false
            })
            .otherwise({ redirectTo: '/'});
    }]);
