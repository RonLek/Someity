// console.log("try trigger authorization");
// navigator.mediaDevices
// 	.getUserMedia({ audio: true, video: false })
// 	.then((mediaStream) => {
// 		//in promise will be triggered user permission request
// 		console.log("Done");
// 		chrome.storage.sync.set({
// 			["recognition"]: true,
// 		});
// 		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
// 			chrome.tabs.sendMessage(tabs[0].id, {
// 				todo: "startRecog",
// 			});
// 		});
// 	})
// 	.catch((error) => {
// 		//manage error
// 		console.log("error");
// 	});

navigator.mediaDevices
	.getUserMedia({ audio: true })
	.then(function (stream) {
		stream.getTracks().forEach(function (track) {
			track.stop();
		});

		// close();
	})
	.catch(function (error) {
		alert("Error : Microphone Access Required");
	});
