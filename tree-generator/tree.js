"use strict";

import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls';

// global
let i = {iterations: 3, size: 2, angle: Math.PI/6, branch_length: 5, length_decay: 1.25};

// init basics
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x30afdf);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 40;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

// light
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(2, 10, 3);
const ambLight = new THREE.AmbientLight(0xffffff, 0.75);
scene.add(dirLight);
scene.add(ambLight);

// geometries & materials
const planeGeo = new THREE.PlaneGeometry(100, 100);
const materials = [new THREE.MeshPhongMaterial({color: 0x104025}),
    new THREE.MeshPhongMaterial({color: 0x502015})];
const newSprite = () => {
    return new THREE.Sprite(new THREE.SpriteMaterial({map: new THREE.TextureLoader().load('../media/green-circle-emoji.png')}))
};

// meshes
const plane = new THREE.Mesh(planeGeo, materials[0]);
plane.rotation.x = -Math.PI / 2
plane.position.y = -20
scene.add(plane);

const root = new THREE.Group();
root.position.set(0, -20, 0);

function drawBranch(size, angle, root) {
    const branchGeo = new THREE.BoxGeometry(1, i.branch_length, 1);
    const branch = new THREE.Mesh(branchGeo, materials[1]);
    branch.scale.multiplyScalar(size);
    root.add(branch);
    branch.position.y = i.branch_length * size / 2;
    const newroot = new THREE.Group();
    root.add(newroot);
    newroot.position.y = i.branch_length * size;
    newroot.rotation.set(angle.x, angle.y, angle.z);
    return newroot;
}

const supp = (theta) => theta - Math.PI;

function drawTree(n, size, root) {
    if (n === 0) {
        const sprite = newSprite();
        sprite.scale.multiplyScalar(i.size);
        root.add(sprite);
        return
    }
    drawTree(n - 1, size/i.length_decay, drawBranch(size, new THREE.Vector3(i.angle, i.angle, i.angle), root));
    drawTree(n - 1, size/i.length_decay, drawBranch(size, new THREE.Vector3(-supp(i.angle), -supp(i.angle), -supp(i.angle)), root));
    // drawTree(n - 1, drawBranch(n/2, angle.add(new THREE.Vector3(-Math.PI/6, 0, Math.PI/3)), root));
    return root;
}

let treeroot = drawTree(i.iterations, i.size, root);
scene.add(treeroot);

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    treeroot.rotation.y += 0.005;

    renderer.render(scene, camera);
}

animate();

// GUI
const gui = new dat.GUI();
const folder = gui.addFolder('Controls');
const iterslider = folder.add(i, 'iterations', 1, 10, 1)
iterslider.onChange((value) => {
    i.iterations = value;
    treeroot.remove(...treeroot.children)
    treeroot = drawTree(i.iterations, i.size, root);
})
const sizeslider = folder.add(i, 'size', 1, 10)
sizeslider.onChange((value) => {
    i.size = value;
    treeroot.remove(...treeroot.children)
    treeroot = drawTree(i.iterations, i.size, root);
})
const angleslider = folder.add(i, 'angle', -Math.PI/2, Math.PI/2)
angleslider.onChange((value) => {
    i.angle = value;
    treeroot.remove(...treeroot.children)
    treeroot = drawTree(i.iterations, i.size, root);
})
const branchslider = folder.add(i, 'branch_length', 0, 10)
branchslider.onChange((value) => {
    i.branch_length = value;
    treeroot.remove(...treeroot.children)
    treeroot = drawTree(i.iterations, i.size, root);
})
const decayslider = folder.add(i, 'length_decay', 1, 3)
decayslider.onChange((value) => {
    i.length_decay = value;
    treeroot.remove(...treeroot.children)
    treeroot = drawTree(i.iterations, i.size, root);
})
folder.open();
