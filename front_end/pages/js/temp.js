// Função para ajustar a quantidade
function adjustQuantity(clickedSpan, increment) {
  // Extrair o índice do ID do span clicado
  var index = parseInt(clickedSpan.id.match(/\d+/)[0]);

  // Encontrar o elemento de quantidade correspondente
  var quantityElement = document.getElementById("quantity-fav" + index);
  var quantityValue = parseInt(quantityElement.innerText);

  // Ajustar a quantidade com o incremento (pode ser negativo)
  var newQuantity = quantityValue + increment;

  // Limitar o valor mínimo a 1
  newQuantity = Math.max(newQuantity, 1);

  // Atualizar o valor da quantidade
  quantityElement.innerText = newQuantity;
}

// Função para excluir um item da sidebar
function excluirItemSidebar(clickedSpan) {
  // Extrair o índice do ID do span clicado
  var index = parseInt(clickedSpan.id.match(/\d+/)[0]);

  // Encontrar e excluir o elemento da sidebar pelo ID
  var sidebarItem = document.getElementById("sidebar-fav" + index);
  if (sidebarItem) {
    sidebarItem.parentNode.removeChild(sidebarItem);
  }
}

// Função para alternar a visibilidade do dropdown
function toggleDropdown(clickedBtn) {
  // Encontrar o botão e a lista de cores correspondentes
  var dropdownBtn = clickedBtn;
  var colorList = dropdownBtn.nextElementSibling;

  // Extrair o índice do ID do botão clicado
  var index = parseInt(dropdownBtn.id.match(/\d+/)[0]);

  // Alternar a classe "selected" no botão
  dropdownBtn.classList.toggle("selected");

  // Alternar a classe "visible" na lista de cores
  colorList.classList.toggle("visible");

  // Adicionar um ouvinte de clique no documento para fechar o dropdown se clicar fora da área
  if (colorList.classList.contains("visible")) {
    document.addEventListener("click", function (event) {
      closeDropdownOutsideClick(event, index);
    });
  } else {
    document.removeEventListener("click", closeDropdownOutsideClick);
  }
}

function selectColor(element) {
  // 1. Identificar o indexador pela classe do item clicado
  const index = element.className.replace("color-fav", "");

  // 2. Trocar o texto do button para o mesmo texto do li clicado
  const buttonText = element.textContent;
  const dropdownButton = document.getElementById(`dropdown-favbtn${index}`);
  dropdownButton.textContent = buttonText;

  // 3. Remover a classe "visible" do ul se qualquer li for clicado
  const colorList = document.getElementById(`color-favlist${index}`);
  colorList.classList.remove("visible");

  // 4. Remover a classe "visible" do ul se qualquer li for clicado
  dropdownButton.classList.remove("selected");
}

// Função para fechar o dropdown se clicar fora da área
function closeDropdownOutsideClick(event, index) {
  var dropdownBtn = document.getElementById("dropdown-favbtn" + index);
  var colorList = dropdownBtn.nextElementSibling;

  // Verificar se o clique foi fora do botão e da lista de cores
  if (
    event.target !== dropdownBtn &&
    event.target !== colorList &&
    !colorList.contains(event.target)
  ) {
    // Remover a classe "visible" da lista de cores e "selected" do botão
    colorList.classList.remove("visible");
    dropdownBtn.classList.remove("selected");

    // Remover o ouvinte de clique no documento
    document.removeEventListener("click", function (event) {
      closeDropdownOutsideClick(event, index);
    });
  }
}

function adicionarItemFav() {
  // Obter a referência da div pai pela classe "sidebar-item-box"
  var sidebarItemBox = document.querySelector(
    ".favorite-data .sidebar-item-box"
  );

  // Criar um novo elemento div com a classe "sidebar-item"
  var newItem = document.createElement("div");
  var index = sidebarItemBox.childElementCount + 1; // Obtém o próximo indexador
  newItem.className = "sidebar-item";
  newItem.id = "sidebar-fav" + index;

  // Criar e adicionar outros elementos dentro da div "sidebar-item"
  newItem.innerHTML = `
      <div class="item-img" id="fav-img${
        sidebarItemBox.childElementCount + 1
      }"></div>
      <span class="item-amount">
          <div class="quantity-selector">
              <span class="material-symbols-outlined decrement" id="decrement-fav${
                sidebarItemBox.childElementCount + 1
              }" onclick="adjustQuantity(this, -1)">
                  chevron_left
              </span>
              <div class="quantity" id="quantity-fav${
                sidebarItemBox.childElementCount + 1
              }">1</div>
              <span class="material-symbols-outlined increment" id="increment-fav${
                sidebarItemBox.childElementCount + 1
              }" onclick="adjustQuantity(this, 1)">
                  chevron_right
              </span>
          </div>
      </span>
      <span class="item-title" id="fav-title${
        sidebarItemBox.childElementCount + 1
      }">Item ${sidebarItemBox.childElementCount + 1}</span>
      <span class="material-symbols-outlined item-esc" title="Excluir" id="fav-esc${
        sidebarItemBox.childElementCount + 1
      }" onclick="excluirItemSidebar(this)">
          close
      </span>
      <span class="item-color">
          <div class="color-dropdown">
              <button class="dropdown-btn" id="dropdown-favbtn${
                sidebarItemBox.childElementCount + 1
              }" onclick="toggleDropdown(this)">
                  Escolha uma cor
              </button>
              <ul class="color-list hidden" id="color-favlist${
                sidebarItemBox.childElementCount + 1
              }">
                  <li class="color-fav${
                    sidebarItemBox.childElementCount + 1
                  }" onclick="selectColor(this)">Verde</li>
                  <li class="color-fav${
                    sidebarItemBox.childElementCount + 1
                  }" onclick="selectColor(this)">Roxo</li>
                  <li class="color-fav${
                    sidebarItemBox.childElementCount + 1
                  }" onclick="selectColor(this)">Magenta</li>
              </ul>
          </div>
      </span>
  `;

  // Adicionar o novo item à div pai
  sidebarItemBox.appendChild(newItem);

  // Ações adicionais com base no indexador
  var saleItem = event.target.closest(".sale-item");
  var saleItemBg = event.target.closest(".sale-item-bg");

  // Use window.getComputedStyle to get computed styles
  var computedStyles = window.getComputedStyle(saleItemBg);

  var backgroundImage = computedStyles.getPropertyValue("background-image");
  var backgroundColor = computedStyles.getPropertyValue("background-color");
  var itemTitle = saleItem.querySelector(".sale-item-text h6").innerText;

  // Atualizar IDs com base no indexador
  var itemImg = newItem.querySelector(".item-img");
  var itemTitleElement = newItem.querySelector(".item-title");

  itemImg.style.backgroundImage = backgroundImage;
  itemImg.style.backgroundColor = backgroundColor;
  itemTitleElement.innerText = itemTitle;
}

