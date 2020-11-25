if (document.getElementById('callback_list')) {
  var callback_list = document.getElementById('callback_list');
  var callback_item_list = callback_list.getElementsByClassName('callback_item');
  var text_length = 180;


  for (var i = 0; i < callback_item_list.length; i++) {
    content = callback_item_list[i].querySelector('.content');
    if (content.innerText.length > text_length) {

      shortened_text = content.innerText.substr(0, text_length) + '...';
      content.innerText = shortened_text;

      div = document.createElement('div');
      div.classList.add('show_full');
      div.innerText = 'Раскрыть';
      callback_item_list[i].appendChild(div);


    }
  }

  var show_full_list = document.getElementsByClassName('show_full');

  for (var ii = 0; ii < show_full_list.length; ii++) {
    show_full_list[ii].addEventListener('click', function(){
      if(this.classList.contains('showed')){
        hideFullCallback(this);
      }else{
        showFullCallback(this);
      }

    })
  }

  function showFullCallback(elem){
    temp_text = elem.parentNode.querySelector('.content').innerText;
    elem.parentNode.querySelector('.content').innerText = elem.parentNode.querySelector('.content').dataset.full_text;
    elem.parentNode.querySelector('.content').dataset.full_text = temp_text;

    elem.innerText = 'Свернуть';
    elem.classList.add('showed');
  }

  function hideFullCallback(elem){
    temp_text = elem.parentNode.querySelector('.content').innerText;
    elem.parentNode.querySelector('.content').innerText = elem.parentNode.querySelector('.content').dataset.full_text;
    elem.parentNode.querySelector('.content').dataset.full_text = temp_text;

    elem.innerText = 'Раскрыть';
    elem.classList.remove('showed');
  }

}
