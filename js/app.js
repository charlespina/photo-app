'use strict';

angular.module('soundapp', ['soundcloudService']) 
angular.module('photoapp', ['flickrService', 'utilDirectives']);
angular.module('siteapp',  ['photoapp', 'soundapp']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/sound', {
                templateUrl: 'partials/sound.html',
                controller: 'SoundController',
                reloadOnSearch: false
            })
            .when('/photos', { 
                templateUrl: 'partials/list.html', 
                controller: 'ListController',
                reloadOnSearch: false // prevents ?foo=bar url's from reloading controllers
            })
            .when('/photos/set/:setId', {
                templateUrl: 'partials/list-set.html',
                controller: 'ListController',
                reloadOnSearch: false
            })
            .otherwise({ redirectTo: '/'});
    }]);
