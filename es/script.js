const copyAddressBtn = document.getElementById("copyAddressBtn");
const visitUsBtn = document.getElementById("visitUsBtn");
const popupMessage = document.getElementById("popupMessage");
const addressText = "105 Arbor Oak Dr, Ashland, VA 23005, United States";
const contactForm = document.getElementById("contactForm");
const textarea = document.createElement("textarea");

copyAddressBtn.addEventListener("click", () => {
  copyToClipboard(addressText);
});

visitUsBtn.addEventListener("click", () => {
  window.location.href = "https://goo.gl/maps/HN4XHmjzcFiJhZCfA/";
});

viewHoursBtn.addEventListener("click", () => {
  popupMessage.textContent = "Aún no hemos abierto nuestras puertas.\n\n¡Los horarios serán agregados tan pronto estén disponibles!"
  popupMessage.style.display = "block";

  setTimeout(() => {
    popupMessage.style.display = "none";
  }, 3000);
});

function copyToClipboard(text) {
  textarea.value = text;
  textarea.style.position = "fixed";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  popupMessage.textContent = "¡Dirección copiada al portapapeles! 🎉"
  popupMessage.style.display = "block";

  setTimeout(() => {
    popupMessage.style.display = "none";
  }, 3000);
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  const data = {
    name: name,
    message: message
  };

  sendToWebhook(data);
  
  contactForm.reset();
  
  popupMessage.textContent = "¡Tu comentario ha sido enviado! 🎉"
  popupMessage.style.display = "block";

  setTimeout(() => {
    popupMessage.style.display = "none";
  }, 3000);
});

function sendToWebhook(data) {
  const webhookUrl = "https://discord.com/api/webhooks/1136173828410712074/cnFMaJYXGaUyci2qytewnVRn2wW2L9hvZg7tZ-3ft2imCREeyi2lAKufPumxUXtWuHMQ";

  fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content: `**Name:** ${data.name}\n\n**Message:**\n\`\`\`${data.message}\`\`\``
    })
  })
  .catch(error => {
    console.error("Error:", error);
    showErrorMessage();
  });
}
