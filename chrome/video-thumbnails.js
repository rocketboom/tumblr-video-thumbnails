/*
  Video Thumbnails in Tumblr

  Developed for Rocketboom R&D by Greg Leuch <http://dev.rocketboom.com>
  With help from the fantastic Magma API! <http://docs.mag.ma/>

  Version:  1.0.1
  Packaged: 2010-08-30

  ############################################################################################-

  Released under GPL license by Rocketboom. More info: http://www.gnu.org/licenses/gpl.html

*/


Array.prototype.in_array = function(p_val, sensitive) {for(var i = 0, l = this.length; i < l; i++) {if ((sensitive && this[i] == p_val) || (!sensitive && this[i].toLowerCase() == p_val.toLowerCase())) {return true;}} return false;};


function videothumbs_init($_) {
  $_.fn.reverse = function(){return this.pushStack(this.get().reverse(), arguments);};

  (function($_) {
    $_.videothumbs = function() {
      if (!$_.videothumbs.settings.init) $_.videothumbs.init();

      // setTimeout(function() {
        $_.videothumbs.process();
        $_.videothumbs.finish();
      // }, 1000);
    };


    /* Setup blocker, and extend options.... */
    $_.fn.videothumbs = function(c) {};
    $_.extend($_.videothumbs, {

      /* Settings */
      settings : {
        init            : false,
        finish          : false,

        search_selector : 'li.video',
        current_url     : location.href,
        current_height  : 0,
        wiggle_height   : 20, /* Amount of +/- room to have for height checking */

        /* Magma integration */
        api_embed_url   : 'http://mag.ma/thumbnail.jpg?api_key=9f41a95cba557b2894771eed96e07a4ded82537f&embed=%s',
        api_url_url     : 'http://mag.ma/thumbnail.jpg?api_key=9f41a95cba557b2894771eed96e07a4ded82537f&url=%s'  
      },

      /* Initalize */
      init : function() {
        $_.videothumbs.settings.init = true;
      },

      /* Finalize */
      finish : function() {
        $_.videothumbs.settings.current_url = location.href;
        $_.videothumbs.settings.current_height = $_('body').height();
        $_.videothumbs.settings.finish = true;
      },

      /* Clear and redo (good for ajax pages) */
      reprocess : function() {
        /* Simple anchored ajax detection (for now) */
        var h = $_('body').height(), ch = $_.videothumbs.settings.current_height;

        // if ($_.videothumbs.settings.current_url != location.href || Math.abs(ch-h) > $_.videothumbs.settings.wiggle_height) {
          $_.videothumbs.settings.current_url = location.href;
          $_.videothumbs.settings.current_height = $_('body').height();
          $_.videothumbs.settings.init = false;
          $_.videothumbs.settings.finish = false;
          $_.videothumbs();
        // }
      },


      /* Lets filter these out */
      process : function() {
        var search = $_($_.videothumbs.settings.search_selector).filter(function() {
          return !$_(this).hasClass('videothumbd') && !$_(this).hasClass('post');
        });
        
        search.addClass('videothumbd').each(function() {
          var pid = $(this).attr('id').replace(/post/im, '');
          var video_imgs = $_('#post'+ pid +' .dashboard_watch_link a img'); /* Hack! Eww... */

          if (video_imgs.length > 1) return;

          var dboard_watch = $_('#post'+ pid +' .dashboard_watch_link'), 
              thumb_html = '<a href="#" onclick="Element.hide(\'watch_link_'+ pid +'\'); Element.show(\'watch_video_'+ pid +'\'); return false;"><img src="%s" id="video_thumbnail_'+ pid +'" style="margin:0px 15px 0px 0px; float:left; border:solid 2px #fff; width:130px; height:97px; background-color:#fff;" /></a>',
              code = $_('#watch_video_'+ pid).html().replace(/(\r\n|\n|\s\s\s|\s\s|\t)/img, '').replace(/(<div.*<\/div>)/img, '');

          thumb_html = thumb_html.replace(/\%s/, $_.videothumbs.settings.api_embed_url.replace(/\%s/, escape(code) ));
          dboard_watch.prepend(thumb_html);
        });
      },

    });

  })($_);


  $_.videothumbs();
  setInterval($_.videothumbs.reprocess, 1000);
}

/* Let start blocking those exes */
try {
  if (!jQuery('body').hasClass('videothumbd')) {
    jQuery('body').addClass('videothumbd')
    videothumbs_init(jQuery);
  }
} catch(err) {
}