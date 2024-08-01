function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  if (userInput.trim() === "") return;

  const chatBox = document.getElementById("chat-box");
  const userMessageDiv = document.createElement("div");
  userMessageDiv.className = "chat-message user-message";
  userMessageDiv.innerText = userInput;
  chatBox.appendChild(userMessageDiv);

  fetch("/get_response", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userInput }),
  })
    .then((response) => response.json())
    .then((data) => {
      const botMessageDiv = document.createElement("div");
      botMessageDiv.className = "chat-message bot-message";
      botMessageDiv.innerHTML = data.response; // Use innerHTML to render HTML content
      chatBox.appendChild(botMessageDiv);
      chatBox.scrollTop = chatBox.scrollHeight;
    });

  document.getElementById("user-input").value = "";
}

function checkEnter(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}
