if (document.getElementById('open_contacts_popup') &&
  document.getElementById('contacts_popup_wrapper')) {

  var open_contacts_popup = document.getElementById('open_contacts_popup');
  var contacts_popup_wrapper = document.getElementById('contacts_popup_wrapper');
  var close_contacts_popup = document.getElementById('close_contacts_popup');

  var contacts_popup_form_button = document.getElementById('contacts_popup_form_button');
  var contacts_popup_form_msg = document.getElementById('contacts_popup_form_msg');

  var file_field = document.getElementById('file_field');
  var filename = document.getElementById('filename');

  open_contacts_popup.addEventListener('click', function () {
    openContactsPopup()
  })

  close_contacts_popup.addEventListener('click', function () {
    hideContactsPopup()
  })

  contacts_popup_form_msg.addEventListener('input', function () {
    validateMessage();
  })

  file_field.addEventListener('change', function () {
    filename.innerText = this.value.split(/(\\|\/)/g).pop();
  })




  function openContactsPopup() {
    contacts_popup_wrapper.classList.remove('d_none')
  }

  function hideContactsPopup() {
    contacts_popup_wrapper.classList.add('d_none')
  }

  function validateMessage() {
    if (contacts_popup_form_msg.value.length < 10) {
      contacts_popup_form_button.disabled = true;
    } else {
      contacts_popup_form_button.disabled = false;
    }
  }

}