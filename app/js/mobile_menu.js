if(document.getElementById('open_menu')){
  var burger = document.getElementById('open_menu');

  burger.addEventListener('click', function(){

    if(header_nav.classList.contains('menu_opened')){
      close_mobile_menu();
    }else{
      open_mobile_menu();
    }
  })
}

function open_mobile_menu(){
  header_nav.classList.add('menu_opened');
  body.classList.add('ov_hidden');
}

function close_mobile_menu(){
  header_nav.classList.remove('menu_opened');
  body.classList.remove('ov_hidden');
}