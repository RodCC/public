document.addEventListener("DOMContentLoaded", function () {
  const filterControl = document.querySelector(".sale-filter-control");
  const saleItems = document.querySelectorAll(".sale-item");

  filterControl.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      const filterValue = event.target.getAttribute("data-filter");

      // Remove a classe 'active' de todos os itens e adiciona ao item clicado
      filterControl.querySelectorAll("li").forEach(function (li) {
        li.classList.remove("active");
      });
      event.target.classList.add("active");

      // Adiciona a classe 'hidden' a todos os itens
      saleItems.forEach(function (item) {
        item.classList.add("hidden");
      });

      // Exibe apenas os itens correspondentes ao filtro
      saleItems.forEach(function (item) {
        if (filterValue === "*" || item.classList.contains(filterValue)) {
          // Adiciona um atraso de 0.6s antes de definir o estilo como 'block'
          setTimeout(function () {
            item.style.display = "block";
          }, 600);
          // Remove a classe 'hidden' com um pequeno atraso para garantir que a transição seja aplicada
          setTimeout(function () {
            item.classList.remove("hidden");
          }, 600);
        } else {
          // Deixa o item visível por 600ms antes de ocultá-lo
          setTimeout(function () {
            item.style.display = "none";
          }, 600);
        }
      });
    }
  });
});
