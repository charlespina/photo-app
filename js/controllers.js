function ListController($scope, $routeParams, $window, Flickr, PhotoEvents) {
    $scope.title = $routeParams.setId ? "" : "Photo Stream";
    //$scope.where = "photos";
    $scope.nextPage = 1;
    $scope.maxPages = 0;
    $scope.photos = [];
    $scope.sets = [];
    $scope.setId = $routeParams.setId;
    $scope.columnHeights = [0, 0, 0, 0];

    $scope.getBestImage = function(images, widthConstraint, heightConstraint) {
        // choose the first image that is larger than widthConstraint
        if (widthConstraint > 0) {
            for(var i=0; i<images.length; i++) {
                if(!images[i].url) continue; // skip images with no payload

                if(images[i].width >= widthConstraint) {
                    return images[i];
                }
            }
        }

        // or last image that is smaller than heightConstraint
        if (heightConstraint > 0) {
            var lastGoodImage;
            for(var i=0; i<images.length; i++) {
                if(!images[i].url) continue;

                if(images[i].height > heightConstraint ) {
                    break;
                }

                lastGoodImage = images[i];
            }

            if(lastGoodImage != undefined)
                return lastGoodImage;
        }

        // or the first image (tiny)
        return images[0];
    };

    $scope.calculateDimensions = function(oWidth, oHeight) {
        var nWidth = 240;
        var nHeight = (oWidth == 240) ? oHeight : Math.floor(oHeight * (nWidth/oWidth)) ;
        return { width: nWidth, height: nHeight };
    };

    $scope.getShortestColumn = function(imageHeight) {
        var shortestColumn = 0;
        var shortHeight = $scope.columnHeights[0];

        for(var i=0; i< $scope.columnHeights.length; i++) {
            if($scope.columnHeights[i] < shortHeight) {
                shortestColumn = i;
            }
        }

        return shortestColumn;
    };

    $scope.photoClick = function(photo) {
        if (!photo.bigImage) return;
        PhotoEvents.chosePhoto(photo);
    };

    $scope.sortImages = function(data) {
        var screenHeight = $($window).height();
        var response = data.photos || data.photoset;
        var photos = response.photo;
        for(var i=0; i<photos.length; i++) { 
            var choices = [
                { url: photos[i].url_s, height: photos[i].height_s, width: photos[i].width_s },
                { url: photos[i].url_n, height: photos[i].height_n, width: photos[i].width_n },
                { url: photos[i].url_m, height: photos[i].height_m, width: photos[i].width_m },
                { url: photos[i].url_z, height: photos[i].height_z, width: photos[i].width_z },
                { url: photos[i].url_c, height: photos[i].height_c, width: photos[i].width_c },
                { url: photos[i].url_l, height: photos[i].height_l, width: photos[i].width_l },
                { url: photos[i].url_o, height: photos[i].height_o, width: photos[i].width_o }
            ];

            var flickrId = photos[i].id;
            var thumbImage = $scope.getBestImage(choices, 240, 0);
            var bigImage = $scope.getBestImage(choices, 0, screenHeight);
            var dims = $scope.calculateDimensions(thumbImage.width, thumbImage.height);
            var shortestColumn = $scope.getShortestColumn(dims.height);

            $scope.columnHeights[shortestColumn] += parseInt(dims.height) + 40;
            var photo = {
                type: 'photo',
                column: shortestColumn+1, // columns 1-4, weird filter behavior prevents 0
                bigImage: bigImage,
                thumbImage: thumbImage,
                sizes: Flickr.sizesLink(flickrId),
                permalink: Flickr.photoLink(flickrId),
                dims: dims,
                flickrId: flickrId,
                index: $scope.photos.length
            };
            $scope.photos.push(photo);
        }

        PhotoEvents.photosChanged($scope.photos);
        $scope.fetchingImages = false;
        $scope.maxPages = response.pages;
        $scope.nextPage++;
    };

    $scope.loadMoreImages = function() {
        if ($scope.setId) return;

        var self = this;
        if (!self.loading) { // only load one page at a time
            var load = function() {
                Flickr.stream({ page: $scope.nextPage }, function(data) {
                    $scope.sortImages(data);
                    self.loading = false;
                });
            };

            self.loading = true;
            if (!$scope.$$phase) { // calling out of angular context requires an $apply, so $watch variables are treated properly
                $scope.$apply(load);
            } else {
                load();
            }
        }
    };

    function photoUrl(farm, server, id, secret) {
        return "http://farm"+farm+".staticflickr.com/"+server+"/"+id+"_"+secret+".jpg"
    }

    $scope.loadSet = function(setId) {
        Flickr.getPhotosetInfo({ photoset_id: setId }, function(data) {
            $scope.title = data.photoset.title._content;
        });

        Flickr.getPhotosetPhotos({ photoset_id: setId }, function(data) {
            $scope.sortImages(data);
        });
    };

    $scope.loadSets = function() {
        Flickr.getPhotosetList({}, function(data) {
            var count=0;
            for(var idx in data.photosets.photoset) {
                var set = data.photosets.photoset[idx];

                if (set.id == $scope.setId) continue;
                $scope.photos.push({
                    id: set.id,
                    type: 'set',
                    column: (count % 4)+1,
                    link: '#/set/'+set.id,
                    thumbImage: { url: photoUrl(set.farm, set.server, set.primary, set.secret) },
                    dims: { height: 240, 
                            width: 240 },
                    title: set.title._content
                });
                count++;
            }
        });
    };

    if ($scope.setId) {
        $scope.loadSet($scope.setId);
        $scope.loadSets();
    } else {
        $scope.loadSets();
        $scope.loadMoreImages();
    }
}

