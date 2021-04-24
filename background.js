// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
// 	if (message.greeting == "removeCookie") {
// 		sendResponse({ farewell: "cookie clean" });
// 	}
// });

chrome.runtime.onInstalled.addListener(function () {
	chrome.tabs.create(
		{ url: `chrome-extension://${chrome.runtime.id}/options.html` },
		function (tab) {
			console.log("options page opened");
		}
	);
	chrome.storage.sync.set({ ["clickedColor"]: "#3399FF80" });
	chrome.storage.sync.set({ ["fontFamily"]: "Arial" });
	chrome.storage.sync.set({ ["fontTypeButton"]: false });
	chrome.storage.sync.set({ ["fontSizeButton"]: false });
});

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
// 	// if (request.todo == "showPageAction") {
// 	// 	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
// 	// 		chrome.pageAction.show(tabs[0].id);
// 	// 	});
// 	// }
// 	alert(request);
// });

chrome.tabs.onActivated.addListener(function (activeInfo) {
	chrome.storage.sync.get(
		["clickedColor", "fontFamily", "fontTypeButton"],
		function (stored) {
			if (stored.fontTypeButton) {
				chrome.tabs.sendMessage(activeInfo.tabId, {
					todo: "fontFamily",
					fontFamily: stored.fontFamily,
					checkedButton: 1,
				});
			} else {
				chrome.tabs.sendMessage(activeInfo.tabId, {
					todo: "fontFamily",
					checkedButton: 0,
				});
			}
		}
	);
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if (message.todo == "textSelected") {
		console.log(message.textSelected);
		// chrome.tts.speak("Hello ");
		sendResponse({ received: "ok" });
	}
});

chrome.runtime.onConnect.addListener(function (port) {
	var temp;
	console.assert(port.name == "performAction");
	port.onMessage.addListener(function (msg) {
		if (msg.action.includes("open")) {
			temp = msg.action.slice(5);
			if (temp != null && temp !== "undefined") {
				console.log(temp);
				chrome.tabs.create({
					url: temp,
				});
			}
			port.postMessage({ response: "ok" });
		} else if (msg.action.includes("play")) {
			temp = msg.action.slice(5);

			if (temp != null && temp !== "undefined") {
				console.log(temp);
				chrome.tabs.create({
					url: temp,
				});
			}
			port.postMessage({ response: "ok" });
		} else if (msg.action.includes("translate")) {
			console.log(msg);
			temp = msg.res;
			if (temp != null && temp !== "undefined") {
				console.log(temp);
				chrome.tabs.create({
					url: temp,
				});
			}
			port.postMessage({ response: "ok" });
		} else if (msg.action.includes("direction")) {
			temp = msg.action.slice(10);
			if (temp != null && temp !== "undefined") {
				console.log(temp);
				chrome.tabs.create({
					url: temp,
				});
			}
			port.postMessage({ response: "ok" });
		}
	});
});
