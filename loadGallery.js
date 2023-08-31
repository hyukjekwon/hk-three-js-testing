function loadImages(images) {
    const gallery = document.getElementById("gallery-page");
    for (const image of images) {
        const frameDOM = document.createElement("div");
        const imgDOM = document.createElement("img");
        const titleDOM = document.createElement("div");
        const mediumDOM = document.createElement("div");
        const descDOM = document.createElement("div");
        const placardDOM = document.createElement("div");
        imgDOM.src = "../media/gallery/" + image.filename;
        titleDOM.innerHTML = image.title;
        mediumDOM.innerHTML = `${image.medium}, ${image.date}`;
        descDOM.innerHTML = image.description;
        titleDOM.style = "font-size: 20px; font-weight: bold";
        mediumDOM.style = "margin-bottom: 10px; font-style: italic";
        frameDOM.classList.add("gallery-frame");
        imgDOM.classList.add("gallery-image");
        placardDOM.classList.add("gallery-placard");
        placardDOM.appendChild(titleDOM);
        placardDOM.appendChild(mediumDOM);
        placardDOM.appendChild(descDOM);
        frameDOM.appendChild(imgDOM);
        frameDOM.appendChild(placardDOM);
        gallery.appendChild(frameDOM);
    }
}

fetch("../paintings.json")
    .then(response => response.json())
    .then(json => loadImages(json))
