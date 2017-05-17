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
            
            if (
                (who.charLimit != -1 && $(who).val().length >= who.charLimit)
                ||
                (
                    who.wordLimit != -1 && 
                    $(who).val().split(/\s+/).length > who.wordLimit)
            ) who.limit = true;
            else who.limit = false;
        };
        
        var _killLimit = function(who) {
            if (who.charLimit != -1 && $(who).val().length >= who.charLimit)
                return true;
            
            if (who.wordLimit != -1 && $(who).val().trim().split(/\s+/).length >= who.wordLimit)
                return true;
            
            return false;
        };

        return this.each(function() {
            this.charClass = $(this).data("tc-chars");
            this.wordClass = $(this).data("tc-words");
            this.usesChars = typeof(this.charClass) != 'undefined';
            this.usesWords = typeof(this.wordClass) != 'undefined';
            
            // for character and word limit
            this.limit = false;
            this.charLimit = $(this).data("tc-char-limit");
                this.charLimit = typeof(this.charLimit) != 'number'? -1:this.charLimit;
            this.wordLimit = $(this).data("tc-word-limit");
                this.wordLimit = typeof(this.wordLimit) != 'number'? -1:this.wordLimit;

            $(this).keyup(function(e) {
                inputHandler(this);
            });
            
            $(this).keydown(function(e) {
                if (this.limit) {
                    switch (e.keyCode) {
                        case 8:
                        case 46:
                        case 37:
                        case 38:
                        case 39:
                        case 40:
                            break;
                        default:
                            e.preventDefault();
                            break;
                    }
                }
            });
        });
    }
})(jQuery);