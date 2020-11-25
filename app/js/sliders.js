if (document.getElementById('main_section_slider_wrapper')) {
  var slidesPerView = 5.7;

  if (document.body.clientWidth < 1200
    && document.body.clientWidth > 991) {
    slidesPerView = 6;
  } else if (document.body.clientWidth < 992
    && document.body.clientWidth > 390) {
    slidesPerView = 5.5;
  }else if (document.body.clientWidth < 391){
    slidesPerView = 4.5;
  }


  var dot_item_list = document.getElementsByClassName('dot_item');

  var main_section_pagination = new Swiper('.main_section_pagination', {
    slidesPerView: slidesPerView,
    spaceBetween: 25,
    centeredSlides: false,
    freeMode: true,
    loop: false,
    navigation: {
      nextEl: '.dots_wrapper_right',
      prevEl: '.dots_wrapper_left',
    },
  });

  var main_section_slider = new Swiper('.main_section_slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
    thumbs: {
      swiper: main_section_pagination
    }
  });


  if (dot_item_list.length >= slidesPerView) {
    document.getElementById('navs_wrapper').classList.remove('d_none');

    main_section_pagination.on('transitionEnd', function () {
      //console.log('*** mySwiper.realIndex', main_section_pagination.realIndex);
      if (main_section_pagination.realIndex < 1) {
        document.getElementById('dots_wrapper_left').classList.add('d_none');
        document.getElementById('dots_wrapper_right').classList.remove('d_none');
      } else if (main_section_pagination.realIndex === dot_item_list.length - 1) {
        document.getElementById('dots_wrapper_left').classList.remove('d_none');
        document.getElementById('dots_wrapper_right').classList.add('d_none');
      } else {
        document.getElementById('dots_wrapper_left').classList.remove('d_none');
        document.getElementById('dots_wrapper_right').classList.remove('d_none');
      }

    });

  }


}

if(document.getElementById('show_more_slider_container')){
  var show_more_slider_container = new Swiper('.show_more_slider_container', {
    spaceBetween: 30,
    slidesPerView: 2.6,
    navigation: {
      nextEl: '.show_more_slider_left',
      prevEl: '.show_more_slider_right',
    },
    breakpoints: {
      992: {
        slidesPerView: 2.6,
      },
      425: {
        slidesPerView: 1.6,
        spaceBetween: 15,
      },
      0: {
        slidesPerView: 1.1,
      }
    }
  });
}

if(document.getElementById('content_block_slider_container')){
  var content_block_slider_container = new Swiper('.content_block_slider_container', {
    spaceBetween: 40,
    navigation: {
      nextEl: '.content_block_slider_left',
      prevEl: '.content_block_slider_right',
    },
    breakpoints: {
      992: {
        slidesPerView: 5.3,
      },
      425: {
        slidesPerView: 3.7,
        spaceBetween: 20,
      },
      0: {
        slidesPerView: 2.3,
        spaceBetween: 10,
      }
    }
  });
}