document.addEventListener("DOMContentLoaded", () => {
  const coinSound = new Audio("/assets/sounds/justprice/songcoins.mp3");
  coinSound.volume = 0.4;
  let soundPlayed = false;

  let coinCount = 0;
  const maxCoins = 50;

  function createCoin() {
    const coin = document.createElement("div");
    coin.classList.add("coin");

    coin.style.width = "60px";
    coin.style.height = "60px";

    // POSITION ALÉATOIRE
    coin.style.left = `${Math.random() * window.innerWidth}px`;
    coin.style.top = `-50px`;

    document.body.appendChild(coin);

    let position = -50;
    const speed = Math.random() * 3 + 2;

    function fall() {
      position += speed;
      coin.style.top = `${position}px`;

      if (position < window.innerHeight) {
        requestAnimationFrame(fall);
      } else {
        coin.remove();
      }
    }
    requestAnimationFrame(fall);
  }

  function generateCoins() {
    if (coinCount < maxCoins) {
      createCoin();
      coinCount++;
    }
  }

  function playSoundOnce() {
    if (!soundPlayed) {
      coinSound.currentTime = 0;
      coinSound.play().catch((error) => console.error("🔇 Erreur audio:", error));
      soundPlayed = true;
    }
  }

  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      playSoundOnce(); // DÉCLENCHE LE SON UNIQUEMENT AU PREMIER CLIC
      setInterval(generateCoins, 200); // LANCE LA CHUTE DES PIECES APRES CLIC
    });
  });
});
