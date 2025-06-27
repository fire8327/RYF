/* меню */
$("#toggler").click(function() {
    $("#menu").toggleClass("-translate-y-[500px]");
});


/* треки */
$(function() {
    let dragging = false;
    let $toggler = $('#toggler1');
    let $track = $('#track1');
    let $base = $('#base1');
  
    // Получаем размеры и позиции
    let trackOffset, trackWidth, togglerWidth;
  
    function updateSizes() {
      trackOffset = $track.offset().left;
      trackWidth = $track.width();
      togglerWidth = $toggler.width();
    }
  
    $toggler.on('mousedown touchstart', function(e) {
      dragging = true;
      updateSizes();
      $track.css('opacity', 0); // Скрываем трек
      e.preventDefault();
    });
  
    $(document).on('mousemove touchmove', function(e) {
      if (dragging) {
        let pageX = e.pageX || (e.originalEvent.touches && e.originalEvent.touches[0].pageX);
        let x = pageX - trackOffset - togglerWidth / 2;
        x = Math.max(0, Math.min(x, trackWidth - togglerWidth));
        $toggler.css('left', x + 'px');
        // Прозрачность текста зависит от положения ползунка
        let percent = x / (trackWidth - togglerWidth);
        $base.css('opacity', percent);

        // Скрываем трекер, если текст полностью показан
        if (percent >= 0.99) {
          $toggler.css({'opacity': 0, 'pointer-events': 'none'});
        }
      }
    });
  
    $(document).on('mouseup touchend', function() {
      if (dragging) {
        dragging = false;
        // Если хотите вернуть трек после отпускания ползунка, раскомментируйте строку ниже:
        // $track.css('opacity', 1);
      }
    });
  });