(function($) {
  "use strict";
  $.extend({
    ///////////////////////////////////////////////
    // UISheet: Create an Overlay for Buttons, etc.
    ///////////////////////////////////////////////
    /*
      var options {
        id : 'starTrek',
        listClass :'enterprise',
        background: 'transparent',
        handle: false
      }
    */
    UISheet : function ( options ) {
      var settings = {
        id: $.Uuid(),
        listClass: '',
        background: '',
        handle: true
      }
      if (options) {
        $.extend(settings, options);
      }
      if (settings.background) settings.background =  $.concat(' style="background-color:', settings.background, '" ');
      if (settings.handle === false) settings.handle = '';
      settings.handle = '<div class="handle"><span></span></div>';
      if (options) $.extend(settings, options);
      var sheet = $.concat('<div id="', settings.id, '" class="sheet', settings.listClass, '"', settings.background, '>', settings.handle, '<section class="scroller-vertical"></section></div>');
      $('body').append(sheet);
      $('.sheet .handle').on($.eventStart, function() {
        var $this = $(this);
        if ($.isAndroid || $.isChrome) {
          $this.addClass('selected');
          setTimeout(function() {
            $this.removeClass('selected');
            $.UIHideSheet();
          }, 500);
        } else {
          $.UIHideSheet();
        }
      });
    },
    UIShowSheet : function ( id ) {
      var sheet = id ? id : '.sheet';
      $('article.current').addClass('blurred');
      if ($.isAndroid || $.isChrome) {
        $(sheet).css('display','block');
        setTimeout(function() {
          $(sheet).addClass('opened');
        }, 20);
      } else {
        $(sheet).addClass('opened');
      }
    },
    UIHideSheet : function ( ) {
      $('.sheet').removeClass('opened');
      $('article.current').addClass('removeBlurSlow');
      setTimeout(function() {
        $('article').removeClass('blurred');
        $('article').removeClass('removeBlurSlow');
      },500);
    }
  });
})(window.$);