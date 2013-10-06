angular.module('soundcloudService', ['ngResource', 'config']).
    factory('SoundCloud', function($resource, Config) {
        var soundcloud = $resource('http://api.soundcloud.com/users/:user/:endpoint.:format', {
                client_id: Config.SoundCloud.client_id,
                user: Config.SoundCloud.user,
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
    
