function openPopup(imgId) {
  var imgSrc = document
    .getElementById(imgId)
    .style.backgroundImage.slice(5, -2);
  document.getElementById("popup-img").src = imgSrc;
  document.body.style.overflow = "hidden"; // Impede a rolagem da página
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.body.style.overflow = "auto"; // Permite a rolagem da página
  document.getElementById("popup").style.display = "none";
}
