if (window.electron) {
  window.electron.receiveClipboardText((event, text) => {
      const inputField = document.getElementById("user-input");
      if (inputField) {
          inputField.value = text;
          inputField.focus();
      }
  });
}

function showSection(section) {
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  const targetSection = document.getElementById(section);
  if (targetSection) {
      targetSection.style.display = 'flex';
  }
}

// Initialize chat visibility
showSection('chat');

// Add event listeners only if elements exist
const sendBtn = document.getElementById('send-btn');
const userInputField = document.getElementById('user-input');

if (sendBtn) sendBtn.addEventListener('click', handleMessage);
if (userInputField) {
  userInputField.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
          handleMessage();
      }
  });
}

async function handleMessage() {
  const userInput = userInputField.value.trim();
  if (userInput === '') return;

  const messages = document.getElementById('messages');
  if (!messages) return;

  // Add user message
  const userMessageHTML = `
      <div class="message user-message">
          <div class="message-container">
              <img src="/api/placeholder/25/25" alt="User Icon" class="user-icon">
              <span>${userInput}</span>
          </div>
      </div>
  `;
  messages.insertAdjacentHTML('beforeend', userMessageHTML);

  // Clear input and scroll
  userInputField.value = '';
  messages.scrollTop = messages.scrollHeight;

  try {
      const response = await fetch('http://localhost:5000/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: userInput }),
      });

      let botResponse = "Sorry, an error occurred while processing your request.";
      if (response.ok) {
          const result = await response.json();
          botResponse = result.response;
      }

      // Add bot response
      const botMessageHTML = `
          <div class="message bot-message">
              <div class="message-container">
                  <img src="./icon.png" alt="Bot Icon" class="bot-icon">
                  <span>${botResponse}</span>
              </div>
          </div>
      `;
      messages.insertAdjacentHTML('beforeend', botMessageHTML);
  } catch (error) {
      console.error("Error fetching bot response:", error);
      const errorMessageHTML = `
          <div class="message bot-message error-message">
              <div class="message-container">
                  <img src="./icon.png" alt="Bot Icon" class="bot-icon">
                  <span>Sorry, an error occurred while processing your request.</span>
              </div>
          </div>
      `;
      messages.insertAdjacentHTML('beforeend', errorMessageHTML);
  }

  messages.scrollTop = messages.scrollHeight;
}

if (window.electron) {
  const closeBtn = document.querySelector(".close-chatbot");
  const chatContainer = document.querySelector(".chatbot-container");

  if (closeBtn) {
      closeBtn.addEventListener("click", () => {
          chatContainer.style.display = "none";
          window.electron.disableMouseEvents();
      });
  }

  if (chatContainer) {
      chatContainer.addEventListener("mouseenter", () => {
          window.electron.enableMouseEvents();
      });

      chatContainer.addEventListener("mouseleave", () => {
          window.electron.disableMouseEvents();
      });
  }
}
