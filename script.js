document.addEventListener('DOMContentLoaded', () => {

    // --- Seletores ---
    const siteHeader = document.getElementById('siteHeader');
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mainNav = document.getElementById('mainNav');
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement; // Seleciona o <html>

    // --- Feather Icons ---
    feather.replace(); // Inicializa ícones

    // --- Sticky Header ---
    const headerHeight = siteHeader.offsetHeight; // Pega a altura inicial
    window.addEventListener('scroll', () => {
        if (window.scrollY > headerHeight / 2) { // Ativa um pouco antes de sair da tela
            siteHeader.classList.add('sticky');
        } else {
            siteHeader.classList.remove('sticky');
        }
    });

    // --- Menu Mobile ---
    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileNavToggle.classList.toggle('active');
            document.body.classList.toggle('no-scroll'); // Impede scroll do body
            // Atualiza aria-expanded
            const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
            mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Fecha o menu ao clicar em um link dentro dele (opcional)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileNavToggle.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                    mobileNavToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // --- Botões Favoritar ---
    favoriteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Previne qualquer ação padrão
            button.classList.toggle('active');
            const heartIcon = button.querySelector('i[data-feather="heart"]');
            if (button.classList.contains('active')) {
                button.setAttribute('aria-label', 'Remover dos Favoritos');
                // Opcional: Re-renderizar ícone preenchido (melhor se o SVG permitir fill via CSS)
                heartIcon.style.fill = 'var(--heart-color)'; // Aplica fill diretamente
            } else {
                button.setAttribute('aria-label', 'Adicionar aos Favoritos');
                 heartIcon.style.fill = 'none'; // Remove fill
            }
             // Re-renderizar o ícone para garantir que o fill seja aplicado/removido
             // feather.replace(); // Pode ser pesado, usar com cuidado ou focar no botão específico
        });
    });

    // --- Dark Mode ---
    const sunIcon = 'sun';
    const moonIcon = 'moon';

    const updateDarkModeIcon = (isDarkMode) => {
        const iconType = isDarkMode ? sunIcon : moonIcon;
        darkModeToggle.innerHTML = ''; // Limpa o ícone atual
        const newIcon = feather.icons[iconType].toSvg({
            class: 'icon icon-sm',
            'stroke-width': 2 // Garante a espessura
        });
        darkModeToggle.insertAdjacentHTML('beforeend', newIcon);
    };

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            htmlElement.classList.add('dark-mode');
            updateDarkModeIcon(true);
        } else {
            htmlElement.classList.remove('dark-mode');
            updateDarkModeIcon(false);
        }
        // Define as variáveis RGB para o tema atual (necessário para rgba() no CSS)
        const rootStyle = getComputedStyle(htmlElement);
        const neutral0 = rootStyle.getPropertyValue('--neutral-0').trim();
        const primary500 = rootStyle.getPropertyValue('--primary-500').trim();
        // Adicione outras cores se necessário
        // Função simples para tentar converter hex/rgb para valores RGB
        const getRgbValues = (colorString) => {
            if (colorString.startsWith('#')) { // HEX
                const bigint = parseInt(colorString.slice(1), 16);
                const r = (bigint >> 16) & 255;
                const g = (bigint >> 8) & 255;
                const b = bigint & 255;
                return `${r}, ${g}, ${b}`;
            } else if (colorString.startsWith('rgb')) { // RGB
                return colorString.match(/\d+/g).join(', ');
            }
            return '255, 255, 255'; // Default fallback (branco)
        }
        htmlElement.style.setProperty('--neutral-0-rgb', getRgbValues(neutral0));
        // console.log(`--neutral-0-rgb set to: ${getRgbValues(neutral0)}`); // Debug
    };

    // Verifica preferência do OS e localStorage
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    let currentTheme = 'light'; // Padrão

    if (savedTheme) {
        currentTheme = savedTheme;
    } else if (prefersDarkScheme.matches) {
        currentTheme = 'dark';
    }

    applyTheme(currentTheme);

    // Listener para o botão de toggle
    darkModeToggle.addEventListener('click', () => {
        const isDark = htmlElement.classList.contains('dark-mode');
        currentTheme = isDark ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        applyTheme(currentTheme);
    });

    // Listener para mudança de preferência do OS (opcional)
    prefersDarkScheme.addEventListener('change', (e) => {
        // Só atualiza se não houver preferência salva pelo usuário
        if (!localStorage.getItem('theme')) {
            currentTheme = e.matches ? 'dark' : 'light';
            applyTheme(currentTheme);
        }
    });


    // --- Scroll Reveal Animações ---
    // Certifique-se de que a biblioteca ScrollReveal está carregada
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom', // Origem da animação
            distance: '50px',  // Distância do deslocamento
            duration: 800,     // Duração da animação
            delay: 200,        // Delay padrão
            opacity: 0,        // Começa transparente
            scale: 0.9,        // Começa um pouco menor
            easing: 'cubic-bezier(0.5, 0, 0, 1)', // Curva de animação suave
            reset: false,      // Animação ocorre apenas uma vez
            viewFactor: 0.2,   // % do elemento visível para disparar
            mobile: true       // Habilitado em mobile
        });

        // Animações Específicas
        sr.reveal('.reveal-up', { origin: 'bottom', scale: 1 }); // Slide de baixo sem escala
        sr.reveal('.reveal-fade', { distance: '0px', scale: 1 }); // Apenas fade-in
        sr.reveal('.reveal-card', { interval: 100, origin: 'left', scale: 0.95 }); // Cards entram da esquerda com intervalo
        sr.reveal('.reveal-feature', { interval: 150, origin: 'bottom', scale: 0.9 }); // Features entram de baixo com intervalo maior

        // Hero específico (pode ter delay menor ou ser diferente)
        sr.reveal('.hero-section h1', { delay: 300, origin: 'top', distance: '30px', scale: 1 });
        sr.reveal('.hero-section .lead', { delay: 400, origin: 'bottom', distance: '30px', scale: 1 });
        sr.reveal('.hero-section .btn', { delay: 500, origin: 'bottom', distance: '30px', scale: 1, interval: 100 });

    } else {
        console.warn('ScrollReveal library not loaded.');
        // Torna elementos visíveis se ScrollReveal falhar
        document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-card, .reveal-feature').forEach(el => {
            el.style.visibility = 'visible';
        });
    }

    // --- Particles.js ---
     if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
          "particles": {
            "number": {
              "value": 60, // Menos partículas
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              // Usa cores do tema! Adapta no dark mode
              "value": getComputedStyle(document.documentElement).getPropertyValue('--primary-500').trim() || "#0052cc"
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#000000"
              },
            },
            "opacity": {
              "value": 0.4, // Mais sutis
              "random": true, // Opacidade aleatória
              "anim": {
                "enable": true,
                "speed": 0.5, // Animação lenta
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 3,
              "random": true,
              "anim": {
                "enable": false,
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 120, // Linhas mais curtas
              // Adapta cor da linha ao tema
              "color": getComputedStyle(document.documentElement).getPropertyValue('--neutral-500').trim() || "#cccccc",
              "opacity": 0.3,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 2, // Movimento lento
              "direction": "none",
              "random": true, // Direção aleatória
              "straight": false,
              "out_mode": "out",
              "bounce": false,
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "grab" // Efeito de "pegar" ao passar mouse
              },
              "onclick": {
                "enable": true,
                "mode": "push" // Empurra partículas ao clicar
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 140,
                "line_opacity": 0.5
              },
              "bubble": { /* Desabilitado */ },
              "repulse": { /* Desabilitado */ },
              "push": {
                "particles_nb": 4
              },
              "remove": { /* Desabilitado */ }
            }
          },
          "retina_detect": true
        });

        // --- Atualiza cores das partículas no dark mode ---
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'class') {
                    const isDark = htmlElement.classList.contains('dark-mode');
                    const pJS = window.pJSDom[0]?.pJS; // Acessa a instância particlesJS
                    if (pJS) {
                        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-500').trim();
                        const neutralColor = getComputedStyle(document.documentElement).getPropertyValue('--neutral-500').trim();
                        pJS.particles.color.value = primaryColor;
                        pJS.particles.line_linked.color = neutralColor;
                        // Redesenha as partículas com as novas cores
                        pJS.fn.particlesRefresh();
                    }
                }
            });
        });
        observer.observe(htmlElement, { attributes: true });

     } else {
         console.warn('Particles.js library not loaded.');
     }

}); // Fim do DOMContentLoaded