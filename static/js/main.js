/*Select Picker*/

$(function () {
  $('.selectpicker').selectpicker();
});



/*Carousel*/

$(document).ready(function () {

  var sliderSlider = $('.slider_carousel');


  sliderSlider.on('initialized.owl.carousel changed.owl.carousel', function (e) {
    if (!e.namespace) {
      return;
    }
    var carousel = e.relatedTarget;
  }).owlCarousel({
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    autoplay: true,
    loop: true,
    margin: 0,
    nav: false,
    dots: true,
    autoHeight: false,
    mouseDrag: false,
    autoplayHoverPause: true,
    items: 1,

  });

});



/*Tab Buttons*/

const tabButtons = document.querySelectorAll('.tab-btn')

tabButtons.forEach((tab) => {
  tab.addEventListener('click', () => tabClicked(tab))
})

function tabClicked(tab) {

  tabButtons.forEach(tab => {
    tab.classList.remove('active')
  })
  tab.classList.add('active')

  const contents = document.querySelectorAll('.content')

  contents.forEach((content) => {
    content.classList.remove('show')
  })

  const contentId = tab.getAttribute('content-id')
  const contentSelected = document.getElementById(contentId)

  contentSelected.classList.add('show')
}




/*Swiper Slider*/

var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  
});



const onInput = (parent, e) => {
  const slides = parent.querySelectorAll('input');
  const min = parseFloat(slides[0].min);
  const max = parseFloat(slides[0].max);

  let slide1 = parseFloat(slides[0].value);
  let slide2 = parseFloat(slides[1].value);

  const percentageMin = (slide1 / (max - min)) * 100;
  const percentageMax = (slide2 / (max - min)) * 100;

  parent.style.setProperty('--range-slider-value-low', percentageMin);
  parent.style.setProperty('--range-slider-value-high', percentageMax);

  if (slide1 > slide2) {
    const tmp = slide2;
    slide2 = slide1;
    slide1 = tmp;

    if (e?.currentTarget === slides[0]) {
      slides[0].insertAdjacentElement('beforebegin', slides[1]);
    } else {
      slides[1].insertAdjacentElement('afterend', slides[0]);
    }
  }
  
  parent.querySelector('.range-slider__display').setAttribute('data-low', `$ ${slide1}`);

  parent.querySelector('.range-slider__display').setAttribute('data-high', `$ ${slide2}`);
}

addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('.range-slider')
   .forEach(range => range.querySelectorAll('input')
      .forEach((input) => {
      if (input.type === 'range') {
        input.oninput = (e) => onInput(range, e);
        onInput(range);
      }
   }))
});


$(document).ready(function () {
  
  $("#owl-demo6").owlCarousel({
      items: 5,
      margin: 30,
      dots: false,
      loop:true,
      autoplay: 2000,
      responsiveClass: true,
      responsive: {
          0: {
              items: 2,
              nav: false,
              dots:true
          },
          400:{
            items: 3,
            nav: false,
            dots:true
          },
          700: {
              items: 4,
              nav: false
          },
          1024: {
              items: 6,
              nav: true,
              loop: false
          },
          1500:{
              items: 7,
              nav: true,
              loop: false
          }
      }
  });      
})