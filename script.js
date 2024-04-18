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
          particleCount: 150,
          spread: 70,
          angle: 90,           // Define o ângulo para que os confetes sejam lançados para baixo
          origin: { y: 0 }     // Configura a origem no topo do viewport
        });
      }
    })
    .catch(error => {
      console.error('Erro ao buscar os nomes:', error);
      document.getElementById('winnerName').textContent = 'Erro ao carregar nomes!';
    });
});
