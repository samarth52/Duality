console.log("background.js loaded");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request.from);
  if (request.from && request.from == "popup") {
    if (request.signOut) {
      chrome.storage.local.remove("id");
      return true;
    }
    fetch("https://backend-yfr22mc5la-ue.a.run.app/api/login", {
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
      body: JSON.stringify({ uid: request.uid }), 
    }).then((response) => {
      response.json().then((body) => {
        console.log(body);
        chrome.storage.local.set({ id: body.id });
      })
    });
  } else {
    chrome.storage.local.get("id", function (data) {
      console.log(data);
      if (!data.id) {
        return true;
      } else {
        if (request.type && request.type == "suggestion") {
          fetch("https://backend-yfr22mc5la-ue.a.run.app/api/recommendation_click", {
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
            body: JSON.stringify({id: data.id, originalLink: request.url}), // body data type must match "Content-Type" header
          });
          return true;
        }
        fetch("https://backend-yfr22mc5la-ue.a.run.app/api/new_article", {
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
          body: JSON.stringify({id: data.id, url: request.url, text: Array.from(request.paras).join("\n")}), // body data type must match "Content-Type" header
        }).then((response) => {
          response.json().then((body) => {
            console.log(body);
            fetch(body.oppositeLink)
              .then((response2) => response2.text())
              .then((html) => {
                sendResponse({
                  type: "success",
                  html: html,
                  url: body.oppositeLink,
                  originalUrl: request.url,
                });
              });
          });
        });
      }
    });
  }

  return true;
});
