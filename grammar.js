"use strict";

import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls';

// init basics
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 40;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

// GUI
const gui = new dat.GUI();
let i = {iterations: 1}
const folder = gui.addFolder('Controls');
folder.add(i, 'iterations', 1, 10, 1);
folder.open();

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(2, 10, 3);
const ambLight = new THREE.AmbientLight(0xffffff, 0.75);
scene.add(dirLight);
scene.add(ambLight);

// geometries & materials
const planeGeo = new THREE.PlaneGeometry(100, 100);
const materials = [new THREE.MeshPhongMaterial({color: 0x202025}),
    new THREE.MeshPhongMaterial({color: 0x603020})];
const newSprite = () => {
    return new THREE.Sprite(new THREE.SpriteMaterial({map: new THREE.TextureLoader().load('https://raw.githubusercontent.com/hyukjekwon/hk-three-js-testing/main/circle-16.png')}))
};

// meshes
const plane = new THREE.Mesh(planeGeo, materials[0]);
plane.rotation.x = -Math.PI / 2
plane.position.y = -20
scene.add(plane);

const root = new THREE.Vector3(0, -20, 0);

function drawBranch(size, angle, pos) {
    const pivot = new THREE.Group();
    pivot.position.set(pos.x, pos.y, pos.z)
    pivot.rotation.set(angle.x, angle.y, angle.z);
    const branchGeo = new THREE.BoxGeometry(size, 5 * size, size);
    const mesh = new THREE.Mesh(branchGeo, materials[1]);
    mesh.position.y = 2.5 * size;
    pivot.add(mesh);
    scene.add(pivot);
}

function drawTree(n) {
    if (n === 0) {
        return
    }
    drawBranch(1, new THREE.Vector3(0, 0, 0), root);
    drawTree(--n)
    return
}

drawTree(1);

let t = 0;

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    renderer.render(scene, camera);
    
    // t += 0.0078125;
}

animate();
