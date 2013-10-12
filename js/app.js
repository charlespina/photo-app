'use strict';

angular.module('videoapp', ['vimeoService']);
angular.module('soundapp', ['soundcloudService']);
angular.module('photoapp', ['flickrService', 'utilDirectives']);
angular.module('siteapp',  ['photoapp', 'soundapp', 'videoapp']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/video', {
                templateUrl: 'partials/video.html'
            })
            .when('/sound', {
                templateUrl: 'partials/sound.html',
                controller: 'SoundController',
            })
            .when('/photos', { 
                templateUrl: 'partials/list.html', 
                controller: 'ListController',
                // reloadOnSearch: false // prevents ?foo=bar url's from reloading controllers
            })
            .when('/photos/set/:setId', {
                templateUrl: 'partials/list-set.html',
                controller: 'ListController',
            })
            .otherwise({ redirectTo: '/'});
    }]);
