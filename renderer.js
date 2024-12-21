window.electron.receiveClipboardText((event, text) => {
  const inputField = document.getElementById("user-input");
  if (inputField) {
    inputField.value = text;
    inputField.focus();
  }
});

document.getElementById("send-btn").addEventListener("click", async () => {
  const userInput = document.getElementById("user-input").value;
  if (userInput.trim() !== "") {
    const messages = document.getElementById("messages");

    const userMessageElement = document.createElement("div");
    userMessageElement.classList.add("user-message");

    const userMessageContainer = document.createElement("div");
    userMessageContainer.classList.add("message-container");

    const userIcon = document.createElement("img");
    const userIconPath = "user-icon.png";  
    userIcon.src = userIconPath;
    userIcon.alt = "User Icon";
    userIcon.classList.add("user-icon");

    userIcon.onerror = () => {
      userIcon.src = "./icon.png";
    };

    const userMessageText = document.createElement("span");
    userMessageText.innerText = `${userInput}`;

    userMessageContainer.appendChild(userIcon);
    userMessageContainer.appendChild(userMessageText);
    userMessageElement.appendChild(userMessageContainer);

    messages.appendChild(userMessageElement);
    document.getElementById("user-input").value = "";

    messages.scrollTop = messages.scrollHeight;

    try {
      const response = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: userInput }),
      });

      if (response.ok) {
        const result = await response.json();

        const botMessageElement = document.createElement("div");
        botMessageElement.classList.add("bot-message");

        const botMessageContainer = document.createElement("div");
        botMessageContainer.classList.add("message-container");

        const botIcon = document.createElement("img");
        botIcon.src = "https://cdn-icons-png.flaticon.com/512/1144/1144760.png"; 
        botIcon.alt = "Bot Icon";
        botIcon.classList.add("bot-icon");

        const botMessageText = document.createElement("span");
        botMessageText.innerText = `${result.response}`;

        botMessageContainer.appendChild(botIcon);
        botMessageContainer.appendChild(botMessageText);
        botMessageElement.appendChild(botMessageContainer);

        messages.appendChild(botMessageElement);

        messages.scrollTop = messages.scrollHeight;
      } else {
        throw new Error('Failed to fetch response from server');
      }
    } catch (error) {
      const errorElement = document.createElement("div");
      errorElement.classList.add("bot-message");

      const errorMessageContainer = document.createElement("div");
      errorMessageContainer.classList.add("message-container");

      const errorIcon = document.createElement("img");
      errorIcon.src = "https://static.vecteezy.com/system/resources/previews/006/662/139/non_2x/artificial-intelligence-ai-processor-chip-icon-symbol-for-graphic-design-logo-web-site-social-media-mobile-app-ui-illustration-free-vector.jpg"; 
      errorIcon.alt = "Bot Icon";
      errorIcon.classList.add("bot-icon");

      const errorMessageText = document.createElement("span");
      errorMessageText.innerText =
        "Sorry, an error occurred while processing your request.";

      errorMessageContainer.appendChild(errorIcon);
      errorMessageContainer.appendChild(errorMessageText);
      errorElement.appendChild(errorMessageContainer);

      messages.appendChild(errorElement);

      messages.scrollTop = messages.scrollHeight;
    }
  }
});

document.querySelector(".close-chatbot").addEventListener("click", () => {
  document.querySelector(".chatbot-container").style.display = "none";
  window.electron.disableMouseEvents();
});

document.querySelector(".chatbot-container").addEventListener("mouseenter", () => {
  window.electron.enableMouseEvents();
});

document.querySelector(".chatbot-container").addEventListener("mouseleave", () => {
  window.electron.disableMouseEvents();
});
