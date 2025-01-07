import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.171.0/build/three.module.js';

document.addEventListener("DOMContentLoaded", () => {
    // Récupère l'élément contenant le jeu
    const gameContainer = document.getElementById("gameContainer");

    // Création de la scène, de la caméra et du rendu
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, gameContainer.clientWidth / gameContainer.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    // Ajuste la taille du rendu à celle de la div
    renderer.setSize(gameContainer.clientWidth, gameContainer.clientHeight);

    // Ajoute le canvas de Three.js dans la div
    gameContainer.appendChild(renderer.domElement);

    // Création d'un cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Position de la caméra
    camera.position.z = 5;

    // Animation du cube
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    animate();
});
