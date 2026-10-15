const colorButtons = document.querySelectorAll('.color-button');

// Acende o botão e apaga depois de um instante
const playButton = (button) => {
  button.classList.add('is-lit');

  setTimeout(() => {
    button.classList.remove('is-lit');
  }, 300);
};

colorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    playButton(button);
  });
});
