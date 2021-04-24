// [Keep magnifier vars and function before adding chrome message listener]
/*Size is  set in pixels... supports being written as: '250px' */
var magnifierSize = 100;

/*How many times magnification of image on page.*/
var magnification = 3;

function magnifier() {
	this.magnifyImg = function (ptr, magnification, magnifierSize) {
		$("body").prepend('<div class="magnify"></div>');

		var $pointer;
		if (typeof ptr == "string") {
			$pointer = $(ptr);
		} else if (typeof ptr == "object") {
			$pointer = ptr;
		}

		if (!$pointer.is("img")) {
			//   alert('Object must be image.');
			return false;
		}

		magnification = +magnification;

		$pointer.hover(
			function () {
				$(this).css("cursor", "none");
				$(".magnify").show();
				//Setting some variables for later use
				var width = $(this).width();
				var height = $(this).height();
				var src = $(this).attr("src");
				var imagePos = $(this).offset();
				var image = $(this);

				if (magnifierSize == undefined) {
					magnifierSize = "150px";
				}

				$(".magnify").css({
					"background-size":
						width * magnification + "px " + height * magnification + "px",
					"background-image": 'url("' + src + '")',
					width: magnifierSize,
					height: magnifierSize,
				});

				//Setting a few more...
				var magnifyOffset = +($(".magnify").width() / 2);
				var rightSide = +(imagePos.left + $(this).width());
				var bottomSide = +(imagePos.top + $(this).height());

				$(document).mousemove(function (e) {
					if (
						e.pageX < +(imagePos.left - magnifyOffset / 6) ||
						e.pageX > +(rightSide + magnifyOffset / 6) ||
						e.pageY < +(imagePos.top - magnifyOffset / 6) ||
						e.pageY > +(bottomSide + magnifyOffset / 6)
					) {
						$(".magnify").hide();
						$(document).unbind("mousemove");
					}
					var backgroundPos =
						"" -
						((e.pageX - imagePos.left) * magnification - magnifyOffset) +
						"px " +
						-((e.pageY - imagePos.top) * magnification - magnifyOffset) +
						"px";
					$(".magnify").css({
						left: e.pageX - magnifyOffset,
						top: e.pageY - magnifyOffset,
						"background-position": backgroundPos,
					});
				});
			},
			function () {}
		);
	};

	this.removeMagnifier = function (ptr) {
		var $pointer;
		if (typeof ptr == "string") {
			$pointer = $(ptr);
		} else if (typeof ptr == "object") {
			$pointer = ptr;
		}

		if (!$pointer.is("img")) {
			//   alert('Object must be image.');
			return false;
		}

		$pointer.hover(function () {
			$(this).css("cursor", "default");
		});
		$(".magnify").remove();
	};

	this.init = function () {};

	return this.init();
}

var magnify = new magnifier();

