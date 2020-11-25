var header_nav = document.getElementById('header_nav');

window.onscroll = function() {stickedNavigation()};
window.onload = function() {stickedNavigation()};

function stickedNavigation() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    header_nav.classList.add('sticked')
  } else {
    header_nav.classList.remove('sticked')
  }
}