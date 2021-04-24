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

$("#fontTypeButton").bind("change", function () {
	if ($(this).is(":checked")) {
		document.getElementById("font-type-switch-header").textContent="On";
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {
				todo: "fontFamily",
				fontFamily: $("#fontTypeDropDown").val(),
				checkedButton: 1,
			});
		});
	} else {
		document.getElementById("font-type-switch-header").textContent="Off";
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {
				todo: "fontFamily",
				checkedButton: 0,
			});
		});
	}
});
