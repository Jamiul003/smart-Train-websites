document.addEventListener('DOMContentLoaded', () => {
    // Language toggle functionality
    const langToggle = document.getElementById('lang-toggle');
    const translatableElements = document.querySelectorAll('[data-lang-en]');
    const translations = { en: {}, bn: {} };

    translatableElements.forEach(el => {
        const enText = el.getAttribute('data-lang-en');
        const bnText = el.getAttribute('data-lang-bn');
        // A more robust key generation to avoid empty keys
        const key = (enText || bnText).substring(0, 20).replace(/\s+/g, '-').toLowerCase();
        translations.en[key] = enText;
        translations.bn[key] = bnText;
        el.dataset.translationKey = key;
    });

    let currentLang = localStorage.getItem('preferredLang') || 'en';

    function setLanguage(lang) {
        translatableElements.forEach(el => {
            const key = el.dataset.translationKey;
            if (translations[lang] && translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });
        document.documentElement.lang = lang;
        currentLang = lang;
        localStorage.setItem('preferredLang', lang);
    }

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'bn' : 'en';
            setLanguage(newLang);
        });
    }

    // Set initial language
    setLanguage(currentLang);

    // Highlight current page in navbar
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar ul li');
    navLinks.forEach(link => {
        const a = link.querySelector('a');
        if (a && a.getAttribute('href') === currentPage) {
            link.classList.add('current-page');
        }
    });

    // Loader and fade-in effects
    const loader = document.querySelector('.loader');
    const body = document.querySelector('body');

    if (loader) {
        loader.style.display = 'block';
    }

    window.addEventListener('load', () => {
        if (loader) {
            loader.style.display = 'none';
        }
        if (body) {
            body.classList.add('fade-in');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                e.preventDefault(); // Prevent default for href="#"
            }
        });
    });
});
