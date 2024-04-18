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
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          decay: 0.5 // Reduz o tempo de duração do confete (valor padrão é 0.9)
        });
      }
    })
    .catch(error => {
      console.error('Erro ao buscar os nomes:', error);
      document.getElementById('winnerName').textContent = 'Erro ao carregar nomes!';
    });
});
