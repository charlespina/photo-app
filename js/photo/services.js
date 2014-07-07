angular.module('flickrService', ['ngResource', 'config']).
    factory('Flickr', function($resource, Config) {
        var flickr = $resource('https://api.flickr.com/services/rest/', { 
            user_id: Config.Flickr.user_id,
            api_key: Config.Flickr.api_key,
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
            getPhotoMetadata : {
                method: 'GET',
                params: {
                    method: "flickr.photos.getExif"
                    // photo_id:
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
            return "https://flickr.com/photos/"+Config.Flickr.user_id+"/"+flickrId;
        };

        flickr.sizesLink = function(flickrId) {
            return "https://flickr.com/photos/"+Config.Flickr.user_id+"/"+flickrId+"/sizes/l/";
        };

        return flickr;
    });
