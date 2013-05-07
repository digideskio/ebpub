'use strict';

var EB = EB || {};
EB.util.namespace('Router');

EB.Router = Backbone.Router.extend({

    initialize: function () {
        console.log('initialising the router');
        this.Views = {};
        this.loadContent();
    },

    routes: {
        '':                     'pageHome',
        'about(/)':             'pageAbout',
        'contact(/)':           'pageContact',
        'work(/)':              'pageWork',
        '*fallback':            'fallbackHandler'
    },

    pageHome: function () {
        console.log('load the home page content');
        this.scrollToView('home');
    },

    pageAbout: function () {
        console.log('load the about page content');
        this.scrollToView('about');
    },

    pageContact: function () {
        console.log('load the contact page content');
        this.scrollToView('contact');
    },

    pageWork: function () {
        console.log('load the work page content');
        this.scrollToView('work');
    },

    fallbackHandler: function (splat) {
        console.log('falling back with', splat);
    },

    loadContent: function () {
        var thisRouter = this;

        $('.section-page').each(function () {
            var $section = $(this);
            if (!$('.section-inner', $section).length) {
                $section.load('/content/' + $section.data('content_file') + '.html', function () {
                    thisRouter.createView($section.attr('id'));
                });
            } else {
                thisRouter.createView($section.attr('id'));
            }
        });
    },

    createView: function (id) {
        var thisRouter = this;
        console.log('creating view for ', id);
        
        this.Views[id] = new EB.View({
            el: 'section#' + id
        });
        this.Views[id].on('loaded', function () {
            console.log('loaded triggered for', id);
            thisRouter.checkAllContentLoaded();
        });
    },

    scrollToView: function (id) {
        _.delay(function () {
            var targetOffset = $('#' + id).offset().top;
            console.log('scroll to ', id);
            $('html:not(:animated),body:not(:animated)').animate({scrollTop: targetOffset}, 350);
        }, 300);
    }



});