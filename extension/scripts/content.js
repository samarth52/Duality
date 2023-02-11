const article = document.querySelector("article");

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
  const text = article.querySelectorAll("p");
  const paras = Array.from(text).map((para) => para.textContent);
  const body = document.querySelector("body");
  const img_url = chrome.runtime.getURL("images/duality_icon.png");
  const popup = `
  <div class="duality_popup">
    <img src="${img_url}" class="duality_popup_primary_icon"></img>
    <h1 class="duality_open_message"></h1>
  </div>
  <style>
    .duality_popup {
      position: fixed;
      bottom: 10px;
      right: 10px;
      background-color: #181818;
      display: flex;
      z-index: 9999;
      font-family: 'Outfit', sans-serif;
      border-radius: 100px;
      align-items: center;
    }
    h1 {
      color: #fff;
      padding: 15px;
    }
    .duality_popup_primary_icon {
      transition: 0.2s;
    }
  </style>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">`;
  body.insertAdjacentHTML("beforeend", popup);
  // send the paras to the background script
  (async () => {
    const response = await chrome.runtime.sendMessage({ paras: paras });
    console.log(response);
    document.querySelector(".duality_open_message").innerHTML = response;
  })();
  // chrome.runtime.sendMessage({ paras: paras }).then((response) => {
  //   console.log(response);
  //   document.querySelector(".duality_open_message").innerHTML = response;
  // });
}
