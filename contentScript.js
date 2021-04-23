// Changing color of font
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if (message.todo == "changeColor") {
		$(
			"<style>:not(a), :not(img)  { color: " +
				message.clickedColor +
				"! important; }</style>"
		).appendTo("head");
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
