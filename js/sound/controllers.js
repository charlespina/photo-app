angular.module('soundapp').controller('SoundController', function($scope, SoundCloud, SoundCloudEmbedder) {
    SoundCloud.albums(function(albums) {
        $scope.albums = albums;
        albums.forEach(function(album) {
            SoundCloudEmbedder.default({ url: album.uri, color: "333333", maxwidth: 1180, maxheight: 305 }, function (embedable) {
                $("#embed-"+album.id).html(embedable.html);
            });
        });
    });
});
