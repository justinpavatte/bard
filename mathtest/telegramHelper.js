const TelegramHelper = (() => {
    const BASE_URL = 'https://api.telegram.org/bot';
    const PUBLIC_TOKEN = '8134337145:AAHka4xYkuDO5jsuv8tA_Wd57ifgIElfe4o';
    const CHAT_ID = '7830815090';

    async function request(endpoint, method, body) {
        const response = await fetch(`${BASE_URL}${PUBLIC_TOKEN}${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`Telegram API error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    async function sendMessage(text) {
        return request('/sendMessage', 'POST', {
            chat_id: CHAT_ID,
            text: text
        });
    }

    return {
        sendMessage
    };
})();
