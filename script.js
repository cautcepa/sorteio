// Adiciona um ouvinte de evento ao botão com o ID 'drawButton'. 
// Este ouvinte aguarda um clique para executar a função definida.
document.getElementById('drawButton').addEventListener('click', function() {
  // Realiza uma solicitação HTTP GET para buscar o arquivo 'cadastrados.json'.
  fetch('cadastrados.json')
    .then(response => response.json())  // Converte a resposta recebida em JSON.
    .then(data => {
      // Extrai o array 'names' do objeto JSON recebido.
      const names = data.names;
      // Gera um índice aleatório com base no tamanho do array 'names'.
      const index = Math.floor(Math.random() * names.length);
      // Define o texto do elemento HTML com o ID 'winnerName' para o nome sorteado.
      document.getElementById('winnerName').textContent = names[index];

      // Verifica se um nome foi sorteado com sucesso.
      if (names[index]) {
        // Dispara confetes na página se um nome válido foi sorteado.
        window.confetti({
          particleCount: 1000, // Número de partículas de confete.
          spread: 180,         // Grau de dispersão das partículas.
          origin: { y: 0.6 }  // Origem vertical dos confetes, um pouco acima do meio da página.
        });
      }
    })
    .catch(error => {
      // Captura e registra qualquer erro que ocorra durante a solicitação ou processamento do JSON.
      console.error('Erro ao buscar os nomes:', error);
      // Mostra uma mensagem de erro no lugar do nome do vencedor se algo der errado.
      document.getElementById('winnerName').textContent = 'Erro ao carregar nomes!';
    });
});
