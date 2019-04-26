import '../../node_modules/isotope-layout/js/isotope';
import '../../node_modules/jquery/dist/jquery';
import '../../node_modules/isotope-layout/js/isotope';
import '../../node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min';
import '../../node_modules/jquery.easing/jquery.easing.min';
import '../../node_modules/jquery-popup-overlay/jquery.popupoverlay';
import '../../node_modules/jquery-validation/dist/jquery.validate.min';

$(document).scroll(function() {

  if($(this).scrollTop() > 70) {
    $('.header__wrapper').addClass('scroll');
  }
  else {
    $('.header__wrapper').removeClass('scroll');
  }
});

$(document).ready(function() {

  $('.menu a, .header .logo').on('click', function(event) {
    var target = $(this.getAttribute('href'));

    if (target.length) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 40
      }, 1000);
    }
  });

  var myHash = location.hash;
  location.hash = '';
  if(myHash.length) {
    $(window).load(function() {
      $('html, body').animate({scrollTop: $(myHash).offset().top - 40}, 1000);
    });
    
  };

  var inputs = document.querySelectorAll('.fileinput');
  Array.prototype.forEach.call(inputs, function(input) {
    var label	 = input.nextElementSibling,
      labelVal = label.innerHTML;
    input.addEventListener('change', function(e) {
      var fileName = '';
      if( this.files && this.files.length > 1 )
        fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
      else
        fileName = e.target.value.split( '\\' ).pop();
      if( fileName )
        label.innerHTML = fileName;
      else
        label.innerHTML = labelVal;
    });
  });

  $('.modal__form_wrapper .modal__form').not(':first').hide();
  $('.modal__nav .button-nav').click(function(e) {
    e.preventDefault();
    $('.modal__nav .button-nav').removeClass('active').eq($(this).index()).addClass('active');
    $('.modal__form_wrapper .modal__form').hide().eq($(this).index()).fadeIn();
  }).eq(0).addClass('active');

  // anchor -----

  // CABINET ----
  $('.cabinet__storage_nav-links a').click(function(event) {
    event.preventDefault();
    $('.cabinet__storage_nav-links a').removeClass('active');
    $(this).addClass('active');
  });

  $('.choice-all').click(function() {
    if ($('input[name="add-card"]').prop('checked') === true) {
      $(this).text('Выбрать все');
      $('input[name="add-card"]').prop('checked', false);
    } else {
      $(this).text('Убрать все');
      $('input[name="add-card"]').prop('checked', true);
    }
  });

  $('.cabinet__view').click(function(event) {
    event.preventDefault();
    $('.cabinet__view').removeClass('active');
    $(this).addClass('active');
    if ($(this).hasClass('cabinet__view_line')) {
      $('.cabinet__storage_content').addClass('active-view-line');
    } else {
      $('.cabinet__storage_content').removeClass('active-view-line');
    }
  });

  $('.button_login-exit').click(function() {
    $('.button-menu_list').toggleClass('active');
  });


  // NAV -----
  $('.burger').click(function() {
    $('.header').toggleClass('active');
    $('.burger').toggleClass('active');
  });


  // FAQ -----
  $('.faq__head').click(function() {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    }
    else {
      $('.faq__head').removeClass('active');
      $(this).addClass('active');
    }
    $('.faq__toggle').addClass('.active');
    $(this).next().slideToggle();
    $('.faq__toggle').not($(this).next()).slideUp();
  });

  // CALCULATOR ----
  var current, next, previous;
  var left, opacity, scale;
  var animating;
  $('.next').click(function(e) {
    e.preventDefault();
    if (animating) return false;
    animating = true;
    current = $(this).parent();
    next = $(this).parent().next();
    $('#progressbar li').eq($('fieldset').index(next)).addClass('active');
    next.show();
    current.animate({
      opacity: 0
    }, {
      step: function(now, mx) {

        scale = 1 - (1 - now) * 0.2;

        left = (now * 50) + '%';

        opacity = 1 - now;
        current.css({
          'transform': 'scale(' + scale + ')',
          'position': 'absolute'
        });
        next.css({
          'left': left,
          'opacity': opacity,
        });
      },
      duration: 800,
      complete: function() {
        current.hide();
        animating = false;
      },

      easing: 'easeInOutBack'
    });
  });
  $('.previous').click(function(e) {
    e.preventDefault();
    if (animating) return false;
    animating = true;
    current = $(this).parent();
    previous = $(this).parent().prev();

    $('#progressbar li').eq($('fieldset').index(current)).removeClass('active');
    previous.show();
    current.animate({
      opacity: 0
    }, {
      step: function(now, mx) {
        scale = 0.8 + (1 - now) * 0.2;
        left = ((1 - now) * 50) + '%';
        opacity = 1 - now;
        current.css({
          'left': left,
        });
        previous.css({
          'transform': 'scale(' + scale + ')',
          'opacity': opacity,
        });
      },
      duration: 800,
      complete: function() {
        current.hide();
        animating = false;
      },
      easing: 'easeInOutBack'
    });
  });
  $('.submit').click(function() {
    return false;
  });


  //---- MODAL ----

  $('.modal').popup({
    transition: 'all 0.3s',
    outline: true,
    focusdelay: 400,
    vertical: 'top',
    closebutton: true
  });






  // init Isotope
  //
  var $grid = $('.gallery__wrapper').isotope({
    itemSelector: '.gallery__wrapper .gallery__img',
    horizontalOrder: true,
    fitWidth: true,
    layoutMode: 'masonry',
    masonry: {
      gutter: 0
    }
  });

  var initShow = 8; //number of items loaded on init & onclick load more button
  var counter = initShow; //counter for load more button
  var iso = $grid.data('isotope'); // get Isotope instance

  if(iso)
    loadMore(initShow); //execute function onload

  function loadMore(toShow) {
    $grid.find('.hidden').removeClass('hidden');

    var hiddenElems = iso.filteredItems.slice(toShow, iso.filteredItems.length).map(function(item) {
      return item.element;
    });
    $(hiddenElems).addClass('hidden');
    $grid.isotope('layout');

    //when no more to load, hide show more button
    if (hiddenElems.length === 0) {
      $('.show-more').hide();
    } else {
      $('.show-more').show();
    };
  }
  //append load more button
  // $container.after('<button id="load-more"> Load More</button>');

  //when load more button clicked
  $('.show-more').click(function(e) {
    e.preventDefault();
    counter = counter + initShow;
    loadMore(counter);
  });




  $('input[type="tel"]').mask('+7 (000) 000-00-00');

  jQuery.validator.addMethod('phoneno', function(phoneNumber, element) {
    return this.optional(element) || phoneNumber.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
  }, 'Введите Ваш телефон');

  $('.form').each(function(index, el) {
    $(el).addClass('form-' + index);

    $('.form-' + index).validate({
      rules: {
        name: 'required',
        tel: {
          required: true,
          phoneno: true
        },
        code: 'required'
      },
      messages: {
        name: 'Неправильно введенное имя',
        tel: 'Неправильно введен телефон',
        code: 'Неправильно введен СМС код',
      },
      submitHandler: function(form) {
        var t = $('.form-' + index).serialize();
        ajaxSend('.form-' + index, t);
      }
    });
  });

  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: 'POST',
      url: 'sendmail.php',
      data: data,
      success: function() {
        $('.modal').popup('hide');
        $('#thanks').popup('show');
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  };

});

$(function() {
  $('.reviews__card').slice(0, 2).show();
  $('.load-more').on('click', function(e) {
    e.preventDefault();
    $('.reviews__card:hidden').slice(0,2).slideDown();
    if ($('.reviews__card:hidden').length === 0) {
      $('.load-more').hide();
    } else {
      $('.load-more').show();
    };
  });

});
