// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
import 'lightbox';

$(() => {
  const jWindow = $(window);

  let sidebarVisible = false;

  const body = $('body');

  $('#menu-reveal').click(function() {
    sidebarVisible = !sidebarVisible;
    if (sidebarVisible) {
      body.addClass('menuOpen');
    } else {
      body.removeClass('menuOpen');
    }
  });

  $('.section-link').click(function() {
    body.removeClass('menuOpen');
    sidebarVisible = false;
  });

  if (window.location.pathname === '/' && jWindow.width() >= 600) {
    const topSection = $('#top-splash')

    jWindow.on('scroll', function() {
      topSection.find('.parallax-image').css('transform', `translate3d(0, ${jWindow.scrollTop() * -.3}px, 0)`)
    })
  }

  // lightbox.option({
  //   'wrapAround': true
  // })


  // Modal functionality starts here

  $('.portfolio-container .project-title-text, .portfolio-container .image-container').click(function(){
    var id = $(this).parents('.project').attr('id')
    $('#modal-' + id).show()
  })

  $('.modal-overlay').click(function(){
    $('.modal-container').hide()
  })


  // Filtering portfolio
  $(document).ready(function() {
    if (window.location.pathname === '/portfolio/') {
      filterProjects(window.location.hash.substring(1))
    }
  })

  $('.filter-tag').click(function(event) {
    event.preventDefault()
    const filteringTag = $(this).data('tagname')
    window.location.hash = `#${filteringTag}`
    filterProjects($(this).data('tagname'))
  })

  const filterProjects = function (clicked) {
    $('.project').hide()
    $('.project').filter(`.${clicked}`).show()
  }

});
