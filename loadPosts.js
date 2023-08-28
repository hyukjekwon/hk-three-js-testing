"use strict";

function loadPosts(posts) {
    const parent = document.getElementById("home-welcome");
    for (const post of posts) {
        const child = document.createElement("div");
        child.classList.add("post");
        // console.log(post);
        child.innerHTML = post.title;
        parent.appendChild(child);
    }
}

fetch("../posts.json")
    .then((response) => response.json())
    .then((json) => loadPosts(json));
