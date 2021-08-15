const menuToggler = document.querySelector("#menuToggler");
menuToggler.addEventListener("click", (e) => {
  const menu = document.querySelector("#menu");
  menu.classList.toggle("hidden");
});

const shortenForm = document.querySelector("#shortenForm");
shortenForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const shortenInput = document.querySelector("#linkInput");

  if (!shortenInput.value) {
    const errorMessage = document.querySelector(".error-message");

    shortenInput.classList.add("error");
    errorMessage.classList.remove("hidden");

    return;
  }

  buttonLoading();

  getData(shortenInput.value).then((data) => {
    buttonLoaded();

    if (!data.ok) {
      return alert(data.error);
    }

    const original = data.result.original_link;
    const shorten = data.result.full_short_link;

    localStorage.setItem(original, shorten);

    location.reload();
  });
});

async function getData(link) {
  const res = await fetch("https://api.shrtco.de/v2/shorten?url=" + link);
  return res.json();
}

function buttonLoading() {
  const shortenButton = document.querySelector("#shortenButton");

  shortenButton.setAttribute("disabled", true);
  shortenButton.classList.add("loading");
  shortenButton.textContent = "Shortening...";
}

function buttonLoaded() {
  const shortenButton = document.querySelector("#shortenButton");

  shortenButton.classList.remove("loading");
  shortenButton.textContent = "Shorten";
  shortenButton.removeAttribute("disabled");
}

function displayResult(index) {
  const key = localStorage.key(index);

  const resultBox = document.querySelector("#result");

  const resultWrapper = document.createElement("div");
  resultWrapper.classList.add("result-wrapper");

  const original = document.createElement("div");
  original.classList.add("original");
  resultWrapper.appendChild(original);

  const originalLink = document.createElement("p");
  originalLink.textContent = key;
  original.appendChild(originalLink);

  const shorten = document.createElement("div");
  shorten.classList.add("shorten");
  resultWrapper.appendChild(shorten);

  const shortenLink = document.createElement("p");
  shortenLink.classList.add("shorten-link");
  shortenLink.textContent = localStorage.getItem(key);
  shorten.appendChild(shortenLink);

  const copyButton = document.createElement("button");
  copyButton.classList.add("btn-copy");
  copyButton.textContent = "Copy";
  shorten.appendChild(copyButton);

  copyButton.addEventListener("click", (e) => {
    copyButton.classList.add("bg-violet");
    copyButton.textContent = "Copied!";

    const dummy = document.createElement("input");
    dummy.type = "text";
    dummy.value = shortenLink.textContent;
    document.body.appendChild(dummy);
    dummy.select();
    document.execCommand("Copy");
    document.body.removeChild(dummy);
  });

  resultBox.appendChild(resultWrapper);
}

for (let i = 0; i < localStorage.length; i++) {
  displayResult(i);
}
