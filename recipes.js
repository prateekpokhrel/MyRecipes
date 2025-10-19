// --- Recipe Search Functionality ---
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const recipeCards = document.querySelectorAll(".recipe-card");

  searchInput.addEventListener("keyup", () => {
    const query = searchInput.value.toLowerCase();
    recipeCards.forEach(card => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = title.includes(query) ? "block" : "none";
    });
  });
});
