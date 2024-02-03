let options: HTMLCollectionOf<Element> = document.getElementsByClassName("optionBox");
for (let option of options) {
    let checkbox = option as HTMLInputElement;
    let id: string = checkbox.id;

    // set initial state
    setInitialState(id, checkbox);

    // chance state on click
    option.addEventListener("click", async () => {
        let result = await chrome.storage.local.get(id);
        let curValue: boolean = result[id] as boolean;
        chrome.storage.local.set({ [id]: !curValue });

        // update page when option is changed
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
    });
}

async function setInitialState(id: string, checkbox: HTMLInputElement): Promise<void> {
    let result = await chrome.storage.local.get(id);
    let curValue = result[id];
    if (curValue == undefined) {
        chrome.storage.local.set({ [id]: true });
        curValue = true;
    }
    
    checkbox.checked = curValue;
}
