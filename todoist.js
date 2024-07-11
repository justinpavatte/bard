async function writeToLog(message) {
    let apiUrl =  "https://api.todoist.com/rest/v2/comments";
    //Public Todoist account. Google Curtis.
    let apiToken = "8972a19cadcc698cf4843761485fd359165c061b";
    let taskId = "8196116847";

    let environmentString = `
Platform: ${navigator.userAgentData.platform}
Language: ${navigator.language || navigator.languages[0]}
Screen: ${screen.width}x${screen.height} @ ${screen.colorDepth} bits
Time Zone: ${typeof Intl !== 'undefined' && Intl.DateTimeFormat().resolvedOptions().timeZone}
`;

    let commentData = {
      task_id: taskId,
      content: message + environmentString
    };
    let response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });
    console.log(response.status);
}