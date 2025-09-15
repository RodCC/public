document.addEventListener("DOMContentLoaded", function () {
  // 1. Extrair o título do "post" da ID "post_title"
  var postTitleElement = document.getElementById("post_title");
  if (postTitleElement) {
    var postTitle = postTitleElement.innerText || postTitleElement.textContent;

    // 2. Aplicar a transformação "capitalize" à primeira letra de cada palavra
    var capitalizedTitle = postTitle.replace(/(^|\s)\S/g, function (match) {
      return match.toUpperCase();
    });

    // 3. Inserir o valor no texto da aba usando o modelo: "Ella Blog | (título do post)"
    document.title = "Ella Blog | " + capitalizedTitle;
  }
});
