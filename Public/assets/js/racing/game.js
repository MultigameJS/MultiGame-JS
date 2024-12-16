import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { FBXLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { animate } from "/assets/js/racing/animate.js";

// Initialisation de la scène
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// Initialisation de la caméra
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 20);

// Initialisation du rendu
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('game-container').appendChild(renderer.domElement);

// Lumières
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Variables globales
let circuit = null;
let car = null;
let carBox = null; // Boîte englobante de la voiture
const terrainColliders = []; // Colliders pour tous les objets du terrain

const gravity = -0.1; // Gravité
let velocityY = 0; // Vitesse verticale
const keysPressed = {}; // Suivi des touches

// Chronomètre
let startTime = null;
let lapTime = null;
let isChronometerRunning = false;
let isLapComplete = false; // Indique si le tour est terminé
let isControlEnabled = true; // Indique si les contrôles sont actifs
let isGameOver = false; // Indique si la partie est terminée

// Ligne d’arrivée
let finishLine = null;

// Barrière
let barrier = null;
let isBarrierActive = false; // Indique si la barrière est active
let isCarInFinishZone = false; // Indique si la voiture est dans la zone d’arrivée

// Référence au div du chronomètre
const chronoDiv = document.getElementById('chrono');

// Référence au bouton de redémarrage
const restartButton = document.getElementById('restart-button');

const user = document.getElementById('id');

// Charger le circuit
const circuitLoader = new GLTFLoader();
circuitLoader.load(
    '/assets/js/racing/models/circuit.glb',
    (gltf) => {
        circuit = gltf.scene;

        circuit.scale.set(1000, 1000, 1000);
        circuit.position.set(1, 0.6, 1);
        circuit.rotation.set(0, 0, 0);

        scene.add(circuit);

        circuit.traverse((child) => {
            if (child.isMesh) {
                const box = new THREE.Box3().setFromObject(child);
                terrainColliders.push({ box, object: child });
            }
        });

        // Ajouter une ligne d’arrivée (boîte virtuelle)
        const finishLineGeometry = new THREE.BoxGeometry(10, 5, 1);
        const finishLineMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        finishLine = new THREE.Mesh(finishLineGeometry, finishLineMaterial);
        finishLine.position.set(287, 2.5, 120); // Positionner la ligne d'arrivée sur le circuit
        finishLine.rotation.set(0, 1.7, 0);
        finishLine.scale.set(3, 2, 0.01);
        finishLine.visible = false; // Cacher la ligne d'arrivée visuellement
        scene.add(finishLine);

        // Ajouter une barrière
        const barrierGeometry = new THREE.BoxGeometry(10, 5, 1);
        const barrierMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
        barrier = new THREE.Mesh(barrierGeometry, barrierMaterial);
        barrier.position.set(287, 2.5, 120); // Positionner la barrière sur la ligne d’arrivée
        barrier.rotation.set(0, 1.7, 0);
        barrier.scale.set(3, 2, 0.1);
        barrier.visible = false; // Cacher la barrière visuellement
        scene.add(barrier);

        console.log("Terrain et ligne d’arrivée chargés.");
    },
    undefined,
    (error) => {
        console.error('Erreur lors du chargement du circuit :', error);
    }
);

// Charger la voiture
const carLoader = new FBXLoader();
carLoader.load(
    '/assets/js/racing/models/car.fbx',
    (fbx) => {
        car = fbx;

        car.position.set(285, 10, 122);
        car.rotation.set(0, 1.8, 0);
        car.scale.set(0.01, 0.01, 0.01);

        scene.add(car);
        carBox = new THREE.Box3().setFromObject(car);

        console.log("Voiture chargée.");
    },
    undefined,
    (error) => {
        console.error('Erreur lors du chargement de la voiture :', error);
    }
);

// Écoute des événements clavier
window.addEventListener('keydown', (event) => {
    keysPressed[event.key.toLowerCase()] = true;
});
window.addEventListener('keyup', (event) => {
    keysPressed[event.key.toLowerCase()] = false;
});



animate();