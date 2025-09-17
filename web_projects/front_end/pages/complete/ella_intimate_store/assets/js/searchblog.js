document
  .getElementById("blog-search-btn")
  .addEventListener("click", function (event) {
    // Impede o envio padrão do formulário
    event.preventDefault();

    // Obtém o valor do campo de pesquisa
    var searchTerm = document.getElementById("blog-search-input").value;

    // Atualiza o valor da ID 'blog-search-word'
    document.getElementById("blog-search-word").textContent = searchTerm;

    // Verifica se o valor do campo de pesquisa não é nulo
    if (searchTerm.trim() !== "") {
      // Percorre todos os elementos com a classe "blog_item"
      var blogItems = document.getElementsByClassName("blog_item");

      var allPostsHidden = true; // Flag para verificar se todos os posts estão ocultos

      for (var i = 0; i < blogItems.length; i++) {
        var blogItem = blogItems[i];

        // Verifica se o texto do post contém a palavra da pesquisa
        var postText = blogItem.textContent || blogItem.innerText;
        if (postText.toLowerCase().includes(searchTerm.toLowerCase())) {
          // Se contiver, mostra o post
          blogItem.style.display = "block";
          allPostsHidden = false; // Pelo menos um post está visível
        } else {
          // Se não contiver, oculta o post
          blogItem.style.display = "none";
        }
      }

      // Altera o valor do display da classe "blog-search-section"
      document.querySelector(".blog-search-section").style.display = "block";

      // Verifica se todos os posts estão ocultos
      if (allPostsHidden) {
        document.getElementById("blog-search-noresult").style.display = "block";
      } else {
        document.getElementById("blog-search-noresult").style.display = "none";
      }
    } else {
      // Se o valor do campo de pesquisa for nulo, oculta a seção
      document.querySelector(".blog-search-section").style.display = "none";
      // Oculta a mensagem de nenhum resultado
      document.getElementById("blog-search-noresult").style.display = "none";
    }

    // Remover o valor "active" das classes dos itens "li" contidos na lista definida pela classe "cat-list"
    var catListItems = document.querySelectorAll(".cat-list li");
    catListItems.forEach(function (item) {
      item.classList.remove("active");
    });
  });

function checkInput() {
  var inputElement = document.getElementById("blog-search-input");
  var magnifierElement = document.getElementById("search-magnifier");
  var clearElement = document.getElementById("search-clear");

  if (inputElement.value !== "") {
    magnifierElement.style.transform = "rotateY(180deg)";
    clearElement.style.transform = "rotateY(0deg)";
  } else {
    magnifierElement.style.transform = "rotateY(0deg)";
    clearElement.style.transform = "rotateY(180deg)";
  }
}

document.getElementById("search-clear").addEventListener("click", function () {
  // Aplique a rotação no span com ID "search-clear"
  this.style.transform = "rotateY(180deg)";

  // Restaure a rotação no span com ID "search-magnifier"
  document.getElementById("search-magnifier").style.transform = "rotateY(0deg)";

  // Oculte o contêiner com a classe "blog-search-section"
  var blogSearchSection = document.querySelector(".blog-search-section");
  blogSearchSection.style.display = "none";

  // Limpe o valor do input com ID "blog-search-input"
  document.getElementById("blog-search-input").value = "";

  // Altere a propriedade "display" para "block" em todos os elementos com a classe "blog_item"
  var blogItems = document.getElementsByClassName("blog_item");
  for (var i = 0; i < blogItems.length; i++) {
    blogItems[i].style.display = "block";
  }

  // Remover o valor "active" das classes dos itens "li" contidos na lista definida pela classe "cat-list"
  var catListItems = document.querySelectorAll(".cat-list li");
  catListItems.forEach(function (item) {
    item.classList.remove("active");
  });

  // Aplicar o valor "active" à classe do primeiro item "li" contido na lista definida pela classe "cat-list"
  if (catListItems.length > 0) {
    catListItems[0].classList.add("active");
  }
});
