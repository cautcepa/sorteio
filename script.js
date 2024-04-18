document.getElementById('drawButton').addEventListener('click', function() {
  fetch('cadastrados.json')
    .then(response => response.json())
    .then(data => {
      const names = data.names;
      const index = Math.floor(Math.random() * names.length);
      const winnerNameElement = document.getElementById('winnerName');
      
      // Função para animar o sorteio por 5 segundos antes de mostrar o nome definitivo
      const animateWinner = () => {
        let counter = 0;
        const animationInterval = setInterval(() => {
          const randomIndex = Math.floor(Math.random() * names.length);
          winnerNameElement.textContent = names[randomIndex];
          counter++;
          if (counter >= 50) { // 50 iterações x 100ms cada = 5 segundos
            clearInterval(animationInterval);
            winnerNameElement.textContent = names[index]; // Nome definitivo
          }
        }, 100); // Intervalo de 100ms para a animação (pode ajustar conforme necessário)
      };

      // Inicia a animação
      animateWinner();

      // Confirma se há nome para ativar confetes
      if (names[index]) {
        window.confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          decay: 0.9
        });
      }
    })
    .catch(error => {
      console.error('Erro ao buscar os nomes:', error);
      document.getElementById('winnerName').textContent = 'Erro ao carregar nomes!';
    });
});
