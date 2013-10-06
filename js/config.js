angular.module('config', []).
    factory('Config', function() {
        return {
            Flickr : {
                user_id: "63533647@N05",
                api_key: "163b09ce67a3c84a8aef760016ea26f6"
            },
            SoundCloud : {
                client_id: "8d8fb5c7c78345fe3ce7a24cd996596e",
                user: "charles-pina"
            }
        };
    });
