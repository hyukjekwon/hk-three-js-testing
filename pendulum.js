"use strict";

import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls';

// init basics
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(1.5, 11, 2);
const ambLight = new THREE.AmbientLight(0xffffff, 0.75);
scene.add(dirLight);
scene.add(ambLight);

// geometries & materials
const pivot1 = new THREE.Group();
pivot1.position.set(0, 5, 0);
const pivot2 = new THREE.Group();
const pendGeo = new THREE.BoxGeometry(1, 10, 1);
const planeGeo = new THREE.PlaneGeometry(100, 100);
const materials = [new THREE.MeshPhongMaterial({color: 0xbf306f}),
    new THREE.MeshPhongMaterial({color: 0x2060df}),
    new THREE.MeshPhongMaterial({color: 0x303035})];
const newSprite = () => {
    return new THREE.Sprite(new THREE.SpriteMaterial({map: new THREE.TextureLoader().load('circle-16.png')}))
};
const sprite = newSprite();

// meshes
const pend1 = new THREE.Mesh(pendGeo, materials[0]);
const pend2 = new THREE.Mesh(pendGeo, materials[1]);
const plane = new THREE.Mesh(planeGeo, materials[2]);

pend1.position.set(0, -5, 0);
pend2.position.set(0, -5, 0);
plane.position.y = -17;
plane.rotation.x = -Math.PI/2;
pivot1.add(pend1);
pivot1.add(pivot2);
pivot2.position.set(0, -10, 0);
pivot2.add(pend2);
scene.add(pivot1);
scene.add(plane);
sprite.position.y = -10;
pivot2.add(sprite);

// physics initialization
pivot1.rotation.z = Math.PI / 2;
const g = 9.81;
const L = 10;
const omega = Math.sqrt(g / L);

camera.position.z = 40;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let t = 0;
const sprites = [];
const speeds = [5, 7];

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    pivot1.rotation.z = speeds[0] * t;
    pivot2.rotation.z = speeds[1] * t;
    const newspr = newSprite();
    sprite.getWorldPosition(newspr.position);
    scene.add(newspr);
    sprites.push(newspr);
    if (sprites.length > 5000) {
        scene.remove(sprites.shift());
    }

    renderer.render(scene, camera);
    
    t += 0.0078125;
}

animate();

const redDom = document.getElementById("red-speed");
redDom.addEventListener('input', () => {
    speeds[0] = redDom.value;
    while (sprites.length) {
        scene.remove(sprites.shift());
    }
})
const blueDom = document.getElementById("blue-speed");
blueDom.addEventListener('input', () => {
    speeds[1] = blueDom.value;
    while (sprites.length) {
        scene.remove(sprites.shift());
    }
})