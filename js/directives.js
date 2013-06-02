angular.module('photoappDirectives', [])
    .directive('paPhoto', function() {
        // load the photo partial, replacing <pa-photo> element
        return {
            templateUrl: 'partials/photo.html',
            restrict: 'E',
            replace: true
        };
    })
    .directive('paMetadata', function() {
        return {
            template: '<span><dt>{{ name }}</dt><dd>{{ value }}</dd></span>',
            restrict: 'E',
            replace: true,
            scope: {
                name: '@name',
                value: '@value'
            }
        };
    })
    .directive('paAnimate', function() {
        // animate to a given css state (JSON css attributes)
        // optionally, use the following form to set a starting state
        // before animating to the animate state.
        // {    
        //      setup: {
        //          /*css attributes*/ 
        //      }, 
        //      animate: {
        //          /* css attributes*/ 
        //      }   
        //  } 
        return function(scope, element, attrs) {
            scope.$watch(attrs.paAnimate, function() {
                var anim = scope.$eval(attrs.paAnimate);
                var target;
                if( anim && anim.setup ) {
                    $(element).css(anim.setup);
                    target = anim.animate;
                } else {
                    target = anim;
                }

                $(element).animate(target, 500, function() { });
            });
        };
    })
    .directive('paScroll', function($window) {
        // call the code specified in the pa-scroll attribute when scrolling
        // to the bottom of the page.
        return function(scope, element, attrs) {
            $window = angular.element($window);
            var handleScroll = function() {
                if ($window.height() > ($(document).height() - $window.height() - $window.scrollTop())) 
                    scope.$eval(attrs.paScroll);
            };
            $window.on('scroll', handleScroll);
        }
    });
