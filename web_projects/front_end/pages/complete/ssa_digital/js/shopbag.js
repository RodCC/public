// Defina os contadores globais
var itemCounterFav = 0;
var itemCounterBag = 0;

// Função para ajustar a quantidade
function adjustQuantityFav(clickedSpan, increment) {
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

  var PriceValue = quantityElement.dataset.price;
  var PriceAmount = newQuantity * PriceValue;
  var PriceResult = PriceAmount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  // Encontrar o elemento de quantidade correspondente
  var priceElement = document.getElementById("fav-price" + index);

  // Atualizar o valor da quantidade
  priceElement.innerText = PriceResult;
}

// Função para excluir um item da sidebar
function excluirItemSidebarFav(clickedSpan) {
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

  // Adicionar um ouvinte de eventos para detectar cliques fora da área da lista de cores
  document.addEventListener("click", function (event) {
    // Verificar se o clique não foi dentro da área da lista de cores
    if (
      !colorList.contains(event.target) &&
      !dropdownBtn.contains(event.target)
    ) {
      // Remover a classe "visible" da lista de cores
      colorList.classList.remove("visible");

      // Remover a classe "selected" do botão
      dropdownBtn.classList.remove("selected");
    }
  });
}

// Função para selecionar a cor no dropdown
function selectColorFav(element) {
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
function closeDropdownOutsideClickFav(event, index) {
  var dropdownBtn = document.getElementById("dropdown-favbtn" + index);
  var colorList = document.getElementById("color-favlist" + index);

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
      closeDropdownOutsideClickFav(event, index);
    });
  }
}

// Função para adicionar um item no sidebar de favoritos
function adicionarItemFav() {
  // Ações adicionais com base no indexador
  var saleItem = event.target.closest(".sale-item");
  var saleItemBg = event.target.closest(".sale-item-bg");

  // Use window.getComputedStyle to get computed styles
  var computedStyles = window.getComputedStyle(saleItemBg);

  var backgroundImage = computedStyles.getPropertyValue("background-image");
  var backgroundColor = computedStyles.getPropertyValue("background-color");
  var itemTitle = saleItem.querySelector(".sale-item-text h5").innerText;
  var itemPrice = saleItem.querySelector(
    ".sale-item-text .sale-price-box .sale-item-price"
  ).innerText;
  var itemType = saleItem.querySelector(".sale-item-text h6").innerText;

  // Obter a referência da div pai pela classe "sidebar-item-box"
  var sidebarItemBox = document.querySelector(
    ".favorite-data .sidebar-item-box"
  );

  // Criar um novo elemento div com a classe "sidebar-item"
  var newItem = document.createElement("div");
  var index = ++itemCounterFav; // Incrementa o contador global
  newItem.className = "sidebar-item";
  newItem.id = "sidebar-fav" + index;

  // Criar e adicionar outros elementos dentro da div "sidebar-item"
  newItem.innerHTML = `
      <div class="item-img" id="fav-img${index}"></div>
      <span class="item-amount">
          <div class="quantity-selector">
              <span class="material-symbols-outlined decrement" id="decrement-fav${index}" onclick="adjustQuantityFav(this, -1)">
                  chevron_left
              </span>
              <div class="quantity" id="quantity-fav${index}" data-price="1">1</div>
              <span class="material-symbols-outlined increment" id="increment-fav${index}" onclick="adjustQuantityFav(this, 1)">
                  chevron_right
              </span>
          </div>
      </span>
      <span class="item-title" id="fav-title${index}">Item ${index}</span>
      <span class="material-symbols-outlined item-esc" title="Excluir" id="fav-esc${index}" onclick="excluirItemSidebarFav(this)">
          close
      </span>
      <span class="item-type" id="fav-type${index}">Item ${index}</span>
      <span class="item-price" id="fav-price${index}">Item ${index}</span>
      <span class="item-color">
          <div class="color-dropdown">
              <button class="dropdown-btn" id="dropdown-favbtn${index}" onclick="toggleDropdown(this)">
                  Validade
              </button>
              <ul class="color-list hidden" id="color-favlist${index}">
              </ul>
          </div>
      </span>
  `;

  // Adicionar o novo item à div pai
  sidebarItemBox.appendChild(newItem);

  // Atualizar IDs com base no indexador
  var itemImg = newItem.querySelector(".item-img");
  var itemTitleElement = newItem.querySelector(".item-title");
  var itemPriceElement = newItem.querySelector(".item-price");
  var itemTypeElement = newItem.querySelector(".item-type");

  itemImg.style.backgroundImage = backgroundImage;
  itemImg.style.backgroundColor = backgroundColor;
  itemTitleElement.innerText = itemTitle;
  itemPriceElement.innerText = itemPrice;
  itemTypeElement.innerText = itemType;

  var valitityText = saleItemBg.dataset.valitity;
  var valitityArray = valitityText.split(";");

  // Criar os elementos li e adicioná-los ao ul
  var ulElement = document.getElementById("color-favlist" + index);

  valitityArray.forEach(function (color) {
    // Criar o elemento li
    var liElement = document.createElement("li");
    liElement.className = "color-fav" + index;
    liElement.textContent = color;
    liElement.onclick = function () {
      selectColorFav(this);
    };

    // Adicionar o elemento li ao ul
    ulElement.appendChild(liElement);
  });

  // Definição do preço do produto
  var PriceText = saleItemBg.dataset.price;
  var PriceValue = parseFloat(PriceText.replace(",", "."));
  var quantityElement = document.getElementById("quantity-fav" + index);
  quantityElement.dataset.price = PriceValue;
}

