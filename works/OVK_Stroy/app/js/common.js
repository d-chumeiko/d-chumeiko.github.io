$(function() {
    

    //E-mail Ajax
    $("form").submit(function() { //Change
      var th = $(this);
      $.ajax({
        type: "POST",
      url: "mail.php", //Change
      data: th.serialize()
    }).done(function() {
      $(".form-callback .success").addClass("active");
      setTimeout(function() {
        // Done Functions
        $(".form-callback .success").removeClass("active");
        th.trigger("reset");
        $.magnificPopup.close();
      }, 3000);
    });
    return false;
    });


    $("body").append('<div class="top"><i class="fa fa-angle-double-up">');
    $(".carousel-eq").owlCarousel({
    // loop: true,
    responsiveClass: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },

      480:{
        items: 1,
      },

      580:{
        items: 2,
      },

      768: {
        items: 2,
      },

      992: {
        items: 3,
      },

      1200: {
        items: 4,
      }
    },
    
    });


    $(".carousel-brands").owlCarousel({
        loop: true,
        responsiveClass: true,
        nav: true,
        margin: 30,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        responsive: {
          0: {
            items: 1,
          },

          480:{
            items: 2,
          },

          580:{
            items: 2,
          },

          768: {
            items: 3,
          },

          992: {
            items: 4,
          },

          1200: {
            items: 5,
          }
        },
        
        });


    $(".toggle-mnu").click(function() {
      $(this).toggleClass("on");
      $(this).parent().next().next().find(".main-mnu").slideToggle();
      return false;
    });


    $(".mouse-icon").click(function() {
      $("html, body").animate({
        scrollTop: $(".s-adv").offset().top 
      }, 800)
    });


    $(".portfolio-item").each(function(e) {

      var th = $(this);
      
      th.attr("href", "#portfolio-img-" + e)
        .find(".portfolio-popup")
          .attr("id", "portfolio-img-" + e);
    });


    $(".portfolio-item, a[href='#callback']").magnificPopup({
      mainClass: 'my-mfp-zoom-in',
      type: 'inline',
      removalDelay: 200,
    });

    $("a[href='#callback']").click(function(){
      var dataForm = $(this).data("form");
      var dataText = $(this).data("text");

      $(".form-callback h4").text(dataText);
      $(".form-callback [name=admin-data]").val(dataForm);
    })




    $(".mfp-gallery").each(function(){
      $(this).magnificPopup({
        delegate: 'a',
        mainClass: 'mfp-zoom-in',
        type: 'image',
        tLoading: '',
        gallery:{
          enabled:true,
        },
        removalDelay: 300,
        callbacks: {
          beforeChange: function() {
            this.items[0].src = this.items[0].src + '?=' + Math.random(); 
          },
          open: function() {
            $.magnificPopup.instance.next = function() {
              var self = this;
              self.wrap.removeClass('mfp-image-loaded');
              setTimeout(function() { $.magnificPopup.proto.next.call(self); }, 120);
            }
            $.magnificPopup.instance.prev = function() {
              var self = this;
              self.wrap.removeClass('mfp-image-loaded');
              setTimeout(function() { $.magnificPopup.proto.prev.call(self); }, 120);
            }
          },
          imageLoadComplete: function() { 
            var self = this;
            setTimeout(function() { self.wrap.addClass('mfp-image-loaded'); }, 16);
          }
        }
      });
    });


    $(".s-adv").waypoint(function() {
      $({blurRadius: 5}).animate({blurRadius: 0}, {
        duration: 1000,
        easing: 'swing',
        step: function() {
          $(".s-adv-item h3 span").css({
            "-webkit-filter": "blur("+this.blurRadius+"px)",
            "filter": "blur("+this.blurRadius+"px)"
          });
        }, 
      });this.destroy()

      var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(' ');
      $(".s-adv-item h3 span").each(function() {
        var tcount = $(this).data("count");
        $(this).animateNumber({ number: tcount,
          easing: 'easeInQuad',
          "font-size": "40px",
          numberStep: comma_separator_number_step},
          2000);
      });
      this.destroy()
    },{
      offset: '50%'
    });


    $('img.img-svg, man-logo.img-svg').each(function(){
      var $img = $(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');

      $.get(imgURL, function(data) {
          // Get the SVG tag, ignore the rest
          var $svg = $(data).find('svg');

          // Add replaced image's ID to the new SVG
          if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
          }
          // Add replaced image's classes to the new SVG
          if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
          }

          // Remove any invalid XML tags as per http://validator.w3.org
          $svg = $svg.removeAttr('xmlns:a');

          // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
          if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
          }

          // Replace image with new SVG
          $img.replaceWith($svg);

        }, 'xml');

    });

    function heights() {
      $('.s-direct .item-vertical p').height('auto').equalHeights();
      $('.carousel-text').height('auto').equalHeights();
      $('.testimonials-desc').height('auto').equalHeights();
      $('.testimonials-head').height('auto').equalHeights();
      $('.item-vertical-2 h3').height('auto').equalHeights();
    };

    heights();

    $(window).resize(function(){
      heights();
    });

    $("form select").selectize();
    
    $(".main-foot .toggle-mnu").click(function() {
      $("html, body").animate({scrollTop: $(document).height() + 200}, "slow");
      return false;
    })

    $(".top").click(function() {
    $("html, body").animate({scrollTop: 0}, "slow");
    })

    $(window).scroll(function() {
      if($(this).scrollTop() > $(this).height()) {
        $(".top").addClass("active");
      }
      else
        $(".top").removeClass("active");
    });

    $(document).ready(function() {
      $('a[href^="#contacts-anchor"]').click(function () { 
       elementClick = $(this).attr("href");
       destination = $(elementClick).offset().top;
        $("html, body").animate( { scrollTop: destination }, 1100 );
        return false;
      });
    });


});

