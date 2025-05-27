document.addEventListener('DOMContentLoaded', () => {
    // --- Seletores Globais ---
    const siteHeader = document.getElementById('siteHeader');
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mainNav = document.getElementById('mainNav');
    const siteOverlay = document.getElementById('siteOverlay');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;
    const particlesContainer = document.getElementById('particles-js');
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    const heroHeadline = document.getElementById('heroHeadline');
    const currentYearSpan = document.getElementById('currentYear');

    // --- Configurações ---
    const STICKY_HEADER_OFFSET = 10;
    const HERO_HEADLINE_TEXT = "Desenvolvimento Web Profissional.";

    // --- Inicializações ---
    const initApp = () => {
        if (typeof feather !== 'undefined') {
            feather.replace();
        } else {
            console.warn('Feather Icons library not loaded.');
        }

        setupStickyHeader();
        setupMobileMenu();
        setupDarkMode();
        setupFavoriteButtons();
        setupScrollReveal();
        setupParticles();
        setupTiltEffect();
        animateHeroHeadline();
        updateCurrentYear();
    };

    // --- Header Fixo ---
    const setupStickyHeader = () => {
        if (!siteHeader) return;
        window.addEventListener('scroll', () => {
            if (window.scrollY > STICKY_HEADER_OFFSET) {
                siteHeader.classList.add('is-sticky');
            } else {
                siteHeader.classList.remove('is-sticky');
            }
        }, { passive: true });
    };

    // --- Menu Mobile ---
    const setupMobileMenu = () => {
        if (!mobileNavToggle || !mainNav || !siteOverlay) return;

        const toggleMenu = (isActive) => {
            mainNav.classList.toggle('active', isActive);
            mobileNavToggle.classList.toggle('active', isActive);
            siteOverlay.classList.toggle('active', isActive);
            document.body.classList.toggle('no-scroll', isActive);
            mobileNavToggle.setAttribute('aria-expanded', isActive);
            mobileNavToggle.setAttribute('aria-label', isActive ? 'Fechar menu' : 'Abrir menu');
        };

        mobileNavToggle.addEventListener('click', () => {
            const isActive = mainNav.classList.contains('active');
            toggleMenu(!isActive);
        });

        siteOverlay.addEventListener('click', () => toggleMenu(false));

        mainNav.querySelectorAll('.nav-link, .btn').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    setTimeout(() => toggleMenu(false), 100);
                }
            });
        });
    };

    // --- Dark Mode ---
    const setupDarkMode = () => {
        const applyTheme = (theme) => {
            htmlElement.classList.toggle('dark-mode', theme === 'dark');
            if (darkModeToggle) {
                darkModeToggle.setAttribute('aria-pressed', theme === 'dark');
                darkModeToggle.setAttribute('aria-label', theme === 'dark' ? 'Desativar modo escuro' : 'Ativar modo escuro');
            }
            const rootStyle = getComputedStyle(htmlElement);
            // Certifique-se de que todas as cores base usadas para gerar RGBs estejam aqui
            const colorKeys = ['bg-color', 'bg-alt-color', 'accent-color', 'heart-color', 'text-color', 'text-muted-color', 'border-color'];
            colorKeys.forEach(key => {
                const colorValue = rootStyle.getPropertyValue(`--${key}`).trim();
                if (colorValue) {
                    htmlElement.style.setProperty(`--${key}-rgb`, getRgbValues(colorValue));
                }
            });
        };
        
        const applyInitialTheme = () => {
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            let currentTheme = 'light';

            if (savedTheme) {
                currentTheme = savedTheme;
            } else if (prefersDark) {
                currentTheme = 'dark';
            }
            applyTheme(currentTheme);
        };

        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => {
                const isDark = htmlElement.classList.contains('dark-mode');
                const newTheme = isDark ? 'light' : 'dark';
                localStorage.setItem('theme', newTheme);
                applyTheme(newTheme);
            });
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
        
        applyInitialTheme();
    };

    const getRgbValues = (colorString) => {
        if (!colorString) return '255, 255, 255';
        if (colorString.startsWith('#')) {
            const bigint = parseInt(colorString.slice(1), 16);
            return `${(bigint >> 16) & 255}, ${(bigint >> 8) & 255}, ${bigint & 255}`;
        } else if (colorString.startsWith('rgb')) {
            const match = colorString.match(/\d+/g);
            return match ? match.join(', ') : '255, 255, 255';
        }
        return '255, 255, 255';
    };

    // --- Botões Favoritar ---
    const setupFavoriteButtons = () => {
        favoriteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                button.classList.toggle('active');
                const isActive = button.classList.contains('active');
                button.setAttribute('aria-pressed', isActive);
                button.setAttribute('aria-label', isActive ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos');
            });
        });
    };

    // --- Animação Hero Headline ---
    const animateHeroHeadline = () => {
        if (!heroHeadline) return;
        heroHeadline.innerHTML = '';
        HERO_HEADLINE_TEXT.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.transitionDelay = `${index * 0.04}s`;
            heroHeadline.appendChild(span);
        });
        void heroHeadline.offsetWidth;
        Array.from(heroHeadline.children).forEach(span => span.classList.add('is-visible'));
    };

    // --- ScrollReveal ---
    const setupScrollReveal = () => {
        if (typeof ScrollReveal === 'undefined') {
            console.warn('ScrollReveal library not loaded.');
            document.querySelectorAll('[data-sr-id]').forEach(el => el.style.visibility = 'visible');
            return;
        }
        const sr = ScrollReveal({
            origin: 'bottom', distance: '30px', duration: 800, delay: 100,
            opacity: 0, scale: 0.95, easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
            reset: false, viewFactor: 0.15, mobile: true
        });
        sr.reveal('.hero-subheadline', { delay: HERO_HEADLINE_TEXT.length * 40 + 200 });
        sr.reveal('.hero-cta', { delay: HERO_HEADLINE_TEXT.length * 40 + 350 });
        sr.reveal('.section-title', { scale: 1, distance: '10px' });
        sr.reveal('.course-card', { interval: 80, origin: 'bottom', distance: '20px' });
        sr.reveal('.feature-item', { interval: 80, scale: 0.9, distance: '20px' });
        sr.reveal('.cta-section > .container > *', { interval: 100, distance: '15px'});
    };

    // --- Particles.js ---
    const setupParticles = () => {
        if (!particlesContainer || typeof particlesJS === 'undefined') return;
        
        const getCurrentParticleColors = () => {
            const particleColor = getComputedStyle(htmlElement).getPropertyValue('--text-color').trim();
            const lineColor = getComputedStyle(htmlElement).getPropertyValue('--text-muted-color').trim(); 
            
            const defaultLightParticle = "#1F2937";
            const defaultLightLine = "#6B7280";
            const defaultDarkParticle = "#F3F4F6";
            const defaultDarkLine = "#9CA3AF";

            if (htmlElement.classList.contains('dark-mode')) {
                return { 
                    particleColor: particleColor || defaultDarkParticle, 
                    lineColor: lineColor || defaultDarkLine
                };
            } else {
                return { 
                    particleColor: particleColor || defaultLightParticle, 
                    lineColor: lineColor || defaultLightLine
                };
            }
        };

        const initOrRefreshParticles = () => {
            const colors = getCurrentParticleColors();
            const particleConfig = {
                "particles": {
                    "number": {"value": 80, "density": {"enable": true, "value_area": 800}},
                    "color": {"value": colors.particleColor},
                    "shape": {"type": "circle"},
                    "opacity": {"value": 0.5, "random": true, "anim": {"enable": true, "speed": 0.6, "opacity_min": 0.2, "sync": false}},
                    "size": {"value": 3.5, "random": true, "anim": {"enable": false}},
                    "line_linked": {"enable": true, "distance": 150, "color": colors.lineColor, "opacity": 0.35, "width": 1},
                    "move": {"enable": true, "speed": 1.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false}
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {"onhover": {"enable": true, "mode": "grab"}, "onclick": {"enable": true, "mode": "push"}},
                    "modes": {"grab": {"distance": 160, "line_opacity": 0.45}, "push": {"particles_nb": 3}}
                },
                "retina_detect": true
            };

            if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
                const pJS = window.pJSDom[0].pJS;
                pJS.particles.color.value = colors.particleColor;
                pJS.particles.line_linked.color = colors.lineColor;
                pJS.fn.particlesRefresh();
            } else {
                particlesJS('particles-js', particleConfig);
            }
        };
        initOrRefreshParticles();
        const themeObserver = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'class') { 
                   initOrRefreshParticles(); 
                }
            });
        });
        themeObserver.observe(htmlElement, { attributes: true });
    };

    // --- Vanilla Tilt ---
    const setupTiltEffect = () => {
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(document.querySelectorAll(".course-card"), {
                max: 6,
                speed: 600,
                glare: true,
                "max-glare": 0.1
            });
        }
    };
    
    // --- Ano Atual no Footer ---
    const updateCurrentYear = () => {
        if (currentYearSpan) {
            currentYearSpan.textContent = new Date().getFullYear();
        }
    };

    // --- Iniciar Aplicação ---
    initApp();
});