import * as THREE from "three";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js"

function $(id) {
    return document.getElementById(id);
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 0.75;
camera.rotation.x = -0.6;
const redLight = new THREE.DirectionalLight(0xffa000, 1);
redLight.position.set(4,0,2);
const blueLight = new THREE.DirectionalLight(0x0000ff, 1);
blueLight.position.set(-4,0,2);
scene.add(redLight);
scene.add(blueLight)
scene.add(new THREE.AmbientLight(0x000ff, 1));

const lineMat = new THREE.LineBasicMaterial({color: 0xffffff});
const vec = (x, y) => new THREE.Vector3(x, y, 0);

function interpVecs(p1, p2, n) {
    const vecs = []
    for (let i = 1/n; i <= 1; i += 1/n) {
        const newvec = new THREE.Vector3();
        newvec.lerpVectors(p1, p2, i);
        vecs.push(newvec);
    }
    return vecs;
}

let points = () => interpVecs(vec(-10, -2), vec(10, -2), 50);
const lines = [];

let t = 0;

function animate() {
    requestAnimationFrame(animate);
    if (t % 10 === 0) {
        const newPoints = points().map(vector => vector.add(new THREE.Vector3(0, (Math.random()-0.5)/2, 0)));
        const newGeo = new THREE.BufferGeometry().setFromPoints(newPoints);
        const line = new THREE.Line(newGeo, lineMat);
        line.position.z = -20;
        lines.push(line);
        scene.add(line);
        if (lines.length > 30) {
            scene.remove(lines.shift());
        }
    }
    lines.forEach((line) => {
        line.position.z += 0.075;
    });
    t += 1;
    renderer.render(scene, camera);
}

animate();