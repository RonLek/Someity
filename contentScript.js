// chrome.runtime.sendMessage({ greeting: "removeCookie" }, function (response) {
// 	console.log(response.farewell);
// });

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if (message.todo == "changeColor") {
		$(
			"<style>:not(a), :not(img)  { color: " +
				message.clickedColor +
				"! important; }</style>"
		).appendTo("head");	
	}
});
