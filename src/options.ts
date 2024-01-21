let options: HTMLCollectionOf<Element> = document.getElementsByClassName("option");
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
