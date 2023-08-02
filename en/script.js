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
  popupMessage.textContent = "We have not yet opened doors.\n\nHours will be added as soon as they are available!"
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

  popupMessage.textContent = "Address copied to clipboard! 🎉"
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
  
  popupMessage.textContent = "Your feedback has been sent! 🎉"
  popupMessage.style.display = "block";

  setTimeout(() => {
    popupMessage.style.display = "none";
  }, 3000);
});

function sendToWebhook(data) {
  const webhookUrl = "https://discord.com/api/webhooks/1136173968550805524/4HxOQXnTpHPN-qNj0fiG4vXIgh_Kz9I49wYUDJLVYpbldTOxCOALBgabZ8qACwgwdjl_";

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
