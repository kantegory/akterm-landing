let lastPos = 0;
let step = window.screen.height;

window.addEventListener('scroll', (event) => {
  if (window.scrollY > lastPos) {
//    window.scrollTo({
//      top: lastPos + step,
//      behavior: "smooth"
//    });
  } else {
//    window.scrollTo({
//      top: lastPos - step,
//      behavior: "smooth"
//    });
  }

  lastPos = window.scrollY;
})
