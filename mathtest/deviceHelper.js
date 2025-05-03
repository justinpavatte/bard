const DeviceHelper = (() => {

    function detectDevice() {
        let platform = 'Unknown';

        if (navigator.userAgentData) {
            const data = navigator.userAgentData;
            if (data.platform) {
                platform = data.platform;
                return platform;
            }
        }

        let userAgent = window.navigator.userAgent.toLowerCase();
        if (userAgent.includes('windows')) {
            platform = 'Windows';
        } else if (userAgent.includes('android')) {
            platform = 'Android';
        } else if (userAgent.includes('iphone')) {
            platform = 'iPhone';
        } else if (userAgent.includes('ipad')) {
            platform = 'iPad';
        } else if (userAgent.includes('mac')) {
            platform = 'Mac';
        } else if (userAgent.includes('linux')) {
            platform = 'Linux';
        }

        return platform;
    }

    function getDeviceInfo() {
        const d = detectDevice();
        const environmentString = `Device: ${d}
Platform: ${navigator.platform}
Screen: ${screen.width}x${screen.height} @ ${screen.colorDepth} bits
Language: ${navigator.language || navigator.languages[0]}
Time Zone Enabled: ${typeof Intl !== 'undefined' && Intl.DateTimeFormat().resolvedOptions().timeZone}`;

        return environmentString;
    }

    return {
        getDeviceInfo
    };
})();
