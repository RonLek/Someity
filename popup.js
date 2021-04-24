// On popup load function
$(function () {
	chrome.storage.sync.get("clickedColor", function (stored) {
		$("#fontColor").val(stored.clickedColor);
	});

	chrome.storage.sync.get("fontFamily", function (stored) {
		$("#fontTypeDropDown").val(stored.fontFamily);
	});

	chrome.storage.sync.get("fontTypeButton", function (stored) {
		$("#fontTypeButton").prop("checked", stored.fontTypeButton);
		if (stored.fontTypeButton) {
			document.getElementById("font-type-switch-header").textContent = "On";
		} else {
			document.getElementById("font-type-switch-header").textContent = "Off";
		}
	});

	chrome.storage.sync.get("fontSizeButton", function (stored) {
		$("#fontSizeButton").prop("checked", stored.fontSizeButton);

		if (stored.fontSizeButton) {
			document.getElementById("font-size-switch-header").textContent = "On";
		} else {
			document.getElementById("font-size-switch-header").textContent = "Off";
		}
	});

	// Font Slider Setting
	chrome.storage.sync.get("fontSizeSlider", function (stored) {
		$("#fontSizeSlider_value").html(stored.fontSizeSlider);
		$("#fontSizeSlider").val(stored.fontSizeSlider);
	});

	// Changing Color of font
	// var color = $("#fontColor").val();
	// $("#fontColor").on("change paste keyup", function () {
	// 	color = $(this).val();
	// });
	// $("#btnChange").click(function () {
	// 	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	// 		chrome.tabs.sendMessage(tabs[0].id, {
	// 			todo: "changeColor",
	// 			clickedColor: color,
	// 		});
	// 	});
	// 	chrome.storage.sync.set({ ["clickedColor"]: color });
	// });
	// $("#assistant_start").click();
	// var color = $("#fontColor").val();
	// $("#fontColor").on("change paste keyup", function () {
	// 	color = $(this).val();
	// });
	// $("#btnChange").click(function () {
	// 	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	// 		chrome.tabs.sendMessage(tabs[0].id, {
	// 			todo: "changeColor",
	// 			clickedColor: color,
	// 		});
	// 	});
	// });
});

// Font Type || Font Family button bind
$("#fontTypeButton").bind("change", function () {
	if ($(this).is(":checked")) {
		console.log($("#fontTypeDropDown").val());
		document.getElementById("font-type-switch-header").textContent = "On";
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {
				todo: "fontFamily",
				fontFamily: $("#fontTypeDropDown").val(),
				checkedButton: 1,
			});
		});
	} else {
		document.getElementById("font-type-switch-header").textContent = "Off";
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {
				todo: "fontFamily",
				checkedButton: 0,
			});
		});
	}
	chrome.storage.sync.set({ ["fontFamily"]: $("#fontTypeDropDown").val() });
	chrome.storage.sync.set({ ["fontTypeButton"]: $(this).is(":checked") });
});

// Font Type || Font Family drop down bind
$("#fontTypeDropDown").change(function (data) {
	if ($("#fontTypeButton").is(":checked")) {
		console.log($(data.target).val());
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {
				todo: "fontFamily",
				fontFamily: $(data.target).val(),
				checkedButton: 1,
			});
		});
	} else {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {
				todo: "fontFamily",
				checkedButton: 0,
			});
		});
	}
	chrome.storage.sync.set({ ["fontFamily"]: $(data.target).val() });
	// chrome.storage.sync.set({
	// 	["fontTypeButton"]: $("#fontTypeButton").is(":checked"),
	// });
});

//Font Size Slider
$(document).on("input", "#fontSizeSlider", function (data) {
	$("#fontSizeSlider_value").html($(data.target).val());
	if ($("#fontSizeButton").is(":checked")) {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {
				todo: "fontSize",
				fontSize: $(data.target).val(),
				checkedButton: 1,
			});
		});
	} else {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {
				todo: "fontSize",
				checkedButton: 0,
			});
		});
	}
	chrome.storage.sync.set({ ["fontSizeSlider"]: $(data.target).val() });
});

//Font Size Slider Button
$("#fontSizeButton").bind("change", function (data) {
	if ($(data.target).is(":checked")) {
		document.getElementById("font-size-switch-header").textContent = "On";
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {
				todo: "fontSize",
				fontSize: $("#fontSizeSlider").val(),
				checkedButton: 1,
			});
		});
	} else {
		document.getElementById("font-size-switch-header").textContent = "Off";
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {
				todo: "fontSize",
				checkedButton: 0,
			});
		});
	}
	chrome.storage.sync.set({ ["fontSizeSlider"]: $("#fontSizeSlider").val() });
	chrome.storage.sync.set({
		["fontSizeButton"]: $(data.target).is(":checked"),
	});
});

