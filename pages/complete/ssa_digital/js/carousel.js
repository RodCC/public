// Lógica do carousel
function showSlide(carouselId, n) {
  const carousel = document.getElementById(carouselId);
  const carouselItems = carousel.getElementsByClassName("carousel-item");
  const totalSlides = carouselItems.length;

  let currentSlide = parseInt(
    carousel.querySelector(".current-slide").innerText
  );

  if (n > totalSlides) {
    currentSlide = 1;
  } else if (n < 1) {
    currentSlide = totalSlides;
  } else {
    currentSlide = n;
  }

  const translateValue = -(currentSlide - 1) * 100 + "%";
  carousel.querySelector(".carousel").style.transform =
    "translateX(" + translateValue + ")";

  // Atualiza o número da imagem em exibição
  carousel.querySelector(".current-slide").innerText = currentSlide;

  // Verifica se ambas as setas devem ser ocultadas
  const match = carouselId.match(/\d+$/); // Extrai todos os dígitos do final da string
  const arrowClass = match ? "arrow" + match[0] : ""; // Verifica se houve correspondência
  const arrows = document.querySelectorAll("." + arrowClass);
  const totalSlidesValue = parseInt(
    carousel.querySelector(".total-slides").innerText
  );

  if (totalSlidesValue === 1) {
    arrows.forEach(function (arrow) {
      arrow.style.display = "none";
    });
  } else {
    arrows.forEach(function (arrow) {
      arrow.style.display = "block";
    });
  }
}

function prevSlide(carouselId) {
  const carousel = document.getElementById(carouselId);
  const currentSlide = parseInt(
    carousel.querySelector(".current-slide").innerText
  );
  showSlide(carouselId, currentSlide - 1);
}

function nextSlide(carouselId) {
  const carousel = document.getElementById(carouselId);
  const currentSlide = parseInt(
    carousel.querySelector(".current-slide").innerText
  );
  showSlide(carouselId, currentSlide + 1);
}

// Inicializa os carousels
document.querySelectorAll(".carousel-container").forEach(function (carousel) {
  const totalSlides = carousel.getElementsByClassName("carousel-item").length;
  carousel.querySelector(".total-slides").innerText = totalSlides;

  // Mostra a primeira imagem ao carregar a página
  showSlide(carousel.id, 1);
});
