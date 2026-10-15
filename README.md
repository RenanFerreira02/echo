# Echo

Jogo da memória de sequências no estilo Genius, feito com HTML, CSS e JavaScript puro.

**Deploy:** https://echo-renanferreira-dev.vercel.app

## Como rodar

Baixe ou clone o repositório e abra o `index.html` no navegador. Não precisa instalar nada.

## Etapas

Projeto de aula: cada etapa é um commit na `main`. Use `git log --oneline` para ver a lista e `git checkout <hash>` para abrir o projeto como ele estava naquela etapa (`git switch main` volta para a versão final).

| Etapa | Conceito |
|---|---|
| `00-ponto-de-partida` | Projeto vazio: README, .gitignore, LICENSE e index.html |
| `01-tabuleiro-em-html-e-css` | A página do design, sem JavaScript |
| `02-acendendo-um-botao` | Função com parâmetro que acende o botão clicado |
| `03-som-com-web-audio` | `AudioContext` e `OscillatorNode` geram o som de cada botão |
| `04-sorteando-a-sequencia` | Array, `Math.random()` e `push` |
| `05-mostrando-a-sequencia` | Timers escalonados com `forEach` e `setTimeout` |
| `06-mensagens-na-tela` | `textContent` e `aria-live` |
| `07-vez-do-jogador` | Estado do jogo: comparar o clique com a sequência |
| `08-travando-os-botoes` | `disabled` durante a demonstração |
| `09-fim-de-jogo` | Errou: fim de jogo e "Jogar de novo" |
| `10-rodada-e-recorde` | Placar com `sequence.length` e `Math.max` |
| `11-jogando-pelo-teclado` | `keydown` chamando `button.click()` |
| `12-niveis` | Fácil (4 botões) e Difícil (6 botões) |

## O que aprendi

_(a preencher)_

## Créditos

- Sons gerados no código com a Web Audio API, sem arquivos de áudio.
- Fontes [Archivo](https://fonts.google.com/specimen/Archivo) e [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono), do Google Fonts, sob a licença SIL Open Font License.
- Inspirado no jogo Genius (Simon), da década de 1970.
