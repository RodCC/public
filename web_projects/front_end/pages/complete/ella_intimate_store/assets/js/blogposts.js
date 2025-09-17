// Função para ordenar os posts por data
function ordenarPosts() {
  var mainSection = document.getElementById("blog-posts-container");
  var posts = mainSection.getElementsByClassName("blog_item");

  // Converte a coleção de posts para um array
  var postsArray = Array.from(posts);

  // Ordena os posts com base nas datas em "cat-date"
  postsArray.sort(function (a, b) {
    var dateA = new Date(a.querySelector(".cat-date").textContent);
    var dateB = new Date(b.querySelector(".cat-date").textContent);
    return dateB - dateA; // Ordena em ordem decrescente
  });

  // Limpa a seção principal e adiciona os posts ordenados de volta
  mainSection.innerHTML = "";
  postsArray.forEach(function (post) {
    mainSection.appendChild(post);
  });
}

// Chame a função para ordenar os posts quando a página carregar
window.onload = ordenarPosts;
