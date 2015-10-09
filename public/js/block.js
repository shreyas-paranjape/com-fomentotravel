/*global $:false */
$(document).ready(function () {
  //  'use strict';

    var fader = function () {
        var that = $(this),
            clone = that.clone(),
            offset = that.offset(),
            blockOneOffset = $('.block').first().offset(),
            blocks = that.parent().parent().parent();
        $('.block')
            .unbind('click')
            .not(clone)
            .animate({
                opacity: 0
            }, 400, 'swing', function () {});
        $('footer').animate({
            opacity: 0
        }, 0);
        clone
            .addClass('clone')
            .css({
                'top': offset.top,
                'left': offset.left,
                width: that.width()
            })
            .bind('click', function () {})
            .prependTo(blocks)
            .animate({
                    top: blockOneOffset.top,
                    left: blockOneOffset.left,
                    width: blocks.width()
                }, 1000, 'swing',
                function () {
                    var contentMore = $('.content-more', clone);
                    contentMore.load(contentMore.attr('href'));
                    contentMore.toggle();
                    contentMore.animate({
                        opacity: 1
                    }, 100, 'swing');
                    $('.content', clone).remove();
                    $('.fadout', clone).toggle();
                });
        $('.content', clone).animate({
            opacity: 0
        }, 600, 'swing', function () {});
        $('.fadout', clone).bind('click', function () {
            $('.fadout', clone).toggle();
            $('footer').animate({
                opacity: 1
            }, 0);
            $('.overlay-content', clone).toggle();
            $('.block').not(clone).bind('click', fader);
            clone.animate({
                top: offset.top,
                left: offset.left,
                width: that.width(),
                height: that.height()
            }, 800, 'swing', function () {
                clone.remove();
            });
            $('.block').not(clone).animate({
                opacity: 1
            }, 1000, 'swing', function () {});
            $('.content-more', clone).animate({
                opacity: 0
            }, 1000, 'swing');
        });
    };
    $('.block').bind('click', fader);
});
