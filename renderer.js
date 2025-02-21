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

showSection('chat');

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

let isSoundEnabled = true;
const soundToggle = document.getElementById('sound-toggle');

soundToggle.addEventListener('click', () => {
  isSoundEnabled = !isSoundEnabled;
  soundToggle.textContent = isSoundEnabled ? '🔊' : '🔈';
  soundToggle.classList.toggle('muted');
});


async function handleMessage() {
  const userInput = userInputField.value.trim();
  if (userInput === '') return;

  const messages = document.getElementById('messages');
  if (!messages) return;

  const userMessageHTML = `
                <div class="message user-message">
                    <div class="message-content">
                        <img src="/api/placeholder/25/25" alt="User Icon" class="user-icon">
                        <span class="message-text">${userInput}</span>
                    </div>
                </div>
            `;
  messages.insertAdjacentHTML('beforeend', userMessageHTML);

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

    const botMessageHTML = `
                    <div class="message bot-message">
                        <div class="message-content">
                            <div class="avatar-container">
                                <div class="bot-face">
                                    <div class="bot-eyes">
                                        <div class="bot-eye"></div>
                                        <div class="bot-eye"></div>
                                    </div>
                                    <div class="bot-mouth"></div>
                                </div>
                            </div>
                            <span class="message-text">${botResponse}</span>
                        </div>
                    </div>
                `;
    messages.insertAdjacentHTML('beforeend', botMessageHTML);

    const lastBotMessage = messages.lastElementChild;
    const avatarContainer = lastBotMessage.querySelector('.avatar-container');
    avatarContainer.classList.add('speaking');
    if ('speechSynthesis' in window && isSoundEnabled) {
      const utterance = new SpeechSynthesisUtterance(botResponse);
      utterance.onend = () => {
          avatarContainer.classList.remove('speaking');
          currentlySpeaking = false;
      };
      utterance.onstart = () => {
          currentlySpeaking = true;
      };
      speechSynthesis.speak(utterance);
  } else if (!isSoundEnabled) {
      // If sound is disabled, still show animation briefly
      setTimeout(() => {
          avatarContainer.classList.remove('speaking');
          currentlySpeaking = false;
      }, 2000);
  }

  } catch (error) {
    console.error("Error fetching bot response:", error);
    const errorMessageHTML = `
                    <div class="message bot-message error-message">
                        <div class="message-content">
                            <div class="avatar-container">
                                <div class="bot-face">
                                    <div class="bot-eyes">
                                        <div class="bot-eye"></div>
                                        <div class="bot-eye"></div>
                                    </div>
                                    <div class="bot-mouth"></div>
                                </div>
                            </div>
                            <span class="message-text">Sorry, an error occurred while processing your request.</span>
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

const voiceBtn = document.getElementById('voice-btn');
const textCommand = document.getElementById('text-command');
const executeBtn = document.getElementById('execute-btn');

if (voiceBtn) {
  voiceBtn.addEventListener('click', async () => {
    try {
      if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = async (event) => {
          const command = event.results[0][0].transcript;
          textCommand.value = command;
          executeCommand(command);
        };

        recognition.start();
        voiceBtn.textContent = '🔴 Recording...';

        recognition.onend = () => {
          voiceBtn.textContent = '🎤 Speak';
        };
      } else {
        alert('Speech recognition is not supported in your browser.');
      }
    } catch (error) {
      console.error('Error with voice recognition:', error);
      alert('Error starting voice recognition');
    }
  });
}

if (executeBtn) {
  executeBtn.addEventListener('click', () => {
    const command = textCommand.value.trim();
    if (command) {
      executeCommand(command);
    }
  });
}

async function executeCommand(command) {
  try {
    console.log('Executing command:', command);
    const result = await window.electron.executeCommand(command);
    console.log('Command result:', result);

    const commandResult = document.getElementById('command-result');
    if (commandResult) {
      commandResult.innerHTML = `
        <div class="${result.success ? 'success' : 'error'}">
          <p>${result.message}</p>
          ${result.data ? `<pre>${JSON.stringify(result.data, null, 2)}</pre>` : ''}
        </div>
      `;
    }

    const messages = document.getElementById('messages');
    if (messages) {
      const messageHTML = `
        <div class="message ${result.success ? 'bot-message' : 'error-message'}">
          <div class="message-content">
            <img src="./icon.png" alt="Bot Icon" class="bot-icon">
            <span>${result.message}</span>
            ${result.data ? `<pre>${JSON.stringify(result.data, null, 2)}</pre>` : ''}
          </div>
        </div>
      `;
      messages.insertAdjacentHTML('beforeend', messageHTML);
      messages.scrollTop = messages.scrollHeight;
    }

    textCommand.value = '';
  } catch (error) {
    console.error('Error executing command:', error);
    const errorMessage = 'Error executing command: ' + error.message;

    const commandResult = document.getElementById('command-result');
    if (commandResult) {
      commandResult.innerHTML = `<div class="error"><p>${errorMessage}</p></div>`;
    }
  }
}