import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'

document.querySelector('#app').innerHTML = `
        <section class="modelo3d" style="height: 700px; width: 100%;">
            <!-- Aquí se añadirá el canvas -->
            <div class="card-car">
                <button id="resetCameraButton">Salir del interior</button>
                <button id="openLeftFrontDoorButton">Abrir puerta delantera izquierda</button>
                <button id="closeLeftFrontDoorButton">Cerrar puerta delantera izquierda</button>
                <button id="openRightFrontDoorButton">Abrir puerta delantera derecha</button>
                <button id="closeRightFrontDoorButton">Cerrar puerta delantera derecha</button>
                <button id="openLeftRearDoorButton">Abrir puerta trasera izquierda</button>
                <button id="closeLeftRearDoorButton">Cerrar puerta trasera izquierda</button>
                <button id="openRightRearDoorButton">Abrir puerta trasera derecha</button>
                <button id="closeRightRearDoorButton">Cerrar puerta trasera derecha</button>
                <button id="moveCameraButton" class="moveCameraButton">ver interior</button>
            </div>
        </section>
`

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

let hemiLight;
// Crear la escena
const scene = new THREE.Scene()

// Cargar y configurar el HDRI
const rgbeLoader = new RGBELoader();
rgbeLoader.load('hdri/2.hdr', function(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
});

// Añadir luces
let light1 = new THREE.PointLight(0xffffff, 3);
light1.position.set(0, 1.5, 2.5);
scene.add(light1);

let light2 = new THREE.PointLight(0xffffff, 3);
light2.position.set(2.5, 0.5, 0);
scene.add(light2);

let light3 = new THREE.PointLight(0xffffff, 3);
light3.position.set(0, 0.75, -4);
scene.add(light3);

let light4 = new THREE.PointLight(0xffffff, 3);
light4.position.set(-2.5, 1.5, 0);
scene.add(light4);

// Configurar la cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3.8;
camera.position.y = 1.5;
camera.position.x = 1.3;
light1.castShadow = true;
camera.lookAt(new THREE.Vector3(0, 0, 0)); // Asegúrate de que la cámara esté mirando al centro del modelo

// Configurar el renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 1.3;

// Añadir el canvas al div con la clase modelo3d
const modelContainer = document.querySelector('.modelo3d');
modelContainer.appendChild(renderer.domElement);

// Ajustar el tamaño del renderer al tamaño del contenedor
renderer.setSize(modelContainer.clientWidth, modelContainer.clientHeight);

// Configurar controles de la cámara
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

controls.minPolarAngle = Math.PI / 3; // Puedes ajustar estos valores según tus necesidades
controls.maxPolarAngle = Math.PI / 2.5; // Puedes ajustar estos valores según tus necesidades
//controls.minPolarAngle = Math.PI / 2; // Limita la rotación hacia arriba
//controls.maxPolarAngle = Math.PI / 2; // Limita la rotación hacia abajo
// Cargar el modelo GLTF
const loader = new GLTFLoader();
let carModel;
let leftFrontDoor, rightFrontDoor, leftRearDoor, rightRearDoor;

hemiLight = new THREE.HemisphereLight(0xd7e2e5, 0x080820, 2);
scene.add(hemiLight);

loader.load(
    '3d/omodagod.glb',
    function (gltf) {
        const model = gltf.scene;

        carModel = gltf.scene;
        carModel.traverse(function (child) {
            console.log(child.name);
            if (child.name === 'puertadelanteraizquierda') {
                leftFrontDoor = child;
            }
            if (child.name === 'puertaderechadelantera') {
                rightFrontDoor = child;
            }
            if (child.name === 'puertatraseraizquierda') {
                leftRearDoor = child;
            }
            if (child.name === 'puertatraseraderecha') {
                rightRearDoor = child;
            }
        });

        model.position.x = 0.4;
        model.rotation.y = 0;

        scene.add(carModel);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
        console.log(error);
    }
);

// Funciones para abrir y cerrar puertas de forma independiente
function openLeftFrontDoor() {
    if (leftFrontDoor) {
        leftFrontDoor.rotation.y = -Math.PI / 0.57; 
        abrirDoor.play();
    }
}

function closeLeftFrontDoor() {
    if (leftFrontDoor) {
        leftFrontDoor.rotation.y = 0; 
        cerrarDoor.play();
    }
}

function openRightFrontDoor() {
    if (rightFrontDoor) {
        rightFrontDoor.rotation.y = Math.PI / 0.57; 
        abrirDoor.play();
    }
}

function closeRightFrontDoor() {
    if (rightFrontDoor) {
        rightFrontDoor.rotation.y = 0; 
        cerrarDoor.play();
    }
}

function openLeftRearDoor() {
    if (leftRearDoor) {
        leftRearDoor.rotation.y = -Math.PI / 0.57; 
        abrirDoor.play();
    }
}

function closeLeftRearDoor() {
    if (leftRearDoor) {
        leftRearDoor.rotation.y = 0; 
        cerrarDoor.play();
    }
}

function openRightRearDoor() {
    if (rightRearDoor) {
        rightRearDoor.rotation.y = Math.PI / 0.57; 
        abrirDoor.play();
    }
}

function closeRightRearDoor() {
    if (rightRearDoor) {
        rightRearDoor.rotation.y = 0; 
        cerrarDoor.play();
    }
}

const abrirDoor = new Audio('audio/abrir.mp3');
const cerrarDoor = new Audio('audio/cerrar.mp3');

document.getElementById('openLeftFrontDoorButton').addEventListener('click', openLeftFrontDoor);
document.getElementById('closeLeftFrontDoorButton').addEventListener('click', closeLeftFrontDoor);
document.getElementById('openRightFrontDoorButton').addEventListener('click', openRightFrontDoor);
document.getElementById('closeRightFrontDoorButton').addEventListener('click', closeRightFrontDoor);
document.getElementById('openLeftRearDoorButton').addEventListener('click', openLeftRearDoor);
document.getElementById('closeLeftRearDoorButton').addEventListener('click', closeLeftRearDoor);
document.getElementById('openRightRearDoorButton').addEventListener('click', openRightRearDoor);
document.getElementById('closeRightRearDoorButton').addEventListener('click', closeRightRearDoor);

const originalCameraPosition = new THREE.Vector3(1.9, 2.2, 2.5);
const originalTargetPosition = new THREE.Vector3(0, 0, 0);

function resetCamera() {
    camera.position.copy(originalCameraPosition);
    camera.lookAt(originalTargetPosition);
    controls.minAzimuthAngle = -Infinity; 
    controls.maxAzimuthAngle = Infinity;  
    controls.minPolarAngle = 0;           
    controls.maxPolarAngle = Math.PI;
    controls.update();
}

const resetCameraButton = document.getElementById('resetCameraButton');
resetCameraButton.addEventListener('click', resetCamera);

function moveCamera() {
    camera.position.set(0.80, 1.2, -0.56);
    controls.minAzimuthAngle = -Math.PI / 1;
    controls.maxAzimuthAngle = Math.PI / 1;
}

const moveCameraButton = document.getElementById('moveCameraButton');
moveCameraButton.addEventListener('click', moveCamera);

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function render() {
    renderer.render(scene, camera, hemiLight);
}
controls.update();

animate();
