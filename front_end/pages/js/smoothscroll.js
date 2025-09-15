// Função para suavizar a rolagem para as seções
document.querySelectorAll(".smooth-link").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop,
      behavior: "smooth",
    });
  });
});

// Função para adicionar a classe "active" ao link clicado
function setActiveLink(event) {
  event.preventDefault(); // Impede o comportamento padrão do link

  // Remover a classe "active" de todos os links
  document.querySelectorAll(".smooth-link").forEach((link) => {
    link.classList.remove("active");
  });

  // Adiar a adição da classe "active" para o próximo ciclo de eventos
  setTimeout(() => {
    // Adicionar a classe "active" ao link clicado
    event.target.classList.add("active");
  }, 0);
}

// Função para marcar automaticamente o link conforme a rolagem da página
function highlightActiveLink() {
  // Obter a posição de rolagem atual
  const scrollPosition = window.scrollY;

  // Iterar sobre os links e marcar o link da seção visível
  document.querySelectorAll(".smooth-link").forEach((link) => {
    const targetSection = document.querySelector(link.getAttribute("href"));
    if (
      targetSection.offsetTop <= scrollPosition &&
      targetSection.offsetTop + targetSection.offsetHeight > scrollPosition
    ) {
      // Remover a classe "active" de todos os links
      document.querySelectorAll(".smooth-link").forEach((link) => {
        link.classList.remove("active");
      });

      // Adiar a adição da classe "active" para o próximo ciclo de eventos
      setTimeout(() => {
        // Adicionar a classe "active" ao link correspondente à seção visível
        link.classList.add("active");
      }, 0);
    }
  });
}

// Adicionar evento de clique aos links
document.querySelectorAll(".smooth-link").forEach((link) => {
  link.addEventListener("click", setActiveLink);
});

// Adicionar evento de rolagem para marcar automaticamente o link
window.addEventListener("scroll", highlightActiveLink);
