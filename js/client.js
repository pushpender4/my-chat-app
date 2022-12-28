const socket = io("http://localhost:7950");
// -------------------------------------------------------ELEMENT SELECTORS---------------------------------------------------------------------
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
var audio = new Audio("../tone.mp3");
// ---------------------------------------------------DEFINING WHAT APPEND FUNCTION WILL TAKE --------------------------------------------------
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message; 
  messageElement.classList.add("message"); 
  messageElement.classList.add(position); 
  messageContainer.append(messageElement);
  if (position == 'left') {
    audio.play();
  }
};
// ---------------------------------------------------------------SEND BUTTON EVENT LISTENER ----------------------------------------------------
form.addEventListener("submit", (e) => {
  e.preventDefault(); 
  const message = messageInput.value;
  append(`${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});
// -------------------------------------------------------------------REGISTERING A NEW USER -----------------------------------------------------
const name = prompt("Enter your name to join the chat");
socket.emit("new-user-joined", name);
// -----------------------------------------------------------------NEW USER JOINED THE CHAT  -----------------------------------------------------
socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "leftt");
});
// ----------------------------------------------------------------RECEIVING MESSAGES FORM OTHERS -------------------------------------------------
socket.on("receive", (data) => {
  append(`${data.name}`, "lef");
  append(`${data.message}`, "left");
});
socket.on("left", (name) => {
  append(`${name} left the chat`, "leftt");
});

