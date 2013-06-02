'use strict';

angular.module('photoapp', ['flickrService', 'photoappDirectives', 'ng']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', { 
                templateUrl: 'partials/list.html', 
                controller: 'ListController',
                reloadOnSearch: false
            })
            .when('/set/:setId', {
                templateUrl: 'partials/list-set.html',
                controller: 'ListController',
                reloadOnSearch: false
            })
            .otherwise({ redirectTo: '/'});
    }]);
