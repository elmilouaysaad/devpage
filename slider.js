document.addEventListener('DOMContentLoaded', function () {
    new Splide('#splide01', {
      type      : 'loop',
      perPage   : 3,
      autoplay  : true,
      breakpoints: {
        768: {
          perPage: 1,
        },
        1024: {
          perPage: 2,
        },
      },
      gap: '1rem',
      arrows: true,
      pagination: false,
    }).mount();
  });
  