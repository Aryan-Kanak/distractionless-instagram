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
    hideSuggestedPosts(suggestedPosts);
    hideExplore(explore);
    hideReels(reels)
    hideStories(stories);
    //hideComments(comments);
    hideSuggestedProfiles(suggestedProfiles);
}

export function hideSuggestedPosts(hidden: boolean = true): void {
    let suggestedPosts: NodeListOf<HTMLElement> = document.querySelectorAll("span, article");
    let i: number = 0;
    let postContainer: HTMLElement | null = null;
    if (suggestedPosts.length > 1) {
        postContainer = suggestedPosts[0].parentElement;
    }

    // remove posts
    while (i < suggestedPosts.length) {
        // remove suggested posts in feed
        if (suggestedPosts[i].innerHTML == "Suggested for you") {
            let suggestedPost = suggestedPosts[i].parentElement?.parentElement?.parentElement;
            if (suggestedPost?.nodeName == "ARTICLE") {
                suggestedPost.style.display = hidden ? "none" : "block";
            }
        }

        // find start of suggested posts section
        if (suggestedPosts[i].innerHTML == "Suggested Posts") {
            suggestedPosts[i].style.display = hidden ? "none" : "block";
            break;
        }
        ++i;
    }
    while (i < suggestedPosts.length) {
        if (suggestedPosts[i].nodeName == "ARTICLE" && suggestedPosts[i].getAttribute("role") != "presentation") {
            suggestedPosts[i].style.display = hidden ? "none" : "block";
        }
        ++i;
    }

    // ensure no new posts can be seen
    if (postContainer != null) {
        postContainer.style.maxHeight = postContainer.offsetHeight.toString();
        postContainer.style.height = "100%";
    }
}

export function hideExplore(hidden: boolean = true): void {
    let exploreButton: HTMLElement | null = document.querySelector("a[href='/explore/'") as HTMLElement;
    if (exploreButton != null) {
        exploreButton.style.display = hidden ? "none" : "block";
    } else {
        console.log("ERROR: Explore button not found");
    }
}

export function hideReels(hidden: boolean = true): void {
    let reelsButton: HTMLElement | null = document.querySelector("a[href='/reels/'") as HTMLElement;
    if (reelsButton != null) {
        reelsButton.style.display = hidden ? "none" : "block";
    } else {
        console.log("ERROR: Reels button not found");
    }
}

export function hideStories(hidden: boolean = true): void {
    let stories: HTMLElement | null = document.querySelector("div[role='menu'") as HTMLElement;
    if (stories != null) {
        stories.style.display = hidden ? "none" : "block";
    } else {
        console.log("ERROR: Stories not found");
    }
}

export function hideComments(hidden: boolean = true): void {
    let posts: HTMLCollectionOf<HTMLElement> = document.getElementsByTagName("article");
    for (let i: number = 0; i < posts.length; ++i) {
        let spans: HTMLCollectionOf<HTMLElement> = posts[i].getElementsByTagName("span");
        for (let j: number = 12; j < spans.length; ++j) {
            spans[j].style.display = hidden ? "none" : "block";
        }
    }
}

export function hideSuggestedProfiles(hidden: boolean = true): void {
    let spans: HTMLCollectionOf<HTMLElement> = document.getElementsByTagName("span");
    let suggestedForYouText: HTMLElement | null = null;
    for (let i = 0; i < spans.length; ++i) {
        if (spans[i].innerHTML == "See All") {
            suggestedForYouText = spans[i];
            break;
        }
    }
    if (spans == null) {
        console.log("ERROR: See All text not found");
        return;
    }
    let suggestedProfiles: HTMLElement | null | undefined =
    suggestedForYouText?.parentElement?.parentElement?.parentElement?.parentElement;
    if (suggestedProfiles == null || suggestedProfiles == undefined) {
        console.log("ERROR: suggested profiles not found");
        return;
    }
    suggestedProfiles.style.display = hidden ? "none" : "block";
}
