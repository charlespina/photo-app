angular.module('soundcloudService', ['ngResource']).
    factory('SoundCloud', function($resource) {
        var clientId = "1234";
        var artist = "charles-pina";
        var soundcloud = $resource('https://api.soundcloud.com/', {
                client: clientId
            },
            {
                albums : {
                    method: 'GET',
                    params: {
                    }
                }
            });
    });
