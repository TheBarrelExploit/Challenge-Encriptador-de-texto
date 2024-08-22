const notification = document.getElementById("notification");
const notificationMessage = document.getElementById("notification-message");
const message = document.querySelector(".text_message");
const messageEcript = document.querySelector(".message_encript");
const botonCopiar = document.querySelector(".copy_button");
const messageNotFound = document.getElementById("messageNotFound");
const messageAlert = document.getElementById("messageAlert");

document
  .getElementById("close-notification")
  .addEventListener("click", hideNotification);

let matrizCodigo = [
  ["e", "enter"],
  ["i", "imes"],
  ["a", "ai"],
  ["o", "ober"],
  ["u", "ufat"],
];

function generalEncript(stringEncriptado, number) {
  let value = number === 0 ? 1 : 0;
  for (let i = 0; i < matrizCodigo.length; i++) {
    if (stringEncriptado.includes(matrizCodigo[i][number])) {
      stringEncriptado = stringEncriptado.replaceAll(
        matrizCodigo[i][number],
        matrizCodigo[i][value]
      );
    }
  }
  return stringEncriptado;
}

function btnEncriptar() {
  if (message.value === "")
    return showNotification("No se detectó ningún mensaje.", "warning");

  const textoEncriptado = generalEncript(message.value, 0);
  messageEcript.value = textoEncriptado;
  hideOrShowElements(
    (backgroundImage = "none"),
    (buttonCopy = "visible"),
    (alertMessage = "collapse")
  );
  showNotification("¡Mensaje Encriptado!", "success");
}

function btnDesencriptar() {
  if (message.value === "")
    return showNotification("No se detectó ningún mensaje.", "warning");
  const textoDesencriptado = generalEncript(message.value, 1);
  messageEcript.value = textoDesencriptado;
  message.value = "";
  messageEcript.style.backgroundImage = "none";
  showNotification("¡Mensaje Desencriptado!");
  botonCopiar.style.visibility = "visible";
  messageNotFound.style.visibility = "collapse";
  messageAlert.style.visibility = "collapse";
}

function copyToClipboard() {
  navigator.clipboard
    .writeText(messageEcript.value)
    .then(() => {
      hideOrShowElements((backgroundImage = "url('/img/imagen.png')"));
      messageEcript.value = "";
      showNotification("¡Mensaje Copiado!", "success");
    })
    .catch(() => {
      showNotification("¡Error al copiar el mensaje!", "error");
    });
}

function showNotification(message, type = "success") {
  notificationMessage.textContent = message;
  notification.className = `notification ${type} show`;
  notification.style.display = "block";
  notification.classList.remove("hide");
  notification.classList.add("show");
  setTimeout(() => {
    hideNotification();
  }, 3000);
}

function hideNotification() {
  notification.classList.remove("show");
  notification.classList.add("hide");
  setTimeout(() => {
    notification.style.display = "none";
  }, 1000);
}

function hideOrShowElements(
  backgroundImage = "none",
  buttonCopy = "collapse",
  alertMessage = "visible"
) {
  message.value = "";
  botonCopiar.style.visibility = buttonCopy;
  messageNotFound.style.visibility = alertMessage;
  messageAlert.style.visibility = alertMessage;
  messageEcript.style.backgroundImage = backgroundImage;
}
