const article = document.querySelector("article");

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
  const text = article.querySelectorAll("p");
  const paras = Array.from(text).map((para) => para.textContent);
  const body = document.querySelector("body");
  const img_url = chrome.runtime.getURL("images/duality_icon.png");
  const popup = `
  <div class="duality_popup">
    <div class="duality_popup_header_container">
      <img src="${img_url}" class="duality_popup_primary_icon"></img>
    </div>
    
  </div>
  <style>
    .duality_popup {
      position: fixed;
      bottom: 10px;
      right: 10px;
      background-color: #EAEAEA;
      display: flex;
      flex-direction: column;
      z-index: 9999;
      font-family: 'Outfit', sans-serif;
      border-radius: 20px;
      align-items: center;
      transition: 0.2s;
    }

    .duality_popup:hover > .duality_added_links_container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      
    }

    .duality_popup:hover {
      height: 200px;
      padding-bottom: 15px;
    }

    .duality_popup_header_container {
      display: flex;
      align-items: center;
      color: #000;
      padding: 10px;
      border-radius: 100px;
    }

    .duality_popup_primary_icon {
      transition: 0.2s;
      width: 50px
    }
  </style>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">`;
  body.insertAdjacentHTML("beforeend", popup);
  
  // send the paras to the background script
  (async () => {
    chrome.runtime.sendMessage({ paras: paras, url: location.href }).then((response) => {
      if (response.type == "success") {
        const openMessage = `
        <div class="duality_open_message">Hear from the other side 👀</div>
        <style>
          .duality_open_message {
            padding-left: 10px;
            padding-right: 10px;
            font-size: 20px;
            color: #000;
          }
        </style>`;
        document
          .querySelector(".duality_popup_header_container")
          .insertAdjacentHTML("beforeend", openMessage);

        var parser = new DOMParser();
        var doc = parser.parseFromString(response.html, "text/html");

        var title = doc
          .querySelector("meta[property='og:title']")
          .getAttribute("content");
        var image = doc
          .querySelector("meta[property='og:image']")
          .getAttribute("content");
        const added_links_container = `
        <div class="duality_added_links_container">
          <div class="duality_article_title"><a href="${response.url}">${title}</a></div>
          <img src="${image}" class="duality_link_image"></img>
        </div>
        
        <style>
          .duality_added_links_container {
            display: None;
            padding: 20px;
            position: relative;
            color: #FFF;
            width: 90%;
            height: 150px;
            border-radius: 8px;
            overflow: hidden;
          }
      
          .duality_link_image {
            width: 100%;
            object-fit: cover;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 998;
          }
      
          .duality_article_title {
            font-size: 20px;
            position: absolute;
            bottom: 10px;
            left: 5px;
            z-index: 999;
          }

          a {
            text-decoration: none;
            color: inherit;
          }
        </style>`;
        const pop = document.querySelector(".duality_popup");
        pop.insertAdjacentHTML("beforeend", added_links_container);
      }
    });
  })();
  // chrome.runtime.sendMessage({ paras: paras }).then((response) => {
  //   console.log(response);
  //   document.querySelector(".duality_open_message").innerHTML = response;
  // });
}
