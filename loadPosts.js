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
        child.appendChild(content);
        parent.appendChild(child);
    }
}

fetch("../posts.json")
    .then((response) => response.json())
    .then((json) => loadPosts(json));