// -----------------------------------------

// Obtém o número de elementos com a classe "sidebar-item" dentro da classe "favorite-data"
var favoriteCount = document.querySelectorAll(
  ".favorite-data .sidebar-item"
).length;

// Obtém o número de elementos com a classe "sidebar-item" dentro da classe "bag_data"
var bagCount = document.querySelectorAll(".bag-data .sidebar-item").length;

// Atualiza o conteúdo do elemento com o ID "favorite_tip" com o número obtido
document.getElementById("favorite_tip").textContent = favoriteCount;

// Atualiza o conteúdo do elemento com o ID "bag_tip" com o número obtido
document.getElementById("bag_tip").textContent = bagCount;

// Oculta os indicadores dos itens favoritos e sacola de compras se o número for 0,
// mas exibe se o número for diferente de 0
["favorite_tip", "bag_tip"].forEach(function (tipId) {
  var tipElement = document.getElementById(tipId);
  var valor = parseFloat(tipElement.textContent);

  if (valor === 0) {
    tipElement.style.display = "none";
  } else {
    tipElement.style.display = "block";
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

  // Oculta os indicadores dos itens favoritos e sacola de compras se o número for 0,
  // mas exibe se o número for diferente de 0
  ["favorite_tip", "bag_tip"].forEach(function (tipId) {
    var tipElement = document.getElementById(tipId);
    var valor = parseFloat(tipElement.textContent);

    if (valor === 0) {
      tipElement.style.display = "none";
    } else {
      tipElement.style.display = "block";
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

///////////////////////////////////////////////// BAG AREA

// Função para ajustar a quantidade
function adjustQuantityBag(clickedSpan, increment) {
  // Extrair o índice do ID do span clicado
  var index = parseInt(clickedSpan.id.match(/\d+/)[0]);

  // Encontrar o elemento de quantidade correspondente
  var quantityElement = document.getElementById("quantity-bag" + index);
  var quantityValue = parseInt(quantityElement.innerText);

  // Ajustar a quantidade com o incremento (pode ser negativo)
  var newQuantity = quantityValue + increment;

  // Limitar o valor mínimo a 1
  newQuantity = Math.max(newQuantity, 1);

  // Atualizar o valor da quantidade
  quantityElement.innerText = newQuantity;

  var PriceValue = quantityElement.dataset.price;
  var PriceAmount = newQuantity * PriceValue;
  var PriceResult = PriceAmount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  // Encontrar o elemento de quantidade correspondente
  var priceElement = document.getElementById("bag-price" + index);

  // Atualizar o valor da quantidade
  priceElement.innerText = PriceResult;

  // 1. Identificar a div pai de classe "bag-data"
  var bagDataDiv = document.querySelector(".bag-data");

  // 2. Somar os valores contidos em todos os spans de classe "item-price"
  var itemPriceSpans = bagDataDiv.querySelectorAll(".item-price");
  var totalPrice = 0;

  itemPriceSpans.forEach(function (span) {
    // Extrair o valor numérico do texto (removendo "R$" e convertendo para float)
    var priceText = span.innerText
      .replace("R$", "")
      .replace(".", "")
      .replace(",", ".");
    var price = parseFloat(priceText);

    // Verificar se a conversão foi bem-sucedida antes de somar ao total
    if (!isNaN(price)) {
      totalPrice += price;
    }
  });

  // 3. Atualizar o valor contido no ID "final_price" com o resultado da somatória
  var finalPriceSpan = document.getElementById("final_price");
  finalPriceSpan.innerText = totalPrice.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// Função para excluir um item da sidebar
function excluirItemSidebarBag(clickedSpan) {
  // Extrair o índice do ID do span clicado
  var index = parseInt(clickedSpan.id.match(/\d+/)[0]);

  // Encontrar e excluir o elemento da sidebar pelo ID
  var sidebarItem = document.getElementById("sidebar-bag" + index);
  if (sidebarItem) {
    sidebarItem.parentNode.removeChild(sidebarItem);
  }

  // 1. Identificar a div pai de classe "bag-data"
  var bagDataDiv = document.querySelector(".bag-data");

  // 2. Somar os valores contidos em todos os spans de classe "item-price"
  var itemPriceSpans = bagDataDiv.querySelectorAll(".item-price");
  var totalPrice = 0;

  itemPriceSpans.forEach(function (span) {
    // Extrair o valor numérico do texto (removendo "R$" e convertendo para float)
    var priceText = span.innerText
      .replace("R$", "")
      .replace(".", "")
      .replace(",", ".");
    var price = parseFloat(priceText);

    // Verificar se a conversão foi bem-sucedida antes de somar ao total
    if (!isNaN(price)) {
      totalPrice += price;
    }
  });

  // 3. Atualizar o valor contido no ID "final_price" com o resultado da somatória
  var finalPriceSpan = document.getElementById("final_price");
  finalPriceSpan.innerText = totalPrice.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// Função para selecionar uma cor no dropdown
function selectColorBag(element) {
  // 1. Identificar o indexador pela classe do item clicado
  const index = element.className.replace("color-bag", "");

  // 2. Trocar o texto do button para o mesmo texto do li clicado
  const buttonText = element.textContent;
  const dropdownButton = document.getElementById(`dropdown-bagbtn${index}`);
  dropdownButton.textContent = buttonText;

  // 3. Remover a classe "visible" do ul se qualquer li for clicado
  const colorList = document.getElementById(`color-baglist${index}`);
  colorList.classList.remove("visible");

  // 4. Remover a classe "visible" do ul se qualquer li for clicado
  dropdownButton.classList.remove("selected");
}

// Função para adicionar um item no sidebar da sacola
function adicionarItemBag() {
  // Obter a referência da div pai pela classe "sidebar-item-box"
  var sidebarItemBox = document.querySelector(".bag-data .sidebar-item-box");

  // Criar um novo elemento div com a classe "sidebar-item"
  var newItem = document.createElement("div");
  var index = ++itemCounterBag; // Incrementa o contador global
  newItem.className = "sidebar-item";
  newItem.id = "sidebar-bag" + index;

  // Criar e adicionar outros elementos dentro da div "sidebar-item"
  newItem.innerHTML = `
      <div class="item-img" id="bag-img${index}"></div>
      <span class="item-amount">
          <div class="quantity-selector">
              <span class="material-symbols-outlined decrement" id="decrement-bag${index}" onclick="adjustQuantityBag(this, -1)">
                  chevron_left
              </span>
              <div class="quantity" id="quantity-bag${index}" data-price="1">1</div>
              <span class="material-symbols-outlined increment" id="increment-bag${index}" onclick="adjustQuantityBag(this, 1)">
                  chevron_right
              </span>
          </div>
      </span>
      <span class="item-title" id="bag-title${index}">Item ${index}</span>
      <span class="material-symbols-outlined item-esc" title="Excluir" id="bag-esc${index}" onclick="excluirItemSidebarBag(this)">
          close
      </span>
      <span class="item-type" id="bag-type${index}">Item ${index}</span>
      <span class="item-price" id="bag-price${index}">Item ${index}</span>
      <span class="item-color">
          <div class="color-dropdown">
              <button class="dropdown-btn" id="dropdown-bagbtn${index}" onclick="toggleDropdown(this)">
                  Validade
              </button>
              <ul class="color-list hidden" id="color-baglist${index}">
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
  var itemTitle = saleItem.querySelector(".sale-item-text h5").innerText;
  var itemPrice = saleItem.querySelector(
    ".sale-item-text .sale-price-box .sale-item-price"
  ).innerText;
  var itemType = saleItem.querySelector(".sale-item-text h6").innerText;

  // Atualizar IDs com base no indexador
  var itemImg = newItem.querySelector(".item-img");
  var itemTitleElement = newItem.querySelector(".item-title");
  var itemPriceElement = newItem.querySelector(".item-price");
  var itemTypeElement = newItem.querySelector(".item-type");

  itemImg.style.backgroundImage = backgroundImage;
  itemImg.style.backgroundColor = backgroundColor;
  itemTitleElement.innerText = itemTitle;
  itemPriceElement.innerText = itemPrice;
  itemTypeElement.innerText = itemType;

  var valitityText = saleItemBg.dataset.valitity;
  var valitityArray = valitityText.split(";");

  // Passo 2 e 3: Criar os elementos li e adicioná-los ao ul
  var ulElement = document.getElementById("color-baglist" + index);

  valitityArray.forEach(function (color) {
    // Criar o elemento li
    var liElement = document.createElement("li");
    liElement.className = "color-bag" + index;
    liElement.textContent = color;
    liElement.onclick = function () {
      selectColorBag(this);
    };

    // Adicionar o elemento li ao ul
    ulElement.appendChild(liElement);
  });

  // Definição do preço do produto
  var PriceText = saleItemBg.dataset.price;
  var PriceValue = parseFloat(PriceText.replace("R$ ", "").replace(",", "."));
  var quantityElement = document.getElementById("quantity-bag" + index);
  quantityElement.dataset.price = PriceValue;

  // 1. Identificar a div pai de classe "bag-data"
  var bagDataDiv = document.querySelector(".bag-data");

  // 2. Somar os valores contidos em todos os spans de classe "item-price"
  var itemPriceSpans = bagDataDiv.querySelectorAll(".item-price");
  var totalPrice = 0;

  itemPriceSpans.forEach(function (span) {
    // Extrair o valor numérico do texto (removendo "R$" e convertendo para float)
    var priceText = span.innerText
      .replace("R$", "")
      .replace(".", "")
      .replace(",", ".");
    var price = parseFloat(priceText);

    // Verificar se a conversão foi bem-sucedida antes de somar ao total
    if (!isNaN(price)) {
      totalPrice += price;
    }
  });

  // 3. Atualizar o valor contido no ID "final_price" com o resultado da somatória
  var finalPriceSpan = document.getElementById("final_price");
  finalPriceSpan.innerText = totalPrice.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

///////////////////////////////////////////////// PROMO SECTION AREA

// Função para adicionar um item no sidebar de favoritos
function adicionarPromoFav() {
  // Ações adicionais com base no indexador
  var promoItem = document.getElementById("promo-text-wrap");
  var promoItemBg = document.getElementById("thumbpromo");
  var promoItemPrice = document.getElementById("promo-price");

  // Use window.getComputedStyle to get computed styles
  var computedStyles = window.getComputedStyle(promoItemBg);

  var backgroundImage = computedStyles.getPropertyValue("background-image");
  var promoTitle = promoItem.querySelector("h2").innerText;
  var promoPrice = promoItemPrice.innerText;

  // Obter a referência da div pai pela classe "sidebar-item-box"
  var sidebarItemBox = document.querySelector(
    ".favorite-data .sidebar-item-box"
  );

  // Criar um novo elemento div com a classe "sidebar-item"
  var newItem = document.createElement("div");
  var index = ++itemCounterFav; // Incrementa o contador global
  newItem.className = "sidebar-item";
  newItem.id = "sidebar-fav" + index;

  // Criar e adicionar outros elementos dentro da div "sidebar-item"
  newItem.innerHTML = `
      <div class="item-img" id="fav-img${index}"></div>
      <span class="item-amount">
          <div class="quantity-selector">
              <span class="material-symbols-outlined decrement" id="decrement-fav${index}" onclick="adjustQuantityFav(this, -1)">
                  chevron_left
              </span>
              <div class="quantity" id="quantity-fav${index}" data-price="1">1</div>
              <span class="material-symbols-outlined increment" id="increment-fav${index}" onclick="adjustQuantityFav(this, 1)">
                  chevron_right
              </span>
          </div>
      </span>
      <span class="item-title" id="fav-title${index}">Item ${index}</span>
      <span class="material-symbols-outlined item-esc" title="Excluir" id="fav-esc${index}" onclick="excluirItemSidebarFav(this)">
          close
      </span>
      <span class="item-type" id="fav-type${index}">Item ${index}</span>
      <span class="item-price" id="fav-price${index}">Item ${index}</span>
      <span class="item-color">
          <div class="color-dropdown">
              <button class="dropdown-btn" id="dropdown-favbtn${index}" onclick="toggleDropdown(this)">
                  Validade
              </button>
              <ul class="color-list hidden" id="color-favlist${index}">
              </ul>
          </div>
      </span>
  `;

  // Adicionar o novo item à div pai
  sidebarItemBox.appendChild(newItem);

  // Atualizar IDs com base no indexador
  var itemImg = newItem.querySelector(".item-img");
  var itemTitleElement = newItem.querySelector(".item-title");
  var itemPriceElement = newItem.querySelector(".item-price");

  itemImg.style.backgroundImage = backgroundImage;
  itemTitleElement.innerText = promoTitle;
  itemPriceElement.innerText = promoPrice;

  var colorsText = promoItem.dataset.colors;
  var colorsArray = colorsText.split(";");

  // Criar os elementos li e adicioná-los ao ul
  var ulElement = document.getElementById("color-favlist" + index);

  colorsArray.forEach(function (color) {
    // Criar o elemento li
    var liElement = document.createElement("li");
    liElement.className = "color-fav" + index;
    liElement.textContent = color;
    liElement.onclick = function () {
      selectColorFav(this);
    };

    // Adicionar o elemento li ao ul
    ulElement.appendChild(liElement);
  });

  // Definição do preço do produto
  var PriceText = promoItem.dataset.price;
  var PriceValue = parseFloat(PriceText.replace("R$ ", "").replace(",", "."));
  var quantityElement = document.getElementById("quantity-fav" + index);
  quantityElement.dataset.price = PriceValue;
}

// PROMO SECTION BAG

// Função para adicionar um item no sidebar de favoritos
function adicionarPromoBag() {
  // Ações adicionais com base no indexador
  var promoItem = document.getElementById("promo-text-wrap");
  var promoItemBg = document.getElementById("thumbpromo");
  var promoItemPrice = document.getElementById("promo-price");

  // Use window.getComputedStyle to get computed styles
  var computedStyles = window.getComputedStyle(promoItemBg);

  var backgroundImage = computedStyles.getPropertyValue("background-image");
  var promoTitle = promoItem.querySelector("h2").innerText;
  var promoPrice = promoItemPrice.innerText;

  // Obter a referência da div pai pela classe "sidebar-item-box"
  var sidebarItemBox = document.querySelector(".bag-data .sidebar-item-box");

  // Criar um novo elemento div com a classe "sidebar-item"
  var newItem = document.createElement("div");
  var index = ++itemCounterBag; // Incrementa o contador global
  newItem.className = "sidebar-item";
  newItem.id = "sidebar-bag" + index;

  // Criar e adicionar outros elementos dentro da div "sidebar-item"
  newItem.innerHTML = `
  <div class="item-img" id="bag-img${index}"></div>
  <span class="item-amount">
      <div class="quantity-selector">
          <span class="material-symbols-outlined decrement" id="decrement-bag${index}" onclick="adjustQuantityBag(this, -1)">
              chevron_left
          </span>
          <div class="quantity" id="quantity-bag${index}" data-price="1">1</div>
          <span class="material-symbols-outlined increment" id="increment-bag${index}" onclick="adjustQuantityBag(this, 1)">
              chevron_right
          </span>
      </div>
  </span>
  <span class="item-title" id="bag-title${index}">Item ${index}</span>
  <span class="material-symbols-outlined item-esc" title="Excluir" id="bag-esc${index}" onclick="excluirItemSidebarBag(this)">
      close
  </span>
  <span class="item-type" id="bag-type${index}">Item ${index}</span>
  <span class="item-price" id="bag-price${index}">Item ${index}</span>
  <span class="item-color">
      <div class="color-dropdown">
          <button class="dropdown-btn" id="dropdown-bagbtn${index}" onclick="toggleDropdown(this)">
              Validade
          </button>
          <ul class="color-list hidden" id="color-baglist${index}">
          </ul>
      </div>
  </span>
  `;

  // Adicionar o novo item à div pai
  sidebarItemBox.appendChild(newItem);

  // Atualizar IDs com base no indexador
  var itemImg = newItem.querySelector(".item-img");
  var itemTitleElement = newItem.querySelector(".item-title");
  var itemPriceElement = newItem.querySelector(".item-price");

  itemImg.style.backgroundImage = backgroundImage;
  itemTitleElement.innerText = promoTitle;
  itemPriceElement.innerText = promoPrice;

  var colorsText = promoItem.dataset.colors;
  var colorsArray = colorsText.split(";");

  // Criar os elementos li e adicioná-los ao ul
  var ulElement = document.getElementById("color-baglist" + index);

  colorsArray.forEach(function (color) {
    // Criar o elemento li
    var liElement = document.createElement("li");
    liElement.className = "color-bag" + index;
    liElement.textContent = color;
    liElement.onclick = function () {
      selectColorBag(this);
    };

    // Adicionar o elemento li ao ul
    ulElement.appendChild(liElement);
  });

  // Definição do preço do produto
  var PriceText = promoItem.dataset.price;
  var PriceValue = parseFloat(PriceText.replace("R$ ", "").replace(",", "."));
  var quantityElement = document.getElementById("quantity-bag" + index);
  quantityElement.dataset.price = PriceValue;

  // 1. Identificar a div pai de classe "bag-data"
  var bagDataDiv = document.querySelector(".bag-data");

  // 2. Somar os valores contidos em todos os spans de classe "item-price"
  var itemPriceSpans = bagDataDiv.querySelectorAll(".item-price");
  var totalPrice = 0;

  itemPriceSpans.forEach(function (span) {
    // Extrair o valor numérico do texto (removendo "R$" e convertendo para float)
    var priceText = span.innerText
      .replace("R$", "")
      .replace(".", "")
      .replace(",", ".");
    var price = parseFloat(priceText);

    // Verificar se a conversão foi bem-sucedida antes de somar ao total
    if (!isNaN(price)) {
      totalPrice += price;
    }
  });

  // 3. Atualizar o valor contido no ID "final_price" com o resultado da somatória
  var finalPriceSpan = document.getElementById("final_price");
  finalPriceSpan.innerText = totalPrice.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
