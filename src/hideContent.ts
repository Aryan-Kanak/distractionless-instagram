hideContent();

async function hideContent(): Promise<void> {
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

function hideSuggestedPosts(): void {
    
}

function hideExplore(): void {
    let exploreButton = document.querySelector("a[href='/explore/'");
    if (exploreButton != null) {
        exploreButton.remove();
    } else {
        console.log("ERROR: Explore button not found");
    }
}

function hideReels(): void {
    let reelsButton = document.querySelector("a[href='/reels/'");
    if (reelsButton != null) {
        reelsButton.remove();
    } else {
        console.log("ERROR: Reels button not found");
    }
}

function hideStories(): void {
    
}

function hideComments(): void {
    
}

function hideSuggestedProfiles(): void {
    
}
