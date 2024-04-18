document.getElementById('drawButton').addEventListener('click', function() {
  fetch('cadastrados.json')
    .then(response => response.json())
    .then(data => {
      const names = data.names;
      const index = Math.floor(Math.random() * names.length);
      document.getElementById('winnerName').textContent = names[index];
      if (names[index]) {
        // Dispara confetes de várias origens ao longo do eixo x
        for (let i = 0; i < 10; i++) { // 10 lançamentos de confetes ao longo do topo
          window.confetti({
            particleCount: 20, // menor contagem para cada lançamento individual
            angle: 90,
            spread: 55, // Spread mais estreito para cada lançamento
            origin: { x: i * 0.1, y: 0 }, // Varia a posição x de 0 a 1
            gravity: 0.4,
            drift: 0.4
          });
        }
      }
    })
    .catch(error => {
      console.error('Erro ao buscar os nomes:', error);
      document.getElementById('winnerName').textContent = 'Erro ao carregar nomes!';
    });
});
