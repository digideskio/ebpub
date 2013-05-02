'use strict';

var EB = EB || {};
EB.util.namespace('View');

EB.View = Backbone.View.extend({

    initialize: function () {
        _.bindAll(this, 'render', 'setSectionHeight', 'setTooltips');
        this.$('.interactive-text').hide();
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
        _.delay(function() {
            $footnote.removeClass('highlight');
        }, 5000);
    },

    handleInteractiveLink: function (ev) {
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
                trigger: 'click'
            });
        });
    }


});