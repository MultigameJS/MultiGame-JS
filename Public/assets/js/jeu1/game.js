import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { FBXLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Initialisation de la scène
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Bleu ciel

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

// Charger le circuit
const circuitLoader = new GLTFLoader();
circuitLoader.load(
    '/assets/js/jeu1/models/circuit.glb', // Chemin vers le fichier GLB
    (gltf) => {
        circuit = gltf.scene;

        // Ajuster l'échelle, la position et la rotation du circuit
        circuit.scale.set(1000, 1000, 1000);
        circuit.position.set(1, 0.6, 1);
        circuit.rotation.set(0, 0, 0);

        // Ajouter le circuit à la scène
        scene.add(circuit);

        // Parcourir les sous-objets pour détecter les colliders
        circuit.traverse((child) => {
            if (child.isMesh) {
                const box = new THREE.Box3().setFromObject(child);
                terrainColliders.push({ box, object: child });
            }
        });

        console.log("Terrain chargé avec colliders.");
    },
    undefined,
    (error) => {
        console.error('Erreur lors du chargement du circuit :', error);
    }
);

// Charger la voiture
const carLoader = new FBXLoader();
carLoader.load(
    '/assets/js/jeu1/models/car.fbx',
    (fbx) => {
        car = fbx;

        // Position initiale de la voiture
        car.position.set(285, 10, 122);
        car.rotation.set(0, 1.8, 0);
        car.scale.set(0.01, 0.01, 0.01);

        // Ajouter la voiture à la scène
        scene.add(car);

        // Initialiser la boîte englobante de la voiture
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

// Fonction d'animation
function animate() {
    requestAnimationFrame(animate);

    if (car && circuit) {
        let movement = 0;
        const previousPosition = car.position.clone(); // Enregistrer la position précédente

        // Appliquer la gravité
        velocityY += gravity;
        car.position.y += velocityY;

        // Détection du sol via le Raycaster
        const raycaster = new THREE.Raycaster();
        raycaster.set(car.position.clone().add(new THREE.Vector3(0, 5, 0)), new THREE.Vector3(0, -1, 0));
        const intersects = raycaster.intersectObjects(circuit.children, true);

        if (intersects.length > 0) {
            const groundY = intersects[0].point.y;
            if (car.position.y <= groundY + 0.5) {
                car.position.y = groundY + 0.5;
                velocityY = 0; // Stopper la chute
            }
        }

        // Déplacement de la voiture
        if (keysPressed['arrowup'] || keysPressed['z']) {
            car.position.z += 0.7 * Math.cos(car.rotation.y);
            car.position.x += 0.7 * Math.sin(car.rotation.y);
            movement = 1;
        }
        if (keysPressed['arrowdown'] || keysPressed['s']) {
            car.position.z -= 0.7 * Math.cos(car.rotation.y);
            car.position.x -= 0.7 * Math.sin(car.rotation.y);
            movement = -1;
        }

        // Rotation de la voiture
        if (movement !== 0) {
            if (keysPressed['arrowleft'] || keysPressed['q']) {
                car.rotation.y += 0.05;
            }
            if (keysPressed['arrowright'] || keysPressed['d']) {
                car.rotation.y -= 0.05;
            }
        }

        // Mise à jour de la boîte englobante de la voiture
        carBox.setFromObject(car);

        // Détection des collisions avec les éléments du terrain
        let collisionDetected = false;
        for (const { box } of terrainColliders) {
            if (carBox.intersectsBox(box)) {
                console.log('Collision détectée');
                collisionDetected = true;
                break;
            }
        }

        // Si une collision est détectée, annuler le déplacement
        if (collisionDetected) {
            car.position.copy(previousPosition);
        }

        // Mise à jour de la caméra
        const cameraOffset = new THREE.Vector3(0, 3, -7);
        const offsetDirection = new THREE.Vector3(
            -Math.sin(car.rotation.y),
            0,
            -Math.cos(car.rotation.y)
        );
        const targetPosition = car.position.clone().addScaledVector(offsetDirection, 7);
        targetPosition.y += 3;
        camera.position.lerp(targetPosition, 0.1);
        camera.lookAt(car.position.x, car.position.y + 1, car.position.z);
    }

    renderer.render(scene, camera);
}

// Lancer l'animation
animate();
