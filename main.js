"use strict";

const $ = (id) => document.getElementById(id);

function loadPage(pageId) {
    // Initialize home page
    const main = $("main");
    main.data = `subpages/${pageId}.html`
    // main.innerHTML = `<object type="text/html" data="subpages/${pageId}.html" id="main"></object>`
}

function initAll() {
    const navLinks = document.getElementsByClassName("nav-link");
    for (const link of navLinks) {
        link.addEventListener("click", e => {
            loadPage(link.id.split("-")[0]);
        })
    }
}

initAll();
