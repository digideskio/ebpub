'use strict';

var EB = EB || {};
EB.util.namespace('Router');

EB.Router = Backbone.Router.extend({

    initialize: function () {
        console.log('initialising the router');
        this.loadContent();
    },

    routes: {
        '':                     'pageHome',
        'about':                'pageAbout',
        'contact':              'pageContact',
        'work':                 'pageWork',
        '*fallback':            'fallbackHandler'
    },

    pageHome: function () {
        console.log('load the home page content');
    },

    pageAbout: function () {
        console.log('load the about page content');
    },

    pageContact: function () {
        console.log('load the contact page content');
    },

    pageWork: function () {
        console.log('load the work page content');
    },

    fallbackHandler: function (splat) {
        console.log('falling back with', splat);
    },

    loadContent: function () {
        $('.section-page').each(function () {
            var $section = $(this),
                    contentUrl;

            if (!$('.section-header',$section).length) {
                $section.load('/content/' + $section.data('content_file') + '.html', function() {
                    $('.interactive-text', $section).hide();
                });
            } else {
                $('.interactive-text').hide();
            }
        });
    }

});