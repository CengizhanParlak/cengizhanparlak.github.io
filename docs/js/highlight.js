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

  highlightScript.onload = () => {
    document.head.appendChild(dartScript);
    dartScript.onload = () => {
      highlightCode();
    };
  };
}

function highlightCode() {
  hljs.highlightAll();
  const blocks = document.querySelectorAll("pre code.hljs");
  blocks.forEach((block) => {
    const languageClass = Array.from(block.classList).find((cls) =>
      cls.startsWith("language-")
    );
    const language = languageClass
      ? languageClass.replace("language-", "")
      : "unknown";
    block.parentElement.insertAdjacentHTML(
      "beforebegin",
      `<div class="language-label-div"><label class="language-label">${language}</label></div>`
    );
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadScripts();
});
