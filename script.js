document.getElementById('drawButton').addEventListener('click', function() {
  fetch('cadastrados.json')
    .then(response => response.json())
    .then(data => {
      const names = data.names;
      const index = Math.floor(Math.random() * names.length);
      document.getElementById('winnerName').textContent = names[index];
      // Confirma se há nome para ativar confetes
      if (names[index]) {
        window.confetti({
          particleCount: 300,
          spread: 95,
          origin: { y: 0.6 }
        });
      }
    })
    .catch(error => {
      console.error('Erro ao buscar os nomes:', error);
      document.getElementById('winnerName').textContent = 'Erro ao carregar nomes!';
    });
});
