angular.module('soundcloudService', ['ngResource']).
    factory('SoundCloud', function($resource) {
        var clientId = "8d8fb5c7c78345fe3ce7a24cd996596e";
        var artist = "charles-pina";
        var soundcloud = $resource('http://api.soundcloud.com/users/:artist/:endpoint.:format', {
                client_id: clientId,
                artist: artist,
            },
            {
                albums : {
                    method: 'GET',
                    params: {
                        endpoint: "playlists",
                        format: "json"
                    },
                    isArray: true
                }
            });

        return soundcloud;
    }).
    factory('SoundCloudEmbedder', function($resource) {
        var embedder = $resource("http://soundcloud.com/oembed", {},
            {
                tiny : {
                    method: "GET",
                    params: {
                        format: "json",
                        player_type: "tiny",
                        iframe: false
                        // color
                        // maxwidth / maxheight
                        // url
                    }
                },
                artwork : {
                    method: "GET",
                    params: {
                        format: "json",
                        player_type: "artwork",
                        iframe: false,
                        width: 300,
                        height: 300
                    }
                }
            }
        );

        return embedder;
    });
    
