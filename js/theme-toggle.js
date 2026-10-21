// <theme-toggle>: a light/dark switch that remembers the choice in a cookie.
// theme-init.js applies the cookie before paint; this element only changes it.
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const DARK_QUERY = '(prefers-color-scheme: dark)';

class ThemeToggle extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <button type="button" class="theme-toggle" aria-pressed="false">
        <svg class="icon" aria-hidden="true" focusable="false"><use href="/img/icons.svg#moon"/></svg>
        <span class="visually-hidden">Dark mode</span>
      </button>`;
    this.button = this.querySelector('button');
    this.media = window.matchMedia(DARK_QUERY);
    this.onClick = () => this.setTheme(this.isDark ? 'light' : 'dark');
    this.onSystemChange = () => this.sync();
    this.onThemeChange = () => this.sync();
    this.button.addEventListener('click', this.onClick);
    this.media.addEventListener('change', this.onSystemChange);
    document.addEventListener('themechange', this.onThemeChange);
    this.sync();
  }

  disconnectedCallback() {
    this.media.removeEventListener('change', this.onSystemChange);
    document.removeEventListener('themechange', this.onThemeChange);
  }

  // The saved choice wins; with none, the system setting decides.
  get isDark() {
    const saved = document.documentElement.dataset.theme;
    return saved ? saved === 'dark' : this.media.matches;
  }

  setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const secure = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `theme=${theme}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
    document.dispatchEvent(new Event('themechange'));
  }

  sync() {
    this.button.setAttribute('aria-pressed', String(this.isDark));
  }
}

customElements.define('theme-toggle', ThemeToggle);
