chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabId },
                files: ["hideContent.js"]
        });
    }
});

chrome.webRequest.onCompleted.addListener(async function (details) {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    if (tab.id == null) {
        return;
    }
    let tabId: number = tab.id;
    chrome.scripting.executeScript(
        {
            target: { tabId: tabId },
            files: ["hideContent.js"]
    });
}, { urls: ["*://*/*"]}); // *://*/*
