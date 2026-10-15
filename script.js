const colorButtons = document.querySelectorAll('.color-button');
const startButton = document.querySelector('.start-button');
const statusBox = document.querySelector('.status');
const statusTitle = document.querySelector('.status-title');
const statusText = document.querySelector('.status-text');

// A sequência do jogo: uma lista de botões, na ordem em que acendem
let sequence = [];

// A posição da sequência que o jogador precisa acertar agora
let step = 0;

// O contexto de áudio só é criado no primeiro toque (regra dos navegadores)
let audioContext = null;

// Toca um tom curto na frequência pedida, em hertz
const playTone = (frequency) => {
  if (audioContext === null) {
    audioContext = new AudioContext();
  }

  const oscillator = audioContext.createOscillator();
  const volume = audioContext.createGain();
  const now = audioContext.currentTime;

  oscillator.type = 'triangle';
  oscillator.frequency.value = frequency;

  // O volume começa em 0.3 e desce até 0 em 0.4 segundo, sem estalo no fim
  volume.gain.setValueAtTime(0.3, now);
  volume.gain.linearRampToValueAtTime(0, now + 0.4);

  oscillator.connect(volume);
  volume.connect(audioContext.destination);

  oscillator.start(now);
  oscillator.stop(now + 0.4);
};

// Acende o botão, toca o som dele e apaga depois de um instante
const playButton = (button) => {
  button.classList.add('is-lit');
  playTone(Number(button.dataset.frequency));

  setTimeout(() => {
    button.classList.remove('is-lit');
  }, 300);
};

// Sorteia um botão e coloca no fim da sequência
const addRandomStep = () => {
  const index = Math.floor(Math.random() * colorButtons.length);
  sequence.push(colorButtons[index]);
};

// Troca o título e o texto da caixa de mensagens
const showStatus = (title, text) => {
  statusTitle.textContent = title;
  statusText.textContent = text;
};

// Liga ou desliga todos os botões coloridos de uma vez
const setColorButtonsDisabled = (disabled) => {
  colorButtons.forEach((button) => {
    button.disabled = disabled;
  });
};

// Tempo entre um botão e o próximo da sequência, em milissegundos
const stepDelay = 700;

// Toca a sequência inteira, um botão de cada vez
const showSequence = () => {
  showStatus('Observe', 'Observe a sequência…');
  setColorButtonsDisabled(true);

  sequence.forEach((button, index) => {
    setTimeout(() => {
      playButton(button);
    }, (index + 1) * stepDelay);
  });

  // Depois do último botão, a vez passa para o jogador
  setTimeout(() => {
    showStatus('Sua vez', `Repita: passo 1 de ${sequence.length}`);
    setColorButtonsDisabled(false);
  }, (sequence.length + 1) * stepDelay);
};

// Começa uma rodada: o jogador volta ao primeiro passo e a sequência cresce
const nextRound = () => {
  step = 0;
  addRandomStep();
  showSequence();
};

// Errou: a partida acaba e Começar vira "Jogar de novo"
const endGame = () => {
  showStatus('Fim de jogo', `Errou! Rodadas completas: ${sequence.length - 1}.`);
  statusBox.classList.add('is-over');
  setColorButtonsDisabled(true);
  startButton.textContent = 'Jogar de novo';
  startButton.disabled = false;
};

// Confere se o botão clicado é o esperado neste passo
const checkAnswer = (button) => {
  if (button !== sequence[step]) {
    endGame();
    return;
  }

  step = step + 1;

  if (step === sequence.length) {
    showStatus('Acertou', 'Muito bem! Lá vem a próxima rodada.');
    setColorButtonsDisabled(true);
    setTimeout(nextRound, 900);
    return;
  }

  showStatus('Sua vez', `Repita: passo ${step + 1} de ${sequence.length}`);
};

colorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    playButton(button);
    checkAnswer(button);
  });
});

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  statusBox.classList.remove('is-over');
  sequence = [];
  nextRound();
});

// Antes de Começar, os botões coloridos ficam travados
setColorButtonsDisabled(true);
