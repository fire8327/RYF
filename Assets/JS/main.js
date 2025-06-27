/* меню */
$("#toggler").click(function() {
    $("#menu").toggleClass("-translate-y-[500px]");
});


/* треки */
$(function() {
    // Массив слайдеров: id блока, трека, трекера, направление ('horizontal' или 'vertical')
    const sliders = [
      { base: '#base1',   track: '#track1', toggler: '#toggler1', direction: 'horizontal' },
      { base: '#base2',  track: '#track2', toggler: '#toggler2', direction: 'vertical'   },
      { base: '#base3',  track: '#track3', toggler: '#toggler3', direction: 'vertical'   },
      { base: '#base4',  track: '#track4', toggler: '#toggler4', direction: 'vertical'   }
    ];
  
    sliders.forEach(slider => {
      let dragging = false;
      let trackOffset, trackSize, togglerSize;
  
      function updateSizes() {
        const $track = $(slider.track);
        const $toggler = $(slider.toggler);
        if (slider.direction === 'horizontal') {
          trackOffset = $track.offset().left;
          trackSize = $track.width();
          togglerSize = $toggler.width();
        } else {
          trackOffset = $track.offset().top;
          trackSize = $track.height();
          togglerSize = $toggler.height();
        }
      }
  
      $(slider.toggler).on('mousedown touchstart', function(e) {
        dragging = true;
        updateSizes();
        $(slider.track).css('opacity', 0); // Скрываем трек
        e.preventDefault();
      });
  
      $(document).on('mousemove.'+slider.toggler+' touchmove.'+slider.toggler, function(e) {
        if (dragging) {
          let pageCoord;
          if (slider.direction === 'horizontal') {
            pageCoord = e.pageX || (e.originalEvent.touches && e.originalEvent.touches[0].pageX);
          } else {
            pageCoord = e.pageY || (e.originalEvent.touches && e.originalEvent.touches[0].pageY);
          }
          let pos = pageCoord - trackOffset - togglerSize / 2;
          pos = Math.max(0, Math.min(pos, trackSize - togglerSize));
          if (slider.direction === 'horizontal') {
            $(slider.toggler).css('left', pos + 'px');
          } else {
            $(slider.toggler).css('top', pos + 'px');
          }
          // Прозрачность текста зависит от положения ползунка
          let percent = pos / (trackSize - togglerSize);
          $(slider.base).css('opacity', percent);
  
          // Скрываем трекер, если текст полностью показан
          if (percent >= 0.99) {
            $(slider.toggler).css({'opacity': 0, 'pointer-events': 'none'});
          }
        }
      });
  
      $(document).on('mouseup.'+slider.toggler+' touchend.'+slider.toggler, function() {
        if (dragging) {
          dragging = false;
        }
      });
    });
});

/* слайдер */
const swiper = new Swiper('.studioSwiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
    mousewheel: true
});