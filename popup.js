// function getSelectedText() {
// 	var text = "";
// 	if (typeof window.getSelection != "undefined") {
// 		text = window.getSelection().toString();
// 	} else if (
// 		typeof document.selection != "undefined" &&
// 		document.selection.type == "Text"
// 	) {
// 		text = document.selection.createRange().text;
// 	}
// 	return text;
// }

// function doSomethingWithSelectedText() {
// 	var selectedText = getSelectedText();
// 	if (selectedText) {
// 		alert("Got selected text " + selectedText);
// 	}
// }

// document.onmouseup = doSomethingWithSelectedText;
// document.onkeyup = doSomethingWithSelectedText;

$(function () {
	var color = $("#fontColor").val();
	$("#fontColor").on("change paste keyup", function () {
		color = $(this).val();
	});
	$("#btnChange").click(function () {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {
				todo: "changeColor",
				clickedColor: color,
			});
		});
	});
});
