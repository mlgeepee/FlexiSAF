const domList = document.getElementById("dom-list");
const addNodeBtn = document.getElementById("add-node");
const removeNodeBtn = document.getElementById("remove-node");

const selectIdBtn = document.getElementById("select-id");
const selectClassBtn = document.getElementById("select-class");
const selectTagBtn = document.getElementById("select-tag");
const resetSelectorsBtn = document.getElementById("reset-selectors");

const eventButton = document.getElementById("event-button");
const liveInput = document.getElementById("live-input");
const inputPreview = document.querySelector("#input-preview span");
const keyPreview = document.querySelector("#key-preview span");
const clickCount = document.querySelector("#click-count span");

const callbackButton = document.getElementById("run-callback");
const callbackStatus = document.getElementById("callback-status");

let nodeCount = domList.children.length;
let buttonClicks = 0;

addNodeBtn.addEventListener("click", () => {
  nodeCount += 1;
  const newItem = document.createElement("li");
  newItem.textContent = `Node ${nodeCount}: Added with createElement()`;
  domList.appendChild(newItem);
});

removeNodeBtn.addEventListener("click", () => {
  if (domList.lastElementChild) {
    domList.removeChild(domList.lastElementChild);
    nodeCount -= 1;
  }
});

function clearHighlights() {
  document.querySelectorAll(".highlight").forEach((element) => {
    element.classList.remove("highlight");
  });
}

selectIdBtn.addEventListener("click", () => {
  clearHighlights();
  const byId = document.getElementById("target-id");
  byId.classList.add("highlight");
});

selectClassBtn.addEventListener("click", () => {
  clearHighlights();
  const byClass = document.getElementsByClassName("target-class");
  Array.from(byClass).forEach((element) => element.classList.add("highlight"));
});

selectTagBtn.addEventListener("click", () => {
  clearHighlights();
  const byTag = document.querySelectorAll("p");
  byTag.forEach((paragraph) => paragraph.classList.add("highlight"));
});

resetSelectorsBtn.addEventListener("click", clearHighlights);

eventButton.addEventListener("click", () => {
  buttonClicks += 1;
  clickCount.textContent = buttonClicks;
});

liveInput.addEventListener("input", (event) => {
  inputPreview.textContent = event.target.value || "Nothing yet";
});

document.addEventListener("keydown", (event) => {
  keyPreview.textContent = event.key;
});

function doAsyncTask(message, callback) {
  callbackStatus.textContent = "Status: Processing async task...";

  setTimeout(() => {
    callback(message);
  }, 1200);
}

callbackButton.addEventListener("click", () => {
  doAsyncTask("Callback executed successfully.", (result) => {
    callbackStatus.textContent = `Status: ${result}`;
  });
});
