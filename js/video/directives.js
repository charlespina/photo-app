angular.module('videoapp')
    .directive('vaEmbed', function(Vimeo) {
        return function(scope, element, attrs) {
            Vimeo.get({url:attrs.src}, function(data) {
                $(element).append($("<div>").html(data.html));
            });
        }
    });
