angular.module('soundapp').controller('SoundController', function($scope, SoundCloud, SoundCloudEmbedder) {
    SoundCloud.albums(function(albums) {
        albums.forEach(function(album) {
            SoundCloudEmbedder.tiny({ url: album.uri, color: "888888", maxwidth: 600, maxheight: 305 }, function (embedable) {
                $(".albums").append($("<div>").html(embedable.html));
            });
        });
    });
});