function ViewerController($scope, PhotoEvents) {
    $scope.metadataVisible = false;
    $scope.visible = false;
    $scope.photos = [];

    $scope.$on('chosePhoto', function(e, photo) {
        $scope.viewPhoto(photo);
    });

    $scope.$on('photosChanged', function(e, photos) {
        $scope.photos = photos;
    });

    $scope.viewPhoto = function(photo) {
        $scope.photo = photo;
        $scope.metadata = [];
        $scope.loading = true;
        $scope.image = photo.bigImage.url;

        // the viewer should be placed relative to the top of the current
        // visible screen area, so user's place on page isn't lost by jumping
        // around 
        $scope.viewerStyle = {
            "margin-top": $(window).scrollTop() + 50
        };

        // load the image asynchronously (this img is never embedded on the page)
        var img = new Image();
        $(img).load(function() {
            $scope.$apply(function() {
                $scope.loading = false;

                // fade in the new image
                $scope.imageAnimatedStyle = {
                    setup: { opacity: 0 },
                    animate: { opacity: 1 }
                };

                // resize the viewer
                $scope.viewerAnimatedStyle = {
                    height: photo.bigImage.height,
                    width: photo.bigImage.width,
                };
            });
        }).attr("src", $scope.image);

        $scope.visible = true;
    };

    $scope.hideViewer = function() {
        $scope.visible = false;
    };

    $scope.toggleMetadata = function() {
        $scope.metadataVisible = !$scope.metadataVisible;
    };

    $scope.nextImage = function() {
        $scope.gotoIndex($scope.photo.index + 1);
    }
    
    $scope.previousImage = function() {
        $scope.gotoIndex($scope.photo.index - 1);
    }

    $scope.gotoIndex = function(index) {
        if (0 < index && index < $scope.photos.length 
            && $scope.photos[index].bigImage)
        {
            $scope.viewPhoto($scope.photos[index]);
        } else {
            $scope.hideViewer();
        }
    }
}

function InfoController($scope, $location) {
    $scope.shouldShowBackButton = false;
    $scope.$watch(function() {return $location.path()}, function(path) {
        $scope.shouldShowBackButton = path != "/";
    });
};

angular.module('photoapp')
    .factory('PhotoEvents', function ($rootScope) {
        var service = {};
        service.photosChanged = function(photos) {
            $rootScope.$broadcast('photosChanged', photos);
        };

        service.chosePhoto = function(photo) {
            $rootScope.$broadcast('chosePhoto', photo);
        };

        return service;
    });
