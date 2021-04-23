chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if (message.greeting == "removeCookie") {
		sendResponse({ farewell: "cookie clean" });
	}
});

// chrome.runtime.onInstalled.addListener(function () {
// 	chrome.storage.sync.set({ color: "#3aa757" }, function () {
// 		console.log("The color is green.");
// 	});
// });

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
// 	// if (request.todo == "showPageAction") {
// 	// 	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
// 	// 		chrome.pageAction.show(tabs[0].id);
// 	// 	});
// 	// }
// 	alert(request);
// });
