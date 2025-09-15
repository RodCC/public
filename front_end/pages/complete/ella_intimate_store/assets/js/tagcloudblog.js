document.addEventListener("DOMContentLoaded", function () {
  // Seleciona todos os parágrafos dentro da classe "blog_details"
  var paragraphs = document.querySelectorAll(".blog_details p");

  // Inicializa uma array para armazenar as palavras-chave
  var keywords = [];

  // Itera sobre os parágrafos para extrair palavras-chave
  paragraphs.forEach(function (paragraph) {
    // Divide o texto do parágrafo em palavras
    var words = paragraph.textContent.split(/\s+/).filter(function (word) {
      return word.length > 0; // Remove palavras vazias
    });

    // Adiciona as palavras ao array de palavras-chave
    keywords = keywords.concat(words);
  });

  // Remove palavras repetidas
  var uniqueKeywords = Array.from(new Set(keywords));

  // Seleciona os elementos pela ID e insere as palavras-chave
  for (var i = 0; i < 7 && i < uniqueKeywords.length; i++) {
    var tagCloudId = "tagcloud-" + (i + 1);
    var tagCloudElement = document.getElementById(tagCloudId);

    if (tagCloudElement) {
      tagCloudElement.textContent = uniqueKeywords[i];
    }
  }
});