// Speech Recognition
const startButton = document.getElementsByClassName("activation-button")[0];
startButton.addEventListener("click", function () {
	startTracking();
});

var recognition,
	isStopButtonClicked = false;

const startRecog = () => {
	recognition = new webkitSpeechRecognition();
	recognition.continuous = false;
	recognition.interimResults = true;
	recognition.lang = "en-US";

	recognition.onresult = (event) => {
		let last = event.results.length - 1;
		let lastTranscript = event.results[last][0].transcript;
		let interim_transcript = "";
		let final_transcript = "";

		for (var i = event.resultIndex; i < event.results.length; ++i) {
			// Verify if the recognized text is the last with the isFinal property
			if (event.results[i].isFinal) {
				final_transcript += event.results[i][0].transcript;
			} else {
				interim_transcript += event.results[i][0].transcript;
			}
		}
		// console.log(final_transcript);
		if (final_transcript != "" && final_transcript !== "undefined") {
			sendResult(final_transcript.toLowerCase());
		}
	};

	recognition.onerror = (event) => {
		console.log("error", event.error);
		if (event.error === "not-allowed") {
			const errorMessage =
				"AudioCapture permission has been blocked because of a Feature Policy applied to the current document. See https://goo.gl/EuHzyv for more details.";
			chrome.runtime.sendMessage({ error: errorMessage });
			isStopButtonClicked = true;
			recognition.stop();
		}
	};

	recognition.onspeechstart = (event) => console.log("speech started");
	recognition.onspeechend = (event) => stopTracking();
	recognition.onend = function (event) {
		if (isStopButtonClicked) {
			stopTracking();
		} else {
			startTracking();
		}
	};
};

const startTracking = () => recognition.start();

const stopTracking = () => {
	recognition.stop();
};

startRecog();

function sendResult(data) {
	console.log(data);
	var result;
	var port = chrome.runtime.connect({ name: "performAction" });
	if (data.includes("open")) {
		var temp = data.slice(5);
		if (temp != null && temp !== "undefined") {
			if (temp == "google") {
				result = "https://www.google.com";
			} else if (temp == "facebook") {
				result = "https://www.facebook.com";
			} else if (temp == "youtube.com") {
				result = "https://www.youtube.com";
			} else if (temp == "wikipedia") {
				result = "https://www.wikipedia.com";
			} else {
				result = "https://www.google.com/search?q=" + temp;
			}
			port.postMessage({ action: "open " + result });
			port.onMessage.addListener(function (msg) {
				if (msg.response == "ok") {
				}
			});
		}
	} else if (data.includes("play")) {
		var temp = data.slice(5);
		if (temp != null && temp !== "undefined") {
			result = "https://www.youtube.com/results?search_query=" + temp;
			port.postMessage({ action: "play " + result });
			port.onMessage.addListener(function (msg) {
				if (msg.response == "ok") {
				}
			});
		}
	} else if (data.includes("translate")) {
		var temp = data.slice(9);
		if (temp != null && temp !== "undefined") {
			result =
				"https://translate.google.com/?sl=auto&tl=en&text=" +
				temp +
				"&op=translate";
			port.postMessage({ action: "translate ", res: result });
			port.onMessage.addListener(function (msg) {
				if (msg.response == "ok") {
				}
			});
		}
	} else if (data.includes("to")) {
		var temp = data.split("to");
		console.log(temp);
		if (temp != null && temp !== "undefined") {
			result =
				"https://www.google.com/maps/dir/" +
				temp[0].trim() +
				"/" +
				temp[1].trim();
			port.postMessage({ action: "direction " + result });
			port.onMessage.addListener(function (msg) {
				if (msg.response == "ok") {
				}
			});
		}
	}
}

var colors = [
	"#1FBC9C",
	"#1CA085",
	"#2ECC70",
	"#27AF60",
	"#3398DB",
	"#2980B9",
	"#A463BF",
	"#3D556E",
	"#222F3D",
	"#F2C511",
	"#F39C19",
	"#E84A3C",
	"#C0382B",
	"#DDE6E8",
	"#BDC3C8",
];

for (var i = 0; i < colors.length; i++) {
	var input = document.createElement("input");
	input.type = "radio";
	input.name = "color";
	input.id = "color-" + i;
	if (i == 0) {
		input.value = "color-" + i;
	}
	var label = document.createElement("label");
	label.htmlFor = "color-" + i;
	var span = document.createElement("span");
	span.setAttribute("class", "color-" + i);
	span.setAttribute("style", "background-color:" + colors[i]);
	label.appendChild(span);
	document.getElementsByClassName("color-picker")[0].appendChild(input);
	document.getElementsByClassName("color-picker")[0].appendChild(label);
}
