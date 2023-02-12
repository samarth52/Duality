console.log("background.js loaded");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.from && request.from == "popup") {
    chrome.storage.local.set({ uid: request.uid });
  } else {
    chrome.storage.local.get("uid", function (data) {
      console.log(data.uid);
    });
    fetch("http://127.0.0.1:8000/api/dummy_article", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(Array.from(request.paras).join("\n")), // body data type must match "Content-Type" header
    }).then((response) => {
      response.json().then((body) => {
        console.log(body);
        fetch(body.data[0])
          .then((response2) => response2.text())
          .then((html) => {
            sendResponse({
              type: "success",
              html: html,
              url: body.data[0],
            });
          });
      });
    });
  }

  return true;
});