// -----------------------------------------

// Obtém o número de elementos com a classe "sidebar-item" dentro da classe "favorite_data"
var favoriteCount = document.querySelectorAll(
  ".favorite-data .sidebar-item"
).length;

// Obtém o número de elementos com a classe "sidebar-item" dentro da classe "bag_data"
var bagCount = document.querySelectorAll(".bag-data .sidebar-item").length;

// Atualiza o conteúdo do elemento com o ID "favorite_tip" com o número obtido
document.getElementById("favorite_tip").textContent = favoriteCount;

// Atualiza o conteúdo do elemento com o ID "bag_tip" com o número obtido
document.getElementById("bag_tip").textContent = bagCount;

// Oculta os indicadores dos itens favoritos e sacola de compras se o número for 0
["favorite_tip", "bag_tip"].forEach(function (tipId) {
  var tipElement = document.getElementById(tipId);
  var valor = parseFloat(tipElement.textContent);

  if (valor === 0) {
    tipElement.style.display = "none";
  }
});

// -----------------------------------------

// Mantém o estado do pop-up
var isSidebarOpen = false;

document
  .getElementById("favorite_link")
  .addEventListener("click", openFavoriteSidebar);
document.getElementById("bag_link").addEventListener("click", openBagSidebar);
document.getElementById("close-btn").addEventListener("click", closeSidebar);
document.getElementById("overlay").addEventListener("click", closeSidebar);

function openFavoriteSidebar() {
  document.getElementById("sidebar-favorite").checked = true;
  document.getElementById("sidebar-bag").checked = false;

  openSidebar();
}

function openBagSidebar() {
  document.getElementById("sidebar-bag").checked = true;
  document.getElementById("sidebar-favorite").checked = false;

  openSidebar();
}

function openSidebar() {
  // Mantém a posição do scroll antes de abrir o pop-up
  document.body.style.overflow = "hidden";
  document.body.style.position = "relative";
  document.body.style.width = "100%";
  document.body.style.top = `-${window.scrollY}px`;

  document.getElementById("sidebar").style.right = "0";
  document.getElementById("overlay").style.display = "block";

  isSidebarOpen = true;
}

function closeSidebar() {
  document.getElementById("sidebar").style.right = "-300px";
  document.getElementById("overlay").style.display = "none";

  // Obtém o número de elementos com a classe "sidebar-item" dentro da classe "favorite_data"
  var favoriteCount = document.querySelectorAll(
    ".favorite-data .sidebar-item"
  ).length;

  // Obtém o número de elementos com a classe "sidebar-item" dentro da classe "bag_data"
  var bagCount = document.querySelectorAll(".bag-data .sidebar-item").length;

  // Atualiza o conteúdo do elemento com o ID "favorite_tip" com o número obtido
  document.getElementById("favorite_tip").textContent = favoriteCount;

  // Atualiza o conteúdo do elemento com o ID "bag_tip" com o número obtido
  document.getElementById("bag_tip").textContent = bagCount;

  // Oculta os indicadores dos itens favoritos e sacola de compras se o número for 0
  ["favorite_tip", "bag_tip"].forEach(function (tipId) {
    var tipElement = document.getElementById(tipId);
    var valor = parseFloat(tipElement.textContent);

    if (valor === 0) {
      tipElement.style.display = "none";
    }
  });

  // Restaura a posição original da página apenas se o pop-up estiver aberto
  if (isSidebarOpen) {
    document.body.style.overflow = "auto";
    document.body.style.position = "";
    document.body.style.width = "";
    const scrollY = parseInt(document.body.style.top || "0");
    document.body.style.top = "";
    window.scrollTo(0, -scrollY);

    isSidebarOpen = false;
  }
}

// -----------------------------------------

// Adiciona eventos de clique aos elementos com as classes específicas
document.addEventListener("DOMContentLoaded", function () {
  // Seleciona todos os elementos com a classe "fav_btn" e adiciona um evento de clique a cada um
  var favButtons = document.querySelectorAll(".fav_btn");
  favButtons.forEach(function (button) {
    button.addEventListener("click", openFavoriteSidebar);
  });

  // Seleciona todos os elementos com a classe "bag_btn" e adiciona um evento de clique a cada um
  var bagButtons = document.querySelectorAll(".bag_btn");
  bagButtons.forEach(function (button) {
    button.addEventListener("click", openBagSidebar);
  });
});
