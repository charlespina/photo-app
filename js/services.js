angular.module('flickrService', ['ngResource']).
    factory('Flickr', function($resource) {
        var userId = "63533647@N05";
        var flickr = $resource('http://api.flickr.com/services/rest/', { 
            user_id: userId,
            api_key: "163b09ce67a3c84a8aef760016ea26f6",
            format: "json",
            nojsoncallback: 1
        }, 
        {
            stream : {
                method: 'GET',
                params: {
                    method: "flickr.people.getPublicPhotos",
                    extras: "url_s,url_q,url_m,url_n,url_z,url_c,url_l,url_o",
                    page: 0
                },
                isArray: false
            },
            getPhotosetInfo : {
                method: 'GET',
                params: {
                    method: "flickr.photosets.getInfo"
                },
                isArray: false
            },
            getPhotosetPhotos : {
                method: 'GET',
                params: {
                    method: "flickr.photosets.getPhotos",
                    extras: "url_s,url_q,url_m,url_n,url_z,url_c,url_l,url_o",
                    // photoset_id: 
                },
                isArray: false
            },
            getPhotosetList : {
                method: 'GET',
                params: {
                    method: 'flickr.photosets.getList'
                },
                isArray: false
            }
        });

        flickr.photoLink = function(flickrId) {
            return "http://flickr.com/photos/"+userId+"/"+flickrId;
        };

        flickr.sizesLink = function(flickrId) {
            return "http://flickr.com/photos/"+userId+"/"+flickrId+"/sizes/l/";
        };

        return flickr;
    });
