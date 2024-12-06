const token = "";
const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("btn");

async function query() {
    image.src="/b6e0b072897469.5bf6e79950d23.gif"
  const response = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large",
    {
      headers: {
        Authorization: `Bearer ${token}`,  // Use backticks for string interpolation
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: inputTxt.value }),  // Corrected body format
    }
  );

  if (!response.ok) {
    console.error("Error:", response.statusText);
    return;
  }

  const result = await response.blob();  // Getting the response as a Blob
  return result;
}

button.addEventListener("click", async function () {
  query().then((response) => {
    if (response) {
      const objectURL = URL.createObjectURL(response);  // Convert Blob to URL
      image.src = objectURL;  // Set the image source to the Blob URL
    } else {
      console.error("Failed to generate the image.");
    }
  });
});
