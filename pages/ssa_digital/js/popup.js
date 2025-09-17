// Variável para armazenar a posição do scroll
var scrollPosition;

function manterHoverImg(element) {
  // Adicione a classe que mantém o efeito hover à div pai específica
  element.classList.add("hover-ativo");
}

function restaurarHoverImg(element) {
  // Remova a classe que mantém o efeito hover da div pai específica
  element.classList.remove("hover-ativo");
}

function manterHoverIco(element) {
  // Adicione a classe que mantém o efeito hover à div pai específica
  element.classList.add("hover-i-ativo");
}

function restaurarHoverIco(element) {
  // Remova a classe que mantém o efeito hover da div pai específica
  element.classList.remove("hover-i-ativo");
}

// Função para abrir o pop-up
function abrirPopup(id, numeroDiv) {
  // Encontrar o popup pelo id
  var popup = document.getElementById(id);

  // Salvar a posição atual do scroll
  scrollPosition = window.scrollY || document.documentElement.scrollTop;

  // Adicionar uma classe ao body para desabilitar o scroll
  document.body.classList.add("no-scroll");

  // Adicionar estilo para manter a posição do scroll visível
  document.body.style.position = "relative";
  document.body.style.top = `-${scrollPosition}px`;

  // Mostrar o popup
  popup.style.display = "block";

  // Força o estado :hover adicionando a classe temporariamente
  document
    .querySelector(".sale-item-" + numeroDiv)
    .classList.add("hover-ativo");

  // Força o estado :hover adicionando a classe temporariamente
  document
    .querySelector(".info-btn-" + numeroDiv)
    .classList.add("hover-i-ativo");
}

// Função para fechar o pop-up
function fecharPopup(id, numeroDiv) {
  // Encontrar o popup pelo id
  var popup = document.getElementById(id);

  // Esconder o popup
  popup.style.display = "none";

  // Remover a classe do body para habilitar o scroll
  document.body.classList.remove("no-scroll");

  // Remover o estilo que mantém a posição do scroll visível
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";

  // Restaurar a posição original do scroll
  window.scrollTo(0, scrollPosition);

  // Restaure o efeito hover ao fechar o popup
  restaurarHoverImg(document.querySelector(".sale-item-" + numeroDiv));

  // Restaure o efeito hover ao fechar o popup
  restaurarHoverIco(document.querySelector(".info-btn-" + numeroDiv));
}
