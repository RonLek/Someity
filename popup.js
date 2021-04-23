// Changing Color of font
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

// Receiving the response from selected text
var selectedText = "";
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
// 	if (message.todo == "textSelected") {
// 		if (selectedText != message.textSelected) {
// 			selectedText = message.textSelected;
// 			console.log(message.textSelected);
// 		}
// 	}
// });
