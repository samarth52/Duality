console.log("background.js loaded");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  fetch(
    "https://www.npr.org/2023/02/11/1156305956/earthquake-survivors-in-northern-syria-already-ravaged-by-war-are-unable-to-rece"
  )
    .then((response) => response.text())
    .then((html) => {
      sendResponse({
        type: "success",
        html: html,
        url: "https://www.npr.org/2023/02/11/1156305956/earthquake-survivors-in-northern-syria-already-ravaged-by-war-are-unable-to-rece",
      });
    });
  return true;
});
