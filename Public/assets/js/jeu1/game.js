import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { FBXLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/FBXLoader.js";

// Initialisation de la scène
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Bleu ciel

// Initialisation de la caméra
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 20); // Position initiale de la caméra

// Initialisation du rendu
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('game-container').appendChild(renderer.domElement);

// Lumières
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Lumière ambiante douce
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Charger le circuit
let circuit = null;
const circuitLoader = new FBXLoader();
circuitLoader.load(
    '/assets/js/jeu1/models/circuit.fbx',
    (fbx) => {
        circuit = fbx;

        // Ajuster l'échelle du circuit
        circuit.scale.set(10.05, -10.05, 10.05); // Ajustez selon vos besoins

        // Ajuster la position pour qu'il soit au bon endroit
        circuit.position.set(0, -2, 0); // Réglez la hauteur et les axes X, Z

        // Ajuster la rotation si nécessaire
        circuit.rotation.set(-Math.PI / 1, 0, 0); // Exemple de rotation (axe X à plat)

        // Ajouter le circuit à la scène
        scene.add(circuit);
    },
    undefined,
    (error) => {
        console.error('Erreur lors du chargement du circuit :', error);
    }
);


// Charger la voiture
let car = null;
const carLoader = new FBXLoader();
carLoader.load(
    '/assets/js/jeu1/models/car.fbx', // Chemin vers le modèle de la voiture
    (fbx) => {
        car = fbx;
        car.position.set(0, 1, 0); // Position initiale au-dessus du circuit
        car.scale.set(0.01, 0.01, 0.01); // Ajustez l'échelle si nécessaire
        scene.add(car);
    },
    undefined,
    (error) => {
        console.error('Erreur lors du chargement de la voiture :', error);
    }
);

// Variables de contrôle
const speed = 0.2; // Vitesse de déplacement
const rotationSpeed = 0.05; // Vitesse de rotation
const gravity = -0.05; // Gravité
const raycaster = new THREE.Raycaster(); // Pour détecter le sol
const keysPressed = {};

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
        let movement = 0; // Calculer le mouvement pour faire tourner les roues
        if (keysPressed['arrowup'] || keysPressed['z']) {
            car.position.z += speed * Math.cos(car.rotation.y);
            car.position.x += speed * Math.sin(car.rotation.y);
            movement = 1; // Avancer
        }
        if (keysPressed['arrowdown'] || keysPressed['s']) {
            car.position.z -= speed * Math.cos(car.rotation.y);
            car.position.x -= speed * Math.sin(car.rotation.y);
            movement = -1; // Reculer
        }

        // Tourner uniquement si la voiture avance ou recule
        if (movement !== 0) {
            if (keysPressed['arrowleft'] || keysPressed['q']) {
                car.rotation.y += rotationSpeed;
            }
            if (keysPressed['arrowright'] || keysPressed['d']) {
                car.rotation.y -= rotationSpeed;
            }
        }

        // Détecter la hauteur du circuit sous la voiture
        raycaster.set(car.position.clone().add(new THREE.Vector3(0, 10, 0)), new THREE.Vector3(0, -1, 0));
        const intersects = raycaster.intersectObject(circuit, true); // true pour vérifier les sous-objets

        if (intersects.length > 0) {
            const terrainHeight = intersects[0].point.y;
            if (car.position.y > terrainHeight + 0.5) {
                car.position.y += gravity; // Appliquer la gravité si au-dessus du sol
            } else {
                car.position.y = terrainHeight + 0.5; // Poser la voiture sur le circuit
            }
        } else {
            // Si la voiture est hors du circuit
            console.log("Hors circuit !");
            car.position.set(0, 1, 0); // Réinitialiser la position de la voiture
        }

        // Mise à jour de la position de la caméra pour qu'elle reste derrière la voiture
        const cameraOffset = new THREE.Vector3(0, 3, -7); // Position relative derrière et au-dessus
        const offsetDirection = new THREE.Vector3(
            -Math.sin(car.rotation.y),
            0,
            -Math.cos(car.rotation.y)
        );

        const targetPosition = car.position.clone().addScaledVector(offsetDirection, 7); // Position derrière
        targetPosition.y += 3; // Ajuster la hauteur
        camera.position.lerp(targetPosition, 0.1); // Interpolation pour des mouvements fluides
        camera.lookAt(car.position.x, car.position.y + 1, car.position.z); // Toujours regarder la voiture
    }

    renderer.render(scene, camera);
}

// Lancer l'animation
animate();
