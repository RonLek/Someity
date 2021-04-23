// Hides all images
var images = document.getElementsByTagName('img');
for (var i = 0, l = images.length; i < l; i++) {
	images[i].removeAttribute("srcset")
  images[i].src = 'https://via.placeholder.com/' + images[i].width + 'x' + images[i].height + '?text='+images[i].alt.replace(/ /g, "+");;
}