document.getElementById('drawButton').addEventListener('click', function() {
  fetch('cadastrados.json')
    .then(response => response.json())
    .then(data => {
      const names = data.names;
      const index = Math.floor(Math.random() * names.length);
      document.getElementById('winnerName').textContent = names[index];
      // Verifica se há um nome para ativar os confetes
      if (names[index]) {
        window.confetti({
          particleCount: 1000, // Aumenta o número de confetes para uma chuva mais intensa
          spread: 360,        // Define o spread como 360 para que os confetes cubram toda a tela horizontalmente
          angle: 90,          // Define o ângulo para que os confetes sejam lançados para baixo
          origin: { y: 0 },   // Configura a origem no topo do viewport
          colors: ['#FF0000', '#00FF00', '#0000FF'], // Cores mais fortes e vívidas
          alpha: 1            // Ajusta a transparência para 1 (opaco)
        });
      }
    })
    .catch(error => {
      console.error('Erro ao buscar os nomes:', error);
      document.getElementById('winnerName').textContent = 'Erro ao carregar nomes!';
    });
});
