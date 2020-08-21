Array.from(document.querySelectorAll('.portfolio__image')).map((img) => {
  img.addEventListener('click', () => {
    let preview = document.querySelector('.portfolio__preview');
    let closeBtn = document.querySelector('.portfolio__close');

    preview.innerHTML = img.outerHTML;

    preview.style.visibility = 'visible';
    closeBtn.style.visibility = 'visible';

    // lock scroll
    // document.querySelector('html').style.overflowY = 'hidden';

    closeBtn.addEventListener('click', () => {
      preview.style.visibility = 'hidden';
      closeBtn.style.visibility = 'hidden';
      // document.querySelector('html').style.overflowY = 'scroll';
      preview.innerHTML = "";
    })
  })
})
