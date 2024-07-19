const highlightStyleUrl =
  "https://unpkg.com/@highlightjs/cdn-assets@11.9.0/styles/atom-one-dark.css";
const highlightScriptUrl =
  "https://unpkg.com/@highlightjs/cdn-assets@11.9.0/highlight.min.js";
const dartScriptUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/dart.min.js";

function loadScripts() {
  const highlightStyle = document.createElement("link");
  highlightStyle.rel = "stylesheet";
  highlightStyle.href = highlightStyleUrl;

  const highlightScript = document.createElement("script");
  highlightScript.src = highlightScriptUrl;

  const dartScript = document.createElement("script");
  dartScript.src = dartScriptUrl;

  document.head.appendChild(highlightStyle);
  document.head.appendChild(highlightScript);
  document.head.appendChild(dartScript);

  highlightScript.onload = () => {
    dartScript.onload = () => {
      highlightCode();
    };
  };
}

function highlightCode() {
  hljs.highlightAll();
  addEventListener("load", function () {
    var blocks = document.querySelectorAll("pre code.hljs");
    Array.prototype.forEach.call(blocks, function (block) {
      var language = block.result.language;
      block.parentElement.insertAdjacentHTML(
        "beforeBegin",
        `<div class="language-label-div"><label class="language-label">${language}</label></div>`
      );
    });
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  loadScripts();
});