var images = document.getElementsByTagName("img");
var imageSource = [];
for (var i = 0; i < images.length; i++) {
	imageSource.push(images[i].src || images[i].srcset);
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	// Changing color of font
	if (message.todo == "fontColor") {
		if (message.checkedButton == 0) {
			$("#i4all-font-color").remove();
		} else {
			if ($("#i4all-font-color") != null) {
				$("#i4all-font-color").remove();
			}
			$(
				"<style id='i4all-font-color'>:not(a), :not(img)  { color: " +
					message.fontColor +
					"! important; }</style>"
			).appendTo("head");
		}
	}

	// Changing Font Family
	if (message.todo == "fontFamily") {
		if (message.checkedButton == 0) {
			$("#i4all-font-family").remove();
		} else {
			if ($("#i4all-font-family") != null) {
				$("#i4all-font-family").remove();
			}
			if (message.fontFamily == "sign-language") {
				$(
					"<link rel='stylesheet' type='text/css' id='i4all-font-family' href='chrome-extension://" +
						chrome.runtime.id +
						"/scripts/css/sign-language.css'>"
				).appendTo("head");
			} else {
				$(
					"<style id='i4all-font-family'> p,a,h1,h2,h4,h3,h5,h6,input,ul,span,strong,th,td,ul,li,ol,button  { font-family: " +
						message.fontFamily +
						"!important; }</style>"
				).appendTo("head");
			}
		}
	}

	// Changing Font Size
	if (message.todo == "fontSize") {
		if (message.checkedButton == 0) {
			$("#i4all-font-size").remove();
		} else {
			if ($("#i4all-font-size") != null) {
				$("#i4all-font-size").remove();
			}
			$(
				"<style id='i4all-font-size'> p,a,h1,h2,h4,h3,h5,h6,input,ul,span,strong,th,td,ul,li,ol,button  { font-size: " +
					message.fontSize.toString() +
					"px" +
					"!important; }</style>"
			).appendTo("head");
		}
	}

	// Magnify Image Feature
	if (message.todo == "magnify") {
		if (message.checkedButton == 0) {
			magnify.removeMagnifier("img");
		} else {
			magnify.magnifyImg("img", magnification, magnifierSize);
		}
	}

	// Image Veil
	if (message.todo == "imageVeil") {
		if (message.checkedButton == 0) {
			for (var i = 0; i < images.length; i++) {
				images[i].src = imageSource[i];
			}
		} else {
			for (var i = 0, l = images.length; i < l; i++) {
				images[i].removeAttribute("srcset");
				images[i].src =
					"https://via.placeholder.com/" +
					images[i].width +
					"x" +
					images[i].height +
					"?text=" +
					images[i].alt.replace(/ /g, "+");
			}
		}
	}

	// Highlight Words
	if (message.todo == "highlight") {
		if (message.checkedButton == 0) {
			var paragraphs = document.getElementsByTagName("p");
			for (var i = 0; i < paragraphs.length; i++) {
				paragraphs[i].classList.remove("word_split");
			}
		} else {
			$(document).ready(function () {
				var paragraphs = document.getElementsByTagName("p");
				for (var i = 0; i < paragraphs.length; i++) {
					paragraphs[i].classList.add("word_split");
				}
				$(".word_split").lettering("words");
			});
		}
	}
	if (message.todo == "speakTTS") {
		var msg = new SpeechSynthesisUtterance();
		msg.text = message.selectedText;
		window.speechSynthesis.speak(msg);
	}
});

// Getting highlighted Text
function getSelectedText() {
	var text = "";
	if (typeof window.getSelection != "undefined") {
		text = window.getSelection().toString();
	} else if (
		typeof document.selection != "undefined" &&
		document.selection.type == "Text"
	) {
		text = document.selection.createRange().text;
	}
	return text;
}

function returingSelectedText() {
	var selectedText = getSelectedText();
	if (selectedText) {
		// chrome.runtime.sendMessage(
		//   {
		//     todo: "textSelected",
		//     textSelected: selectedText,
		//   },
		//   function (response) {
		//     console.log(response);
		//   }
		// );
	}
	// if (selectedText) {
	// 	alert("Got selected text " + selectedText);
	// }
}

document.onmouseup = returingSelectedText;
document.onkeyup = returingSelectedText;

// TTS
$("body").attr("id", "textToSelect");
$(document).ready(function () {
	function tweetButtonClick() {
		let selectedText = document.getSelection().toString();
		/*window.open(
		"https://twitter.com/intent/tweet?url=https://www.linkedin.com/in/harsha-vardhan-ch-245197bb/&text=" +
		  selectedText
	  );*/
		console.log("This is your selected text: ", selectedText);
	}

	const textSelectionTooltipContainer = document.createElement("div");
	textSelectionTooltipContainer.setAttribute(
		"id",
		"textSelectionTooltipContainer"
	);
	textSelectionTooltipContainer.innerHTML = `<button id="textShareTwitterBtn">TWEET</button>`;
	const bodyElement = document.getElementsByTagName("BODY")[0];

	$("body").on("click", "#textShareTwitterBtn", tweetButtonClick);

	bodyElement.addEventListener("mouseup", function (e) {
		var textu = document.getSelection().toString();
		if (!textu.length) {
			textSelectionTooltipContainer.remove();
		}
	});

	document
		.getElementById("textToSelect")
		.addEventListener("mouseup", function (e) {
			let textu = document.getSelection().toString();
			let matchu = /\r|\n/.exec(textu);
			if (textu.length && !matchu) {
				let range = document.getSelection().getRangeAt(0);
				rect = range.getBoundingClientRect();
				scrollPosition = $(window).scrollTop();
				containerTop = scrollPosition + rect.top - 50 + "px";
				containerLeft = rect.left + rect.width / 2 - 50 + "px";
				textSelectionTooltipContainer.style.transform =
					"translate3d(" + containerLeft + "," + containerTop + "," + "0px)";
				bodyElement.appendChild(textSelectionTooltipContainer);
			}
		});
});
