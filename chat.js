// Chat widget elements
const chatBubble = document.getElementById('chatBubble');
const chatContainer = document.getElementById('chatContainer');
const closeChat = document.getElementById('closeChat');
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendMessage = document.getElementById('sendMessage');

// Toggle chat container
if (chatBubble) {
    chatBubble.addEventListener('click', () => {
        chatContainer.classList.add('active');
    });
}

if (closeChat) {
    closeChat.addEventListener('click', () => {
        chatContainer.classList.remove('active');
    });
}

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

if (sendMessage) {
    sendMessage.addEventListener('click', handleSendMessage);
}

if (userInput) {
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
}

// Process user message and generate response
function processUserMessage(message) {
    const lowerMessage = message.toLowerCase();
    let response = '';

    // Define responses based on keywords
    if (lowerMessage.includes('resume')) {
        response = "You can download Will's updated resume via the 'Resume' link in the navigation bar or the file icon on the hero profile!";
    }
    else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
        response = "You can reach Will directly at wpalaia.2022@gmail.com, or connect with him on LinkedIn!";
    }
    else if (lowerMessage.includes('github') || lowerMessage.includes('code')) {
        response = "Explore Will's code repositories at github.com/WillPalaia, including his Polymarket arbitrage trading engine and open-source tools.";
    }
    else if (lowerMessage.includes('linkedin')) {
        response = "Connect with Will on LinkedIn at linkedin.com/in/willpalaia!";
    }
    else if (lowerMessage.includes('wellington') || lowerMessage.includes('mcp') || lowerMessage.includes('current')) {
        response = "Will is currently a full-time Software Engineer at Wellington Management in Boston, MA. He engineered a production FastMCP server across 20+ AWS Athena tables ($1.3T+ AUM) cutting token overhead by 85%, and built an AI recommendation engine spanning 252 investment strategies ($915B AUM)!";
    }
    else if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job')) {
        response = "Will is a Software Engineer at Wellington Management. Previously, he interned at Wellington (building streaming bond dashboards and AI bot builders), Imago Rehab (Dialogflow chatbot), ISO New England (grid modeling & 37k-row validation), and BigBear.ai (Atlassian Jira apps).";
    }
    else if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('umass') || lowerMessage.includes('degree')) {
        response = "Will graduated from UMass Amherst in February 2026 with a double degree: Bachelor of Science in Computer Science and Bachelor of Arts in Economics.";
    }
    else if (lowerMessage.includes('arbitrage') || lowerMessage.includes('prediction') || lowerMessage.includes('polymarket') || lowerMessage.includes('kalshi')) {
        response = "Will built an asynchronous trading engine using Python and aiohttp polling Polymarket and Kalshi for 1%-3% price discrepancies. It achieved sub-500ms latency, an 86% trade success rate, and generated 7% monthly return on capital!";
    }
    else if (lowerMessage.includes('project')) {
        response = "Key projects include: Prediction Market Arbitrage (Polymarket & Kalshi), TrailSafe, LYSA Soccer Team Generator, Rubik's Cube Solver, Voice Controlled Spotify, and Restaurant Food Tracker. Check the Projects section for links!";
    }
    else if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('stack')) {
        response = "Will's technical stack includes Python, FastMCP, Starlette, AWS (Athena, S3, ECS), React, Node.js, SQL (PostgreSQL, Athena), Docker, Kubernetes, TypeScript, Java, C, R, and Linux.";
    }
    else if (lowerMessage.includes('poker') || lowerMessage.includes('game') || lowerMessage.includes('hobby') || lowerMessage.includes('interest')) {
        response = "Will loves poker, algorithmic trading, art history, weightlifting, tennis, golf, drumming, and video games! Be sure to check out the new Poker Table interactive view by clicking the 'Poker Table Edition' pill!";
    }
    else {
        response = "I'd love to share more about Will's work at Wellington Management, his quantitative trading projects, education at UMass Amherst, or his skills in Python & FastMCP. What would you like to know?";
    }

    setTimeout(() => {
        addMessage(response);
    }, 400);
}
