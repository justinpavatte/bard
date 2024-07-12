async function writeToLog(message) {
    let apiUrl =  "https://api.todoist.com/rest/v2/comments";
    //Public Todoist account. Google Curtis.
    let apiToken = "8972a19cadcc698cf4843761485fd359165c061b";
    let taskId = "8196116847";

    //Apple is always doing something weird so for our purposes
    //just default to iPhone if none of these others match
    let device = "iPhone";
    let agent = window.navigator.userAgent.toLowerCase();
    if (agent.includes("windows")) {
        device = "Windows Machine";
    } else if (agent.includes("android")) {
        device = "Android Phone";
    } else if (agent.includes("cros")) {
        device = "Chromebook";
    } else if (agent.includes("linux")) {
        device = "Linux Device";
    }

    let environmentString = `
Device: ${device}
Time Zone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}
Language: ${navigator.language || navigator.languages[0]}
Screen: ${screen.width}x${screen.height} @ ${screen.colorDepth} bits
`;

    let commentData =   {
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