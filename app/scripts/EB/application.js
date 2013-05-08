'use strict';

var EB = EB || {};
EB.util.namespace('application');

EB.application = (function () {


    var handleLinks = function () {
        $('#banner a').on('click', function () {
            var $clicked = $(this);

            console.log('clicked', $clicked.attr('href'), $clicked);

            if (!$clicked.hasClass('noPush')) {
                EB.App.Router.navigate($clicked.attr('href'), true);
                return false;
            }
        });
    };


    var checkAllContentLoaded = function () {
        var allContentLoaded = true,
                $loader = $('#page_loading');

        console.log('checking if all content is loaded');

        $('.section-page').each(function () {
            var $section = $(this);
            if (!$('.section-inner', $section).length) {
                allContentLoaded = false;
            }
        });
        if (allContentLoaded) {
            $('.box', $loader).fadeOut('fast', function () {
                $loader.fadeOut('fast', function() {
                    EB.App.Router.scrollToView(Backbone.history.fragment.replace(/\//g, ''));
                });
            });
        }
    };


    var load = function () {
        EB.App.Router = new EB.Router();
        Backbone.history.start({pushState: true});
        handleLinks();
    };


    return {
        load: load,
        checkAllContentLoaded: checkAllContentLoaded
    };


})();