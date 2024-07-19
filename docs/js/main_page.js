const enabledClass = "enabled";
const disabledClass = "disabled";
const selectedClass = "selected";
let lastSection;
let lastButton;

function addAfterContentLoadListener(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
}

function initFirstValues() {
  lastButton = document.getElementById("experience-button");
  lastSection = document.getElementById("experience-summary");
}

function addButtonListeners() {
  const expButton = document.getElementById("experience-button");
  const projButton = document.getElementById("projects-button");
  const blogButton = document.getElementById("blog-button");
  const blogSection = document.getElementById("blog-posts-summary");
  const projSection = document.getElementById("projects-summary");
  const expSection = document.getElementById("experience-summary");

  expButton.addEventListener("click", function () {
    enableSection(expButton, expSection);
  });
  projButton.addEventListener("click", function () {
    enableSection(projButton, projSection);
  });
  blogButton.addEventListener("click", function () {
    enableSection(blogButton, blogSection);
  });
}

function enableSection(button, section) {
  if (button.classList.contains(selectedClass) && button.id === "blog-button") {
    window.location.href = "blog";
    return;
  }
  console.log("enabling section");
  disableLastSection();
  disableButton();
  section.classList.add(enabledClass);
  section.classList.remove(disabledClass);
  colorButton(button);
  assignLastValues(button, section);
}

function colorButton(button) {
  button.classList.add(selectedClass);
}

function assignLastValues(button, section) {
  lastButton = button;
  lastSection = section;
}

function disableButton() {
  if (lastButton) {
    lastButton.classList.remove(selectedClass);
  }
}

function disableLastSection() {
  if (lastSection) {
    lastSection.classList.add(disabledClass);
    lastSection.classList.remove(enabledClass);
  }
}

initFirstValues();
addAfterContentLoadListener(addButtonListeners);
