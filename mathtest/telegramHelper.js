const TelegramHelper = (() => {
    const BASE_URL = 'https://api.telegram.org/bot';
    const PUBLIC_TOKEN = '8134337145:AAHka4xYkuDO5jsuv8tA_Wd57ifgIElfe4o';
    //Me, Padre
    const CHAT_IDS = ['7830815090', '7771735531'];
    //Me
    //const CHAT_IDS = ['7830815090'];

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
        const promises = CHAT_IDS.map(chatId =>
            request('/sendMessage', 'POST', {
                chat_id: chatId,
                text: text
            }).catch(error => {
                console.error(`Failed to send message to ${chatId}:`, error);
            })
        );
        return Promise.all(promises);
    }

    return {
        sendMessage
    };
})();
