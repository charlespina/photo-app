angular.module('vimeoService', ['ngResource', 'config']).
    factory('Vimeo', function($resource, Config) {
        var oembed = $resource("http://vimeo.com/api/oembed.json", {},
            { 
                get: {
                    method: 'JSONP',
                    params: {
                        /* url required */
                        width: 640,
                        callback: 'JSON_CALLBACK',
                    },
                }
            });
        return oembed;
    });
