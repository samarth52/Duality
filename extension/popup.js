// Listen for messages from content script here.
console.log("popup.js");
chrome.runtime.onMessage.addListener((message) => {
  // select the element with class pathname and set its text to the message
  const element = document.querySelector(".pathname");
  element.innerHTML = Array.from(message).join("\n");
  console.log(Array.from(message).join("\n"));
});
