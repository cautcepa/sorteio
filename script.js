// Adiciona o evento de clique ao botão com id 'drawButton'
document.getElementById('drawButton').addEventListener('click', async () => {
  try {
    // Reproduz o som do sorteio
    const audio = new Audio('sound.mp3');
    await audio.play();

    // Busca os dados dos participantes
    const response = await fetch('cadastrados.json');
    const data = await response.json();
    const names = data.names;
    
    // Inicia a animação de sorteio
    animateDrawing(names);

  } catch (error) {
    console.error('Erro na operação:', error);
    document.getElementById('winnerName').textContent = 'Erro ao realizar o sorteio!';
  }
});

// Animação dos nomes antes do resultado final
function animateDrawing(names) {
  const winnerNameElement = document.getElementById('winnerName');
  let counter = 0;
  const animationInterval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * names.length);
    winnerNameElement.textContent = names[randomIndex];
    counter++;
    
    if (counter >= 55) { // Assegura que haja 55 iterações antes de parar a animação
      clearInterval(animationInterval);
      displayFinalWinner(names, randomIndex);
    }
  }, 100);
}

// Exibe o nome do vencedor e lança confetes
function displayFinalWinner(names, index) {
  const winnerNameElement = document.getElementById('winnerName');
  winnerNameElement.textContent = names[index]; // Mostra o nome final escolhido após a animação

  if (names[index]) {
    launchConfetti();
  }
}

// Configura e lança os confetes
function launchConfetti() {
  const confettiSettings = {
    particleCount: 2000,
    startVelocity: 100,  // Aumentado para enviar confetes mais longe
    gravity: 0.2,  // Diminuído para fazer com que os confetes caiam mais lentamente
    spread: 360,
    startVelocity: 30,
    origin: { y: 0.6 }
  };

  // Utiliza a biblioteca canvas-confetti para criar efeito visual
  confetti.create(document.getElementById('canvas'), { resize: true })(confettiSettings);
}
