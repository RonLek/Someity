
// Changing color of font
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if (message.todo == "changeColor") {
		if ($("#i4all-color-changer") == null) {
			$(
				"<style id='i4all-color-changer'>:not(a), :not(img)  { color: " +
					message.clickedColor +
					"! important; }</style>"
			).appendTo("head");
		} else {
			$("#i4all-color-changer").remove();
			$(
				"<style id='i4all-color-changer'>:not(a), :not(img)  { color: " +
					message.clickedColor +
					"! important; }</style>"
			).appendTo("head");
		}
	}
	if (message.todo == "fontFamily") {
		console.log(message);
		if (message.checkedButton == 0) {
			$("#i4all-font-family").remove();
		} else {
			if ($("#i4all-font-family") != null) {
				$("#i4all-font-family").remove();
			}
			if (message.fontFamily == "sign-language") {
				$(
					"<link rel='stylesheet' type='text/css' id='i4all-font-family' href='chrome-extension://bgfcegoaicoaioeabfkmpjpekpdkllml/scripts/css/sign-language.css'>"
				).appendTo("head");
			}
		}
	}
});

// Getting highlighted Text
function getSelectedText() {
	var text = "";
	if (typeof window.getSelection != "undefined") {
		text = window.getSelection().toString();
	} else if (
		typeof document.selection != "undefined" &&
		document.selection.type == "Text"
	) {
		text = document.selection.createRange().text;
	}
	return text;
}

function returingSelectedText() {
	var selectedText = getSelectedText();
	if (selectedText) {
		chrome.runtime.sendMessage(
			{
				todo: "textSelected",
				textSelected: selectedText,
			},
			function (response) {
				console.log(response);
			}
		);
	}
	// if (selectedText) {
	// 	alert("Got selected text " + selectedText);
	// }
}

document.onmouseup = returingSelectedText;
document.onkeyup = returingSelectedText;

// Hides all images
var images = document.getElementsByTagName('img');
for (var i = 0, l = images.length; i < l; i++) {
	images[i].removeAttribute("srcset")
  images[i].src = 'https://via.placeholder.com/' + images[i].width + 'x' + images[i].height + '?text='+images[i].alt.replace(/ /g, "+");;
}

