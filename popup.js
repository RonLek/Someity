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
});

// Font color - palette
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
  if(i== 0 )
  {
	input.value = "color-" + i;
  }
  var label = document.createElement("label");
  label.htmlFor = "color-"+i;
  var span = document.createElement("span")
  span.setAttribute("class", "color-"+i);
  span.setAttribute("style", "background-color:"+colors[i])
  label.appendChild(span)
  document.getElementsByClassName("color-picker")[0].appendChild(input)
  document.getElementsByClassName("color-picker")[0].appendChild(label)
}
