document.getElementById('drawButton').addEventListener('click', function() {
  fetch('cadastrados.json')
    .then(response => response.json())
    .then(data => {
      const names = data.names;
      const index = Math.floor(Math.random() * names.length);
      document.getElementById('winnerName').textContent = names[index];
      // Verifica se há um nome para ativar os confetes
      if (names[index]) {
        // Define a quantidade de instâncias de confetes
        const numInstances = 5;
        for (let i = 0; i < numInstances; i++) {
          window.confetti({
            particleCount: 200, // Número de confetes em cada instância
            spread: 360,        // Cobrir toda a tela horizontalmente
            angle: 90,          // Ângulo de queda para baixo
            origin: { y: 0 },   // Origem no topo da tela
            colors: ['#FF0000', '#00FF00', '#0000FF'], // Cores fortes
            alpha: 1            // Confetes opacos
          });
        }
      }
    })
    .catch(error => {
      console.error('Erro ao buscar os nomes:', error);
      document.getElementById('winnerName').textContent = 'Erro ao carregar nomes!';
    });
});
