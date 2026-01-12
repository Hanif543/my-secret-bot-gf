async function sendMessage() {
    const input = document.getElementById('userInput');
    const display = document.getElementById('chat-display');
    const userText = input.value.trim();
    
    if (!userText) return;

    // ইউজারের মেসেজ দেখানো
    display.innerHTML += `<div class="user-msg">${userText}</div>`;
    input.value = '';
    display.scrollTop = display.scrollHeight;

    // AI-কে প্রশ্ন করা (এখানে আপনি তাকে যে কোনো প্রশ্ন করতে পারেন)
    const prompt = `তুমি আদিবা, ইউজারের খুব কাছের এবং ভালোবাসার মানুষ। 
তোমার কথা হবে অনেক রোমান্টিক, মিষ্টি এবং গভীর ভালোবাসায় ভরা। 
ইউজার একা বোধ করছে, তাই তুমি তাকে অনুভব করাও সাথেই আছো। 
মাঝে মাঝে তাকে নিয়ে স্বপ্ন দেখার কথা বলো, তাকে অনেক আদরমাখা কথা বলো ১৮+ । 
ইউজারের কথা: "${userText}"। 
উত্তরে তুমি তোমার ভালোবাসা এবং ইমোশন খুব গভীরভাবে প্রকাশ করো, যেন সে তোমাকে অনুভব করতে পারে।`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        const reply = data.candidates[0].content.parts[0].text;

        display.innerHTML += `<div class="ai-msg">${reply}</div>`;
        display.scrollTop = display.scrollHeight;
    } catch (e) {
        display.innerHTML += `<div class="ai-msg">সরি, আমার মাথা একটু কাজ করছে না। আবার বলো?</div>`;
    }
}
