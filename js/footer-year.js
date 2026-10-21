// Keeps the footer copyright year current. The markup holds a static year as a fallback.
document.querySelectorAll('[data-current-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});
