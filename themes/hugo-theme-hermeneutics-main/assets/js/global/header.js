const THEME_KEY = 'theme';
const THEMES = ['light', 'dark'];
let currentTheme = null;

const getTheme = () => {
    if (currentTheme) return currentTheme;
    const saved = localStorage.getItem(THEME_KEY);
    return (THEMES.includes(saved)) ? saved : 'light';
};

const setTheme = (theme) => {
    const html = document.documentElement;
    THEMES.forEach(t => html.classList.remove(t));
    html.classList.add(theme);
    currentTheme = theme;
    localStorage.setItem(THEME_KEY, theme);
};

const bindThemeToggle = () => {
    const btn = document.getElementById('header-btns__theme');
    btn?.addEventListener('click', () => setTheme(currentTheme === 'dark' ? 'light' : 'dark'));
};

const handleNavScroll = () => {
    const headerMenu = document.getElementById('header-menu');
    const headerTitle = document.getElementById('header-title');
    const mobileMenu = document.getElementById('header-mobilemenu');
    const threshold = 100;

    const updateNav = () => {
        const y = window.scrollY;
        if (!headerMenu || !headerTitle) return;

        const isScrolled = y > threshold;
        headerMenu.style.opacity = isScrolled ? '0' : '1';
        headerMenu.style.pointerEvents = isScrolled ? 'none' : 'auto';
        mobileMenu.style.opacity = isScrolled ? '0' : '1';
        mobileMenu.style.pointerEvents = isScrolled ? 'none' : 'auto';
        headerTitle.style.opacity = isScrolled ? '1' : '0';
        headerTitle.style.pointerEvents = isScrolled ? 'auto' : 'none';
    };

    window.addEventListener('scroll', updateNav);
    updateNav();
};

document.addEventListener('DOMContentLoaded', () => {
    setTheme(getTheme());
    bindThemeToggle();
    handleNavScroll();
});
