(function($) {
    $.fn.textCounter = function(options) {
        var settings = $.extend({
            containerClass: "counter"
        }, options);
    
        var inputHandler = function(who) {
            if (who.usesChars) {
                var c = who.value.length;
                $('.' + who.charClass, $(who).closest('.' + settings.containerClass)).text(c);
            }
            if (who.usesWords) {
                var c = who.value.match(/[^\s]+/gi);
                c = c ? c.length:0;
                $('.' + who.wordClass, $(who).closest('.' + settings.containerClass)).text(c);
            }
        }

        return this.each(function() {
            this.charClass = $(this).data("tc-chars");
            this.wordClass = $(this).data("tc-words");
            this.usesChars = typeof(this.charClass) != 'undefined';
            this.usesWords = typeof(this.wordClass) != 'undefined';

            $(this).keyup(function(e) {
                inputHandler(this);
            });
        });
    }
})(jQuery);