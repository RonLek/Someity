chrome.runtime.sendMessage({ greeting: "removeCookie" }, function (response) {
	console.log(response.farewell);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.todo == "changeColor") {
		$("body").css("color", request.clickedColor + "!important");
	}
});
