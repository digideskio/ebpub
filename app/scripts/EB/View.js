'use strict';

var EB = EB || {};
EB.util.namespace('View');

EB.View = Backbone.View.extend({

    initialize: function () {
        _.bindAll(this, 'render', 'setSectionHeight', 'setTooltips', 'setTooltipText', 'handleFootnoteLinks', 'handleTooltipLink', 'handleSectionLink');
        this.setTooltipText();
        this.setSectionHeight();
        this.setTooltips();
    },

    events: {
        'click .footnote-link': 'handleFootnoteLinks',
        'click .tip-link': 'handleTooltipLink',
        'click .section-link': 'handleSectionLink'
    },

    setSectionHeight: function () {
        var paddingHeight = 0;
        paddingHeight = ($(window).height() - this.$('.section-inner').height()) / 2;
        if (paddingHeight < 60) {
            paddingHeight = 60;
        }
        paddingHeight = paddingHeight + 'px';
        console.log('setting section height', $(window).height(), this.$('.section-inner').height(), paddingHeight, this.$el);
        this.$el.css('padding-top', paddingHeight).css('padding-bottom', paddingHeight);
    },

    handleFootnoteLinks: function (ev) {
        ev.preventDefault();
        var $footnote = this.$('.footnotes');

        $footnote.addClass('highlight');
        _.delay(function () {
            $footnote.removeClass('highlight');
        }, 5000);
    },
    
    getClickedTipLink: function ($clicked) {
        if (!$clicked.hasClass('tip-link')) {
            $clicked = $clicked.parents('.tip-link');
        }
        return $clicked;
    },

    handleTooltipLink: function (ev) {
        var $clicked = this.getClickedTipLink($(ev.target));
        console.log('clicked popup link', $clicked.attr('href'), $clicked);
        $clicked.tooltipster('show');
        ev.preventDefault();
    },

    setTooltips: function () {
        var thisView = this;

        this.$('.tip-link').each(function () {
            var $tooltipLink = $(this),
                    $tooltipContent = thisView.$($tooltipLink.attr('href')),
                    $body = $('body'),
                    $window = $(window);
            
            $tooltipLink.tooltipster({
                content: $tooltipContent.html(),
                maxWidth: 300,
                theme: '.tooltipster-light',
                trigger: 'custom',
                functionReady: function ($origin) {
                    $body.off('click');
                    $window.off('scroll');
                    $origin = thisView.getClickedTipLink($origin);
                    $body.on('click', function (ev) {
                        console.log('close a tip');
                        ev.preventDefault();
                        if (! thisView.getClickedTipLink($(ev.target)).hasClass('tip-link')) {
                            $origin.tooltipster('hide');
                        }
                    });
                    $window.on('scroll', function () {
                        $origin.tooltipster('hide');
                    });
                }
            });
        });
    },

    setTooltipText: function () {
        this.$('.tip-text').hide();
    },
    
    handleSectionLink: function (ev) {
        ev.preventDefault();
        EB.App.Router.navigate($(ev.target).attr('href'), true);
    }


});