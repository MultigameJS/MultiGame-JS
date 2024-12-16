import { saveScore } from "/assets/js/racing/saveScore.js";

// Fonction d'animation
export function animate() {
    requestAnimationFrame(animate);

    if (car && circuit && finishLine && barrier) {
        let movement = 0;
        const previousPosition = car.position.clone();

        // Appliquer la gravité
        velocityY += gravity;
        car.position.y += velocityY;

        const raycaster = new THREE.Raycaster();
        raycaster.set(car.position.clone().add(new THREE.Vector3(0, 5, 0)), new THREE.Vector3(0, -1, 0));
        const intersects = raycaster.intersectObjects(circuit.children, true);

        if (intersects.length > 2) {
            const groundY = intersects[0].point.y;
            if (car.position.y <= groundY + 0.5) {
                car.position.y = groundY + 0.5;
                velocityY = 0;
            }
        }

        if (car && car.position.y < -10) { // Si la voiture tombe sous le sol
            isControlEnabled = false;     // Désactiver les contrôles
            isGameOver = true;            // Marquer la partie comme terminée
            chronoDiv.textContent = 'La voiture est tombée. Cliquez sur Restart.';
            restartButton.style.display = 'block'; // Afficher le bouton Restart

            restartButton.addEventListener('click', () => {
                // Réinitialiser les variables de jeu
                isControlEnabled = true;
                isGameOver = false;
                isChronometerRunning = false;
                isLapComplete = false;
                startTime = 0;
                lapTime = 0;
                isBarrierActive = false;
            
                // Réinitialiser la position de la voiture
                car.position.set(285, 1, 122);
                car.rotation.set(0, 1.8, 0);
                velocityY = 0;
            
                // Réinitialiser l'interface utilisateur
                chronoDiv.textContent = "Temps : 0.00s";
                restartButton.style.display = 'none';
            });
        }        

        if (isControlEnabled && !isGameOver) {
            // Déplacement de la voiture
            if (keysPressed['arrowup'] || keysPressed['z']) {
                car.position.z += 1 * Math.cos(car.rotation.y);
                car.position.x += 1 * Math.sin(car.rotation.y);
                movement = 1;
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
        }

        carBox.setFromObject(car);

        let collisionDetected = false;
        for (const { box } of terrainColliders) {
            if (carBox.intersectsBox(box)) {
                console.log('Collision détectée');
                collisionDetected = true;
                break;
            }
        }
        if (collisionDetected) {
            car.position.copy(previousPosition);
        }

        const finishBox = new THREE.Box3().setFromObject(finishLine);
        const barrierBox = new THREE.Box3().setFromObject(barrier);

        // Vérifier si la voiture est dans la zone de la ligne d’arrivée
        if (carBox.intersectsBox(finishBox)) {
            isCarInFinishZone = true;
        } else {
            if (isCarInFinishZone) {
                // La voiture quitte la zone, activer la barrière
                isBarrierActive = true;
                barrier.material.color.set(0xff0000); // Change la couleur de la barrière pour indiquer qu’elle est active
                console.log("Barrière activée !");
            }
            isCarInFinishZone = false;
        }

        // Vérifier les collisions avec la barrière si elle est active
        if (isBarrierActive && carBox.intersectsBox(barrierBox)) {
            console.log('Collision avec la barrière détectée');
            car.position.copy(previousPosition); // Empêche la voiture de traverser la barrière
            isControlEnabled = false; // Désactiver les contrôles
            isChronometerRunning = false; // Arrêter le chronomètre
            isGameOver = true; // Indiquer que la partie est terminée
            lapTime = (performance.now() - startTime) / 1000; // Calculer le temps final
            chronoDiv.textContent = `Temps : ${lapTime.toFixed(2)}s`;
            restartButton.style.display = 'block'; // Afficher le bouton Restart
            if (user) {
                let id_user = document.getElementById('id')?.textContent;
                let score = document.getElementById('chrono')?.textContent?.replace("Temps : ", "");
                let csrf = document.getElementById('csrf')?.textContent;
                saveScore(id_user, score, csrf); // Enregistrer le score
            }
            restartButton.addEventListener('click', () => {
                // Réinitialiser les variables de jeu
                isControlEnabled = true;
                isGameOver = false;
                isChronometerRunning = false;
                isLapComplete = false;
                startTime = 0;
                lapTime = 0;
                isBarrierActive = false;
            
                // Réinitialiser la position de la voiture
                car.position.set(285, 1, 122);
                car.rotation.set(0, 1.8, 0);
                velocityY = 0;
            
                // Réinitialiser l'interface utilisateur
                chronoDiv.textContent = "Temps : 0.00s";
                restartButton.style.display = 'none';
            });
        }

        if (!isChronometerRunning && movement !== 0 && !isLapComplete && !isGameOver) {
            startTime = performance.now();
            isChronometerRunning = true;
            chronoDiv.textContent = "Temps : 0.00s";
        }

        if (isChronometerRunning && !isGameOver) {
            const currentTime = (performance.now() - startTime) / 1000;
            chronoDiv.textContent = `Temps : ${currentTime.toFixed(2)}s`;
        }

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