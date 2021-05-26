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
  chrome.storage.sync.set({ ["fontColorButton"]: false });
  chrome.storage.sync.set({ ["fontColor"]: "#C0382B" });
  chrome.storage.sync.set({ ["fontColorId"]: "color-12" });
  chrome.storage.sync.set({ ["magnifyButton"]: false });
  chrome.storage.sync.set({ ["imageVeilButton"]: false });
  chrome.storage.sync.set({ ["highlightWordsButton"]: false });
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
    [
      "fontFamily",
      "fontTypeButton",
      "fontSizeButton",
      "fontSizeSlider",
      "fontColorButton",
      "fontColor",
      "magnifyButton",
      "highlightWordsButton",
      "imageVeilButton",
    ],
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

      console.log("Stored = ", stored);
      if (stored.fontSizeButton) {
        chrome.tabs.sendMessage(activeInfo.tabId, {
          todo: "fontSize",
          fontSize: stored.fontSizeSlider,
          checkedButton: 1,
        });
      } else {
        chrome.tabs.sendMessage(activeInfo.tabId, {
          todo: "fontSize",
          checkedButton: 0,
        });
      }

      if (stored.fontColorButton) {
        chrome.tabs.sendMessage(activeInfo.tabId, {
          todo: "fontColor",
          fontColor: stored.fontColor,
          checkedButton: 1,
        });
      } else {
        chrome.tabs.sendMessage(activeInfo.tabId, {
          todo: "fontColor",
          checkedButton: 0,
        });
      }

      chrome.tabs.sendMessage(activeInfo.tabId, {
        todo: "magnify",
        checkedButton: stored.magnifyButton ? 1 : 0,
      });

      chrome.tabs.sendMessage(activeInfo.tabId, {
        todo: "imageVeil",
        checkedButton: stored.imageVeilButton ? 1 : 0,
      });

      chrome.tabs.sendMessage(activeInfo.tabId, {
        todo: "highlight",
        checkedButton: stored.highlightWordsButton ? 1 : 0,
      });
    }
  );
});

chrome.runtime.onConnect.addListener(function (port) {
  var temp;
  console.assert(port.name == "performAction");
  port.onMessage.addListener(function (msg) {
    if (msg.action == "open") {
      temp = msg.result;
      if (temp != null && temp !== "undefined") {
        console.log(temp);
        chrome.tabs.create({
          url: temp,
        });
      }
      port.postMessage({ response: "ok" });
    } else if (msg.action == "play") {
      temp = msg.result;

      if (temp != null && temp !== "undefined") {
        console.log(temp);
        chrome.tabs.create({
          url: temp,
        });
      }
      port.postMessage({ response: "ok" });
    } else if (msg.action == "translate") {
      temp = msg.result;
      if (temp != null && temp !== "undefined") {
        console.log(temp);
        chrome.tabs.create({
          url: temp,
        });
      }
      port.postMessage({ response: "ok" });
    } else if (msg.action == "direction") {
      temp = msg.result;
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

var menuItem = {
  id: "Speak",
  title: "Speak",
  contexts: ["selection"],
};

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function (clickData, tabdata) {
  if (clickData.menuItemId == "Speak" && clickData.selectionText) {
    chrome.tabs.sendMessage(tabdata.id, {
      todo: "speakTTS",
      selectedText: clickData.selectionText,
    });
  }
});

// Chrome on startup
