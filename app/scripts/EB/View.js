'use strict';

var EB = EB || {};
EB.util.namespace('View');

EB.View = Backbone.View.extend({

    initialize: function () {
        _.bindAll(this, 'render', 'setSectionHeight', 'setTooltips', 'setInteractiveText');
        this.setInteractiveText();
        this.setSectionHeight();
        this.setTooltips();
    },

    events: {
        'click .footnote-link': 'handleFootnoteLinks',
        'click .interactive-link': 'handleInteractiveLink'
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

    handleInteractiveLink: function(ev) {
        console.log('clicked popup link', $(ev.target));
        $(ev.target).tooltipster('show');
        ev.preventDefault();
    },

    setTooltips: function () {
        var thisView = this;

        this.$('.interactive-link').each(function () {
            var $tooltipLink = $(this),
                    $tooltipContent = thisView.$($tooltipLink.attr('href'));
            $tooltipLink.tooltipster({
                content: $tooltipContent.html(),
                maxWidth: 300,
                theme: '.tooltipster-light',
                trigger: 'custom',
                functionReady: function ($origin, $tooltip) {
                    $('body').off('click');
                    $(window).off('scroll');
                    $('body').on('click', function(ev) {
                        console.log('close a tip');
                        ev.preventDefault();
                        if (! $(ev.target).hasClass('interactive-link')) {
                            $origin.tooltipster('hide');
                        }
                    });
                    $(window).on('scroll', function() {
                        $origin.tooltipster('hide');
                    });
                }/*,
                functionAfter: function () {
                    $('body').off('click');
                    $(window).off('scroll');
                }*/
            });
        });
    },

    setInteractiveText: function () {
        this.$('.interactive-text').hide();
    }


});