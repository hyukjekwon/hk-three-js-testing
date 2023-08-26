"use strict";

const $ = (id) => document.getElementById(id);
const three_projects = ['joy-division/joydivision.html', 'particle-movement/movement.html',
                        'pendulum-simulation/pendulum.html', 'tree-generator/tree.html']

function loadPage(page) {
    const main = $("main");
    main.data = page;
}

function loadMainPage(pageId) {
    // Initialize home page
    loadPage(`subpages/${pageId}.html`);
}

function initAll() {
    const navLinks = document.getElementsByClassName("main-subpage");
    for (const link of navLinks) {
        link.addEventListener("click", () => {
            if (!link.classList.contains("active")) {
                for (const pageDOM of document.getElementsByClassName("active")) {
                    pageDOM.classList.remove("active");
                }
                link.classList.add("active");
            }
            loadMainPage(link.id.split("-")[0]);
        })
    }
    const projectDropDown = $('project-dropdown');
    for (const project of three_projects) {
        const projName = project.split('/')[0];
        const projTag = document.createElement('a');
        projTag.classList.add("dropdown-item");
        projTag.href = "#";
        projTag.id = projName;
        projTag.innerText = projName;
        projTag.addEventListener("click", () => {
            loadPage(project);
            for (const pageDOM of document.getElementsByClassName("active")) {
                pageDOM.classList.remove("active");
            }
        });
        projectDropDown.appendChild(projTag);
    }
}

initAll();
