const colorButtons = document.querySelectorAll('.color-button');

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

colorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    playButton(button);
  });
});
