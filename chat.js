// Chat widget elements
const chatBubble = document.getElementById('chatBubble');
const chatContainer = document.getElementById('chatContainer');
const closeChat = document.getElementById('closeChat');
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendMessage = document.getElementById('sendMessage');

// Toggle chat container
chatBubble.addEventListener('click', () => {
    chatContainer.classList.add('active');
});

closeChat.addEventListener('click', () => {
    chatContainer.classList.remove('active');
});

// Send message function
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user' : 'bot');
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle sending messages
function handleSendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        userInput.value = '';
        processUserMessage(message);
    }
}

sendMessage.addEventListener('click', handleSendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});

// Process user message and generate response
function processUserMessage(message) {
    const lowerMessage = message.toLowerCase();
    let response = '';

    // Define responses based on keywords
    if (lowerMessage.includes('resume')) {
        response = "You can find my resume by clicking either the resume link in the top navigation bar or the document icon below my profile picture!";
    }
    else if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
        response = "You can contact me through my email by clicking the envelope icon below my profile picture, or directly at willpalaia2@gmail.com";
    }
    else if (lowerMessage.includes('github')) {
        response = "Check out my GitHub projects by clicking the GitHub icon below my profile picture!";
    }
    else if (lowerMessage.includes('linkedin')) {
        response = "Connect with me on LinkedIn by clicking the LinkedIn icon below my profile picture!";
    }
    else if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
        response = "I have experience working at Imago Rehab, ISO New England, and BigBear.ai. You can find more details about my work experience in the Experience section below!";
    }
    else if (lowerMessage.includes('education') || lowerMessage.includes('study')) {
        response = "I'm currently studying Computer Science and Economics at UMass Amherst, expected to graduate in May 2026.";
    }
    else if (lowerMessage.includes('project')) {
        response = "I have several projects including TrailSafe, a Soccer Team Generator, a Rubik's Cube Solver, and more. You can find them all in the Projects section!";
    }
    else if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
        response = "I'm proficient in various programming languages including Python, Java, JavaScript, TypeScript, C, and SQL. I also work with technologies like Node.js, React, AWS, Git, and more!";
    }
    else if (lowerMessage.includes('hobby') || lowerMessage.includes('interest')) {
        response = "In my free time, I enjoy stock trading, poker, soccer, golf, tennis, and drumming!";
    }
    else {
        response = "I'm not sure about that, but I'd be happy to tell you about Will's experience, education, projects, skills, or hobbies! What would you like to know?";
    }

    setTimeout(() => {
        addMessage(response);
    }, 500);
} 