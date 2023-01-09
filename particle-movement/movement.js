"use strict";

import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls';

// global
const globals = {bounds: 20, travel: 1, period: 50};

// init basics
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101010);
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
const materials = [new THREE.MeshPhongMaterial({color: 0x202020}),
    new THREE.MeshPhongMaterial({color: 0x502015})];
const newSprite = () => {
    return new THREE.Sprite(new THREE.SpriteMaterial({map: new THREE.TextureLoader().load('https://raw.githubusercontent.com/hyukjekwon/hk-three-js-testing/main/circle-16.png')}))
};
const v = (x, y, z) => new THREE.Vector3(x/2, y/2, z/2);
const cubePoints = [v(-1, -1, 1), v(-1, 1, 1), v(1, 1, 1), v(1, -1, 1), v(-1, -1, 1),
    v(-1, -1, -1), v(-1, 1, -1), v(1, 1, -1), v(1, -1, -1), v(1, -1, 1), v(1, -1, -1),
    v(-1, -1, -1), v(-1, 1, -1), v(-1, 1, 1), v(1, 1, 1), v(1, 1, -1)];
const cubeGeo = new THREE.BufferGeometry().setFromPoints(cubePoints);

// meshes
const plane = new THREE.Mesh(planeGeo, materials[0]);
plane.rotation.x = -Math.PI / 2
plane.position.y = -20
const boundingCube = new THREE.Line(cubeGeo, new THREE.LineBasicMaterial({color: 0xffffff}));
boundingCube.scale.set(20, 20, 20);
const agent = newSprite();
scene.add(plane);
scene.add(boundingCube);
scene.add(agent);

function generateMovement() {
    const vec = new THREE.Vector3().randomDirection();
    vec.multiplyScalar(Math.random() * globals.travel);
    return vec;
}

function smoothInterpolation(n) {
    return [...Array(n).keys()].map(e=>e/n).map(t => {
        const t2 = ((1 - Math.cos(t * Math.PI)) / 2)**10;
        return t2
    })
}

function doubleCosineCurve(n) {
    const points = [];
    for (let t = 1/n; t <= 1; t += 1/n) {
        let point;
        if (t <= 0.5) {
            point = (1 - Math.sqrt(Math.cos(Math.PI * t))) / 2;
        } else {
            point = 1 - ((1 - Math.sqrt(Math.cos(Math.PI * (t + 1)))) / 2);
        }
        points.push(point);
    }
    return points;
}

function interpolate(dest) {
    const movements = Math.floor(Math.random() * globals.period);
    const buf = [];
    let start = new THREE.Vector3(0, 0, 0);
    for (const t of doubleCosineCurve(movements)) {
        if (t) {
            start.lerp(dest, t);
            buf.push(start.clone());
        }
    }
    return buf;
}

function outsideBounds(pos) {
    const bounds = globals.bounds / 2;
    return [pos.x, pos.y, pos.z].reduce((acc, e) => {
        return acc || e < -bounds || e > bounds
    }, false);
}

let buf = []; // Vector3

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    if (outsideBounds(agent.position)) {
        buf.map((vec) => vec.multiplyScalar(-1));
    } 

    if (buf.length === 0) {
        const movement = generateMovement();
        buf = interpolate(movement);
    } else {
        agent.position.add(buf.pop(0));
    }

    renderer.render(scene, camera);
}

animate();

// GUI
const gui = new dat.GUI();
const folder = gui.addFolder('Controls');
const boundSlider = folder.add(globals, 'bounds', 1, 30);
boundSlider.onChange((value) => {
    globals.bounds = value;
    boundingCube.scale.set(value, value, value);
});
const travelSlider = folder.add(globals, 'travel', 0, 3);
travelSlider.onChange((value) => {
    globals.travel = value;
});
const periodSlider = folder.add(globals, 'period', 1, 100);
periodSlider.onChange((value) => {
    globals.period = value;
});
folder.open();
