document.addEventListener("DOMContentLoaded", function () {
  // Encontrar todas as imagens dentro da classe "single-post"
  var postImages = document.querySelectorAll(".feature-img img");

  // Encontrar os elementos da galeria
  var galleryElements = document.querySelectorAll(".gallery_img");

  // Iterar sobre as imagens e transferir para os elementos da galeria
  for (var i = 0; i < Math.min(postImages.length, 9); i++) {
    var imageUrl = postImages[i].src;
    var galleryElement = galleryElements[i];

    // Atribuir a URL da imagem à propriedade "background-image"
    galleryElement.style.backgroundImage = "url('" + imageUrl + "')";
  }

  // Ocultar os elementos da galeria que não possuem imagem
  for (var j = postImages.length; j < galleryElements.length; j++) {
    var emptyGalleryElement = galleryElements[j];
    emptyGalleryElement.style.display = "none";
  }
});
