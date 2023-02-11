const article = document.querySelector("article");

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
  const text = article.querySelectorAll("p");
  const paras = Array.from(text).map((para) => para.textContent);

  // Send the paras variable to the popup script.
  chrome.runtime.sendMessage({ paras: paras });
}
