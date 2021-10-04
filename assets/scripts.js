/*
* Custom scripts
*/
window.onload = checkAppVersion

function checkAppVersion(){
  $.getJSON("https://api.github.com/repos/giua-app/giua-app/releases",function(resultData){
    var ver = resultData["0"]["tag_name"]
    document.getElementById("ver-string").innerHTML = "Ultima versione: " + ver
  });
}

function searchAndDownloadApp() {
  var btn_download = document.getElementById("btn-download")
  btn_download.setAttribute("onClick", "")
  btn_download.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Download in corso...'
  $.getJSON("https://api.github.com/repos/giua-app/giua-app/releases",function(resultData){
    //var jsonP = JSON.stringify(resultData);
    try {
      var link = resultData["0"]["assets"]["0"]["browser_download_url"]
    }
    catch(e){
      alert("C'è stato un errore nel download.\nErrore: " + e.message)
      btn_download.innerHTML = "Errore :("
      return;
    }
    //document.getElementById("btn-download").innerHTML = "Download completato"
    window.open(link, "_top")
    btn_download.innerHTML = "Download avviato"
    setTimeout(function(){
        btn_download.setAttribute("onClick", "searchAndDownloadApp();")
        btn_download.innerHTML = "Scarica"
    },2000);
  });
}





/*!
* Start Bootstrap - Scrolling Nav v5.0.3 (https://startbootstrap.com/template/scrolling-nav)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-scrolling-nav/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector('#mainNav');
  if (mainNav) {
      new bootstrap.ScrollSpy(document.body, {
          target: '#mainNav',
          offset: 74,
      });
  };

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = [].slice.call(
      document.querySelectorAll('#navbarResponsive .nav-link')
  );
  responsiveNavItems.map(function (responsiveNavItem) {
      responsiveNavItem.addEventListener('click', () => {
          if (window.getComputedStyle(navbarToggler).display !== 'none') {
              navbarToggler.click();
          }
      });
  });

});

