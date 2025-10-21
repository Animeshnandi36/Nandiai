const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage('user', message);
  userInput.value = '';
  scrollChatToBottom();

  try {
    const response = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    appendMessage('nandiai', data.reply);
    scrollChatToBottom();
  } catch (error) {
    appendMessage('nandiai', 'Oops! Something went wrong.');
  }
}

function appendMessage(sender, text) {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  bubble.classList.add(sender === 'user' ? 'user-bubble' : 'nandiai-bubble');
  bubble.textContent = text;
  chatBox.appendChild(bubble);
}

function scrollChatToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}