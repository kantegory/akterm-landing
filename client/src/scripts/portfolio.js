Array.from(document.querySelectorAll('.portfolio__image')).map((img) => {
  img.addEventListener('click', () => {
    let preview = document.querySelector('.portfolio__preview');

    preview.innerHTML = img.outerHTML;

    preview.style.visibility = 'visible';

    preview.addEventListener('click', () => {
      preview.style.visibility = 'hidden';
      preview.innerHTML = "";
    })
  })
})
