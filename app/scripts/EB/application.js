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


    var load = function () {
        EB.App.Router = new EB.Router();
        Backbone.history.start({pushState: true});
        handleLinks();
    };


    return {
        load: load
    };


})();