(function ($) {
  "use strict";

  // Page loading animation
  $(window).on('load', function () {
    $('#js-preloader').addClass('loaded');
  });

  // Sticky header background + bottom nav reveal
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    var box = $('.header-text').height() || 400;
    var header = $('header').height() || 80;

    if (scroll >= box - header) {
      $('header').addClass('background-header');
    } else {
      $('header').removeClass('background-header');
    }

    if (scroll > 260) {
      $('.bottom-nav').addClass('is-visible');
    } else {
      $('.bottom-nav').removeClass('is-visible');
    }

    // scrollspy for nav + bottom nav
    var current = '';
    var sectionIds = ['top', 'value', 'coach', 'classes', 'process', 'contact'];
    sectionIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      var top = el.getBoundingClientRect().top + window.pageYOffset - 140;
      if (scroll >= top) {
        current = id;
      }
    });
    $('.main-nav .nav a, .bottom-nav a').removeClass('active');
    if (current) {
      $('.main-nav .nav a[href="#' + current + '"]').addClass('active');
      $('.bottom-nav a[href="#' + current + '"]').addClass('active');
    }
  });

  // Hero carousel
  if ($('.owl-banner').length) {
    $('.owl-banner').owlCarousel({
      center: true,
      items: 1,
      loop: true,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 5500,
      navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
      margin: 30
    });
  }

  // Mobile menu toggle
  if ($('.menu-trigger').length) {
    $('.menu-trigger').on('click', function () {
      $(this).toggleClass('active');
      $('.header-area .nav').slideToggle(200);
    });
  }

  // Smooth scroll for in-page anchors (header nav + bottom nav)
  $('a[href*="#"]').not('[href="#"]').on('click', function (e) {
    var hash = this.hash;
    if (!hash) return;
    var target = $(hash);
    if (!target.length) return;

    e.preventDefault();
    if ($(window).width() < 991) {
      $('.menu-trigger').removeClass('active');
      $('.header-area .nav').slideUp(200);
    }
    $('html, body').animate({ scrollTop: target.offset().top - 90 }, 700);
  });

  // Contact form -> builds a mailto: link client-side (no backend, no fake submit)
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var goal = document.getElementById('subject').value.trim();
      var message = document.getElementById('message').value.trim();

      var subject = '[그립&무브] ' + (goal || '클래스 문의');
      var bodyLines = [
        '이름: ' + name,
        '회신 받을 이메일: ' + email,
        '',
        message
      ];
      var mailto = 'mailto:gng1013@hrdncs.co.kr'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(bodyLines.join('\n'));

      window.location.href = mailto;
    });
  }

})(window.jQuery);
