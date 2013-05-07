'use strict';

var EB = EB || {};
EB.util.namespace('View');

/**
 * This is a simple view used for all of the main sections (including the contact section which has some specific functionality).
 * */

EB.View = Backbone.View.extend({

    initialize: function () {
        _.bindAll(this, 'render', 'setSectionHeight', 'setTooltips', 'setTooltipText', 'handleFootnoteLinks', 'handleTooltipLink', 'handleSectionLink', 'handleContactForm');
        this.setTooltipText();
        this.setSectionHeight();
        this.setTooltips();
        EB.application.checkAllContentLoaded();
    },

    events: {
        'click .footnote-link': 'handleFootnoteLinks',
        'click .tip-link': 'handleTooltipLink',
        'click .section-link': 'handleSectionLink',
        'submit #contact_form': 'handleContactForm'
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
                    $window = $(window),
                    isInteractive = false;
            
            if ($tooltipLink.data('linkintip')) {
                isInteractive = true;
            }
            
            $tooltipLink.tooltipster({
                content: $tooltipContent.html(),
                maxWidth: 300,
                theme: '.tooltipster-light',
                trigger: 'custom',
                interactive: isInteractive,
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
    },

    handleContactForm: function (ev) {
        ev.preventDefault();
        var $form = this.$('#contact_form'),
                $message = this.$('#contact_success_message');
        
        console.log('Message', $message.length, $message);
        
        $.post($form.attr('action'), {
            contact_name: $('#contact_name').val(),
            contact_email: $('#contact_email').val(),
            contact_message: $('#contact_message').val()
        },
        function () {
            $message.html('<div class="inner"><p>Thanks. Your message has been sent.</p><p>Have a nice day :)</p></div>');
            $form.fadeOut('fast', function () {
                $message.hide().removeClass('hidden').fadeIn('fast');
            });
        });
    }

});