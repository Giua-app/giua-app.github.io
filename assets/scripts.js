/*
* Custom scripts
*/
window.onload = function(){
    if(document.title.startsWith("Registro dei cambiamenti")) {
        buildChangelog();
        return;
    }

    if(document.title.startsWith("Scarica l'app")) {
        checkAppVersion();
        return;
    }
}

function buildChangelog(){
    var div = document.getElementById("changelog")
    $.getJSON("https://api.github.com/repos/giua-app/giua-app/releases",function(resultData){

        var tag =  resultData["0"]["tag_name"]
        var body =  resultData["0"]["body"]
        var date = new Date(resultData["0"]["published_at"])

        div.innerHTML = "<h1>" + tag + " <span style=\"font-size: 60%;\">(" + date.toLocaleDateString() + ")</span></h1>"
        div.innerHTML += body

        for (let i = 1; i < Object.keys(resultData).length; i++) {
            var tag =  resultData["" + i]["tag_name"]
            var body =  resultData["" + i]["body"]
            var date = new Date(resultData["" + i]["published_at"])
            if(body != ""){
                div.innerHTML += "<hr><h1>" + tag + " <span style=\"font-size: 60%;\">(" + date.toLocaleDateString() + ")</span></h1>"
                div.innerHTML += body
            }
        }

        div.innerHTML += "<br><br>"
    });
}

function checkAppVersion(){
  $.getJSON("https://api.github.com/repos/giua-app/giua-app/releases",function(resultData){
    var ver = resultData["0"]["tag_name"]
    document.getElementById("ver-string").innerHTML = "Ultima versione: " + ver + " (beta)"
  });
}


function searchAndDownloadApp() {
    $.get("https://app.piratepx.com/ship?p=6af8462c-efe0-4f9a-96d0-ec9a8bbb9060&i=Download da website")
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
            btn_download.innerHTML = '<i class="fab fa-android" style="margin-right: 10px;"></i>SCARICA'
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

