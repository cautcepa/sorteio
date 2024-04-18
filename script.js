// Adiciona um evento de clique ao botão com id 'drawButton'
document.getElementById('drawButton').addEventListener('click', function() {
  // Cria um novo objeto de áudio e carrega o arquivo 'sound.mp3'
  const audio = new Audio('sound.mp3');

  // Toca o arquivo de áudio
  audio.play().catch(error => console.error('Erro ao tocar o áudio:', error));

  // Faz uma solicitação HTTP GET para obter dados do arquivo 'cadastrados.json'
  fetch('cadastrados.json')
    .then(response => response.json()) // Converte a resposta recebida em JSON
    .then(data => {
      const names = data.names; // Extrai o array 'names' do objeto de dados JSON
      const index = Math.floor(Math.random() * names.length); // Gera um índice aleatório com base no tamanho do array 'names'
      const winnerNameElement = document.getElementById('winnerName'); // Seleciona o elemento HTML onde o nome do vencedor será exibido
      
      // Define uma função para animar a exibição de nomes aleatórios antes de mostrar o vencedor final
      const animateWinner = () => {
        let counter = 0; // Contador para controlar o número de iterações da animação
        const animationInterval = setInterval(() => {
          const randomIndex = Math.floor(Math.random() * names.length); // Índice aleatório para escolher um nome temporário
          winnerNameElement.textContent = names[randomIndex]; // Exibe um nome aleatório no elemento 'winnerName'
          counter++;
          if (counter >= 55) { // Verifica se já foram realizadas 50 iterações
            clearInterval(animationInterval); // Interrompe a animação
            winnerNameElement.textContent = names[index]; // Exibe o nome definitivo do vencedor

            // Verifica se o nome selecionado é válido (não vazio) antes de ativar confetes
            if (names[index]) {
              window.confetti({
                particleCount: 2000, // Número de partículas de confete
                spread: 360, // Ângulo de espalhamento das partículas
                origin: { y: 0.6 }, // Origem da animação de confete (no meio da tela)
                decay: 0.9 // Decaimento das partículas para que desapareçam suavemente
              });
            }
          }
        }, 100); // Define o intervalo de tempo para a animação (100 milissegundos)
      };

      animateWinner(); // Chama a função para iniciar a animação
    })
    .catch(error => {
      console.error('Erro ao buscar os nomes:', error); // Log de erros caso a requisição falhe
      document.getElementById('winnerName').textContent = 'Erro ao carregar nomes!'; // Exibe mensagem de erro no elemento 'winnerName'
    });
});
