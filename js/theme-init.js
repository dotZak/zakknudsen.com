// Runs in <head>, before first paint, so a saved theme never flashes the wrong colors.
// With no cookie, no attribute is set and the CSS follows the system setting.
(() => {
  const match = document.cookie.match(/(?:^|; )theme=(light|dark)(?:;|$)/);
  if (match) document.documentElement.dataset.theme = match[1];
})();
