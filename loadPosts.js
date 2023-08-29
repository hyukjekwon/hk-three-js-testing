"use strict";

function loadPosts(posts) {
    const parent = document.getElementById("home-welcome");
    for (const post of posts) {
        const child = document.createElement("div");
        child.classList.add("post");

        const header = document.createElement("div");
        header.classList.add("post-header");
        child.appendChild(header);
        
        const title = document.createElement("div");
        title.classList.add("post-title");
        title.innerHTML = post.title;
        header.appendChild(title);
        
        const date = document.createElement("div");
        date.classList.add("post-date");
        date.innerHTML = post.date;
        header.appendChild(date);
        
        const content = document.createElement("div");
        content.classList.add("post-content");
        content.innerHTML = post.content;

        if (post.links) {
            for (const link of post.links) {
                const text = content.innerHTML;
                const [i, j] = [text.indexOf("_sl_"), text.indexOf("_el_") + 4];
                const embed = text.slice(i+4, j-4);
                content.innerHTML = text.slice(0, i);
                const linkDOM = document.createElement("a");
                linkDOM.innerHTML = embed;
                linkDOM.href = link;
                linkDOM.target = "_top"
                content.appendChild(linkDOM);
                content.innerHTML += text.slice(j);
            }
        }

        child.appendChild(content);
        parent.appendChild(child);
    }
}

fetch("../posts.json")
    .then((response) => response.json())
    .then((json) => loadPosts(json));
