angular.module('utilDirectives', [])
    .directive('utilAnimate', function() {
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
            scope.$watch(attrs.utilAnimate, function() {
                var anim = scope.$eval(attrs.utilAnimate);
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
    .directive('utilScroll', function($window, $document) {
        // call the code specified in the pa-scroll attribute when scrolling
        // to the bottom of the page.
        return function(scope, element, attrs) {
            $window = angular.element($window);
            var handleScroll = function() {
                if ($window.height() > ($document.height() - $window.height() - $window.scrollTop())) 
                    scope.$eval(attrs.utilScroll);
            };
            $window.on('scroll', handleScroll);
        }
    })
    .directive('utilDraggable', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $(element).draggable();
            }
        };
    });
