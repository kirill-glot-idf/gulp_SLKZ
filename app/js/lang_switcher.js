;if(document.getElementById('lang_switcher')){
  var lang_switcher = document.getElementById('lang_switcher');
  var lang_visible = document.getElementById('lang_visible');
  var lang_hidden = document.getElementById('lang_hidden');
  var hidden_langs = lang_hidden.getElementsByClassName('lang');

  lang_visible.addEventListener('click', function(){
    if(this.parentNode.classList.contains('opened')){
      hideHiddenLangsList();
    }else{
      showHiddenLangsList();
    }

  }, false);


  for(i = 0; i < hidden_langs.length; i++){
    hidden_langs[i].addEventListener('click', function(){
      changeLang(this);
      hideHiddenLangsList();
    })
  }

  function changeLang(selected_lang){

    currient_lang_html = lang_visible.innerHTML;

    lang_visible.innerHTML = '<div class="lang">' + selected_lang.innerHTML + '</div>';
    selected_lang.innerHTML = currient_lang_html;

  }


  function showHiddenLangsList(){
    lang_switcher.classList.add('opened');

    $(document).mouseup(function (e) {
      let t = $('.lang_switcher');
      t.is(e.target) || 0 !== t.has(e.target).length || hideHiddenLangsList();
    })

  }

  function hideHiddenLangsList(){
    lang_switcher.classList.remove('opened');
  }

}