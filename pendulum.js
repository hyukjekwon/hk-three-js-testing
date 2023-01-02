"use strict";

import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);

const pendGeo = new THREE.BoxGeometry(1, 10, 1);
const material = new THREE.MeshBasicMaterial({color: 0xbf306f});
const pend1 = new THREE.Mesh(pendGeo, material);
scene.add(pend1);

camera.position.z = 10;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();