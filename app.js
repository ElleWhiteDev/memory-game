const generateButton = document.querySelector("#generateButton");

generateButton.addEventListener("click", function (e) {
  e.preventDefault();
  createMeme();
});

function createMeme() {
  const topTextInput = document.getElementById("topTextInput");
  const bottomTextInput = document.getElementById("bottomTextInput");
  const imageInput = document.getElementById("imageInput");

  const topText = topTextInput.value;
  const bottomText = bottomTextInput.value;
  const imageUrl = imageInput.value;

  if (!topText || !bottomText || !imageUrl) {
    alert("Please fill out all fields");
    return;
  }

  const memeDiv = document.createElement("div");
    memeDiv.classList.add("meme");
      memeDiv.onclick = function () {
        memeDiv.remove();
      };

  const img = document.createElement("img");
  img.classList.add("memeImage");
  img.setAttribute("src", imageUrl);
  img.setAttribute("alt", "Meme image");

  memeDiv.innerHTML = `
    <div class="memeTopText">${topText}</div>
    <img src="${imageUrl}" alt="Meme image" class="memeImage">
    <div class="memeBottomText">${bottomText}</div>
  `;

  const containerDiv = document.getElementById("memeContainer");
  containerDiv.appendChild(memeDiv);

  topTextInput.value = "";
  bottomTextInput.value = "";
  imageInput.value = "";
}
