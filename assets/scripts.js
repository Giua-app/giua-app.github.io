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

    if(document.title.startsWith("changelog")) {
        buildChangelogForAPI();
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

function buildChangelogForAPI(){
    var div = document.getElementsByTagName("body")[0]

    $.ajax({
        type: "GET",
        async: "false",
        url: "https://api.github.com/repos/giua-app/giua-app/releases",
        success: function(resultData){
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
        }
    })
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


/*
* Animated canvas background
* made by Tuomas Pöyry on https://codepen.io/Munkkeli/pen/PqWBdP
*
var Canvas = document.getElementById('canvas');
var ctx = Canvas.getContext('2d');

var resize = function() {
    Canvas.width = Canvas.clientWidth;
    Canvas.height = Canvas.clientHeight;
};
window.addEventListener('resize', resize);
resize();

var elements = [];
var presets = {};

presets.o = function (x, y, s, dx, dy) {
    return {
        x: x,
        y: y,
        r: 12 * s,
        w: 5 * s,
        dx: dx,
        dy: dy,
        draw: function(ctx, t) {
            this.x += this.dx;
            this.y += this.dy;
            
            ctx.beginPath();
            ctx.arc(this.x + + Math.sin((50 + x + (t / 10)) / 100) * 3, this.y + + Math.sin((45 + x + (t / 10)) / 100) * 4, this.r, 0, 2 * Math.PI, false);
            ctx.lineWidth = this.w;
            ctx.strokeStyle = '#fff';
            ctx.stroke();
        }
    }
};

presets.x = function (x, y, s, dx, dy, dr, r) {
    r = r || 0;
    return {
        x: x,
        y: y,
        s: 20 * s,
        w: 5 * s,
        r: r,
        dx: dx,
        dy: dy,
        dr: dr,
        draw: function(ctx, t) {
            this.x += this.dx;
            this.y += this.dy;
            this.r += this.dr;
            
            var _this = this;
            var line = function(x, y, tx, ty, c, o) {
                o = o || 0;
                ctx.beginPath();
                ctx.moveTo(-o + ((_this.s / 2) * x), o + ((_this.s / 2) * y));
                ctx.lineTo(-o + ((_this.s / 2) * tx), o + ((_this.s / 2) * ty));
                ctx.lineWidth = _this.w;
                ctx.strokeStyle = c;
                ctx.stroke();
            };
            
            ctx.save();
            
            ctx.translate(this.x + Math.sin((x + (t / 10)) / 100) * 5, this.y + Math.sin((10 + x + (t / 10)) / 100) * 2);
            ctx.rotate(this.r * Math.PI / 180);
            
            line(-1, -1, 1, 1, '#fff');
            line(1, -1, -1, 1, '#fff');
            
            ctx.restore();
        }
    }
};

for(var x = 0; x < Canvas.width; x++) {
    for(var y = 0; y < Canvas.height; y++) {
        if(Math.round(Math.random() * 8000) == 1) {
            var s = ((Math.random() * 5) + 1) / 10;
            if(Math.round(Math.random()) == 1)
                elements.push(presets.o(x, y, s, 0, 0));
            else
                elements.push(presets.x(x, y, s, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));
        }
    }
}

setInterval(function() {
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);

    var time = new Date().getTime();
    for (var e in elements)
		elements[e].draw(ctx, time);
}, 10);
*/



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

