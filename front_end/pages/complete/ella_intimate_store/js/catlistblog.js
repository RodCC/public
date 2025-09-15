document.addEventListener("DOMContentLoaded", function () {
  // Função para atualizar a contagem de posts
  function updatePostCount() {
    // Obtenha todos os elementos com a classe "blog_item"
    var blogItems = document.querySelectorAll(".blog_item");

    // Inicialize contadores para cada categoria
    var modaIntimaCount = 0;
    var sexShopCount = 0;
    var selfKnowledgeCount = 0;
    var varietyCount = 0;
    var allCount = 0;

    // Itere sobre cada elemento e conte as ocorrências de cada categoria
    blogItems.forEach(function (item) {
      // Encontre a classe "blog-item-cat" dentro de "blog_item"
      var categoryElement = item.querySelector(".blog-item-cat");

      if (categoryElement) {
        var category = categoryElement.textContent.trim(); // Obtém o conteúdo da categoria

        if (category === "Moda Íntima") {
          modaIntimaCount++;
        } else if (category === "Sex Shop") {
          sexShopCount++;
        } else if (category === "Autoconhecimento") {
          selfKnowledgeCount++;
        } else if (category === "Diversos") {
          varietyCount++;
        }

        // Sempre incrementa o contador geral
        allCount++;
      }
    });

    // Atualize as IDs com os contadores entre parênteses
    document.getElementById("cat-modaintima").textContent =
      "(" + modaIntimaCount + ")";
    document.getElementById("cat-sexshop").textContent =
      "(" + sexShopCount + ")";
    document.getElementById("cat-selfknowledge").textContent =
      "(" + selfKnowledgeCount + ")";
    document.getElementById("cat-all").textContent = "(" + allCount + ")";
    document.getElementById("cat-variety").textContent =
      "(" + varietyCount + ")";
  }

  // Use MutationObserver para observar mudanças no DOM
  var observer = new MutationObserver(updatePostCount);

  // Opções para observar mudanças nos atributos e na estrutura do DOM
  var observerOptions = {
    attributes: true,
    childList: true,
    subtree: true,
  };

  // Elemento raiz para observação (pode ser o body ou qualquer outro ancestral)
  var targetNode = document.body;

  // Inicie a observação do DOM
  observer.observe(targetNode, observerOptions);

  // Chame a função de atualização inicialmente
  updatePostCount();
});

// -----------------------------

document.addEventListener("DOMContentLoaded", function () {
  // Seleciona todos os itens da lista
  var listItems = document.querySelectorAll(".cat-list li");

  // Adiciona um evento de clique a cada item da lista
  listItems.forEach(function (item) {
    item.addEventListener("click", function () {
      // Adiciona a classe 'active' ao item clicado
      item.classList.add("active");

      // Remove a classe 'active' dos outros itens da lista
      listItems.forEach(function (li) {
        if (li !== item) {
          li.classList.remove("active");
        }
      });

      // Obtém o valor do primeiro 'p' dentro do item clicado
      var selectedCategory = item.querySelector("p").textContent;

      // Seleciona todas as postagens
      var blogItems = document.querySelectorAll(".blog_item");

      // Percorre as postagens e oculta aquelas que não correspondem à categoria clicada
      blogItems.forEach(function (blogItem) {
        var postCategory = blogItem.querySelector(".blog-item-cat").textContent;

        // Verifica se a categoria da postagem corresponde à categoria clicada
        if (postCategory === selectedCategory || selectedCategory === "Todos") {
          blogItem.style.display = "block"; // Exibe a postagem
        } else {
          blogItem.style.display = "none"; // Oculta a postagem
        }
      });

      // Altera a propriedade 'display' da classe 'blog-search-section' para 'none'
      var searchSection = document.querySelector(".blog-search-section");
      if (searchSection && searchSection.style.display === "block") {
        searchSection.style.display = "none";

        // Aplica "rotateY(180deg)" no ID "search-clear"
        var searchClear = document.getElementById("search-clear");
        if (searchClear) {
          searchClear.style.transform = "rotateY(180deg)";
        }

        // Aplica "rotateY(0deg)" no ID "search-magnifier"
        var searchMagnifier = document.getElementById("search-magnifier");
        if (searchMagnifier) {
          searchMagnifier.style.transform = "rotateY(0deg)";
        }

        // Limpa o valor do input 'blog-search-input'
        var searchInput = document.getElementById("blog-search-input");
        if (searchInput) {
          searchInput.value = "";
        }
      }
    });
  });
});
