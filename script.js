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
    particleCount: 2500,
    startVelocity: 70,  // Moderadamente alto para enviar confetes longe, mas não demasiado rápido
    gravity: 0.1,  // Reduzido para uma queda mais lenta
    spread: 360,
    origin: { y: 0.6 },
    ticks: 1000,   // Aumentado para prolongar a duração da animação
    scalar: 1.5,   // Tamanho dos confetes aumentado em 1,5 vezes
    shapes: ['square', 'circle', 'star'],  // Adiciona formatos variados de confetes
    wobble: 0.1  // Adiciona um leve movimento oscilatório aos confetes
  };

  // Utiliza a biblioteca canvas-confetti para criar efeito visual
  confetti.create(document.getElementById('canvas'), { resize: true })(confettiSettings);
}
