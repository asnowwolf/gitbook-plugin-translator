document.addEventListener('click', function (event) {
  if (event.target) {
    var element = event.target;
    if (!element.hasAttribute('x-translator-translation')) {
      return;
    }

    var original = element.nextElementSibling;
    if (original.hasAttribute('x-translator-original')) {
      if (original.getAttribute('x-translator-original') === 'off') {
        original.setAttribute('x-translator-original', '');
      } else {
        original.setAttribute('x-translator-original', 'off');
      }
    }
  }
});
