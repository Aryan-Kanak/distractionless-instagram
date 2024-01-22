hideContent();

async function hideContent(): Promise<void> {
    console.log("Distraction Free Instagram: hiding content");
    // get state from local storage
    let result = await chrome.storage.local.get("hide-suggested-posts");
    let suggestedPosts: boolean = result["hide-suggested-posts"] as boolean;
    result = await chrome.storage.local.get("hide-explore");
    let explore: boolean = result["hide-explore"] as boolean;
    result = await chrome.storage.local.get("hide-reels");
    let reels: boolean = result["hide-reels"] as boolean;
    result = await chrome.storage.local.get("hide-stories");
    let stories: boolean = result["hide-stories"] as boolean;
    result = await chrome.storage.local.get("hide-comments");
    let comments: boolean = result["hide-comments"] as boolean;
    result = await chrome.storage.local.get("hide-suggested-profiles");
    let suggestedProfiles: boolean = result["hide-suggested-profiles"] as boolean;
    
    // hide content
    if (suggestedPosts) {
        hideSuggestedPosts();
    }
    if (explore) {
        hideExplore();
    }
    if (reels) {
        hideReels();
    }
    if (stories) {
        hideStories();
    }
    if (comments) {
        hideComments();
    }
    if (suggestedProfiles) {
        hideSuggestedProfiles();
    }
}

export function hideSuggestedPosts(): void {
    let suggestedPosts: NodeListOf<HTMLElement> = document.querySelectorAll("span, article");
    let i: number = 0;
    while (i < suggestedPosts.length) {
        if (suggestedPosts[i].innerHTML == "Suggested Posts") {
            suggestedPosts[i].style.display = "none";
            break;
        }
        i++;
    }
    while (i < suggestedPosts.length) {
        if (suggestedPosts[i].nodeName == "ARTICLE") {
            suggestedPosts[i].style.display = "none";
        }
        i++;
    }
}

export function hideExplore(): void {
    let exploreButton: HTMLElement | null = document.querySelector("a[href='/explore/'") as HTMLElement;
    if (exploreButton != null) {
        exploreButton.style.display = "none";
    } else {
        console.log("ERROR: Explore button not found");
    }
}

export function hideReels(): void {
    let reelsButton : HTMLElement = document.querySelector("a[href='/reels/'") as HTMLElement;
    if (reelsButton != null) {
        reelsButton.style.display = 'none';
    } else {
        console.log("ERROR: Reels button not found");
    }
}

export function hideStories(): void {
    
}

export function hideComments(): void {
    
}

export function hideSuggestedProfiles(): void {
    
}
