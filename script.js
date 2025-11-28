// ============================================================================
// PORTFÓLIO INTERATIVO - Script Principal
// ============================================================================

// Estado Global
const state = {
    mobileMenuOpen: false,
    darkMode: localStorage.getItem('darkMode') === 'true' || false,
    scrollPosition: 0,
};

// ============================================================================
// 1. MENU RESPONSIVO - Toggle do menu em dispositivos mobile
// ============================================================================

class MobileMenu {
    constructor() {
        this.nav = document.querySelector('nav');
        this.navLinks = document.querySelectorAll('nav a');
        this.hamburger = null;
        this.init();
    }

    init() {
        // Criar botão hamburger se não existir
        this.createHamburger();
        this.attachEventListeners();
    }

    createHamburger() {
        const header = document.querySelector('header');
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        header.appendChild(hamburger);
        this.hamburger = hamburger;

        // Adicionar CSS do hamburger dinamicamente
        this.addHamburgerStyles();
    }

    addHamburgerStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .hamburger {
                display: none;
                flex-direction: column;
                cursor: pointer;
                gap: 0.5rem;
            }

            .hamburger span {
                width: 2.5rem;
                height: 0.3rem;
                background-color: #b74b4b;
                border-radius: 0.2rem;
                transition: all 0.3s ease;
            }

            @media (max-width: 995px) {
                .hamburger {
                    display: flex;
                }

                .hamburger.active span:nth-child(1) {
                    transform: rotate(45deg) translate(8px, 8px);
                }

                .hamburger.active span:nth-child(2) {
                    opacity: 0;
                }

                .hamburger.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -7px);
                }
            }
        `;
        document.head.appendChild(style);
    }

    attachEventListeners() {
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggle());
        }

        // Fechar menu ao clicar em um link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('header') && state.mobileMenuOpen) {
                this.close();
            }
        });
    }

    toggle() {
        if (state.mobileMenuOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        state.mobileMenuOpen = true;
        this.nav.classList.add('active');
        this.hamburger.classList.add('active');
    }

    close() {
        state.mobileMenuOpen = false;
        this.nav.classList.remove('active');
        this.hamburger.classList.remove('active');
    }
}

// ============================================================================
// 2. SMOOTH SCROLL - Navegação suave entre seções
// ============================================================================

class SmoothScroll {
    constructor() {
        this.navLinks = document.querySelectorAll('nav a');
        this.init();
    }

    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Se for link interno (#), faz smooth scroll
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    // Links para outras páginas funcionam normalmente
                    // Não fazer preventDefault aqui
                }
            });
        });
    }
}

// ============================================================================
// 3. DETECÇÃO DE SEÇÃO ATIVA - Atualizar nav link ativo ao rolar
// ============================================================================

class ActiveSectionDetector {
    constructor() {
        this.navLinks = document.querySelectorAll('nav a');
        this.sections = document.querySelectorAll('section');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateActiveSection());
    }

    updateActiveSection() {
        let currentSection = '';

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 200) {
                currentSection = section.getAttribute('id') || section.getAttribute('class');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    }
}

// ============================================================================
// 4. ANIMAÇÕES AO ROLAR - Efeito parallax e fade-in ao scroll
// ============================================================================

class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-animate]');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.animate());
        this.animate(); // Executar na carga
    }

    animate() {
        this.elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;

            // Se elemento está visível na viewport
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });

        // Efeito parallax simples
        this.parallaxEffect();
    }

    parallaxEffect() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(element => {
            const scrollPosition = window.scrollY;
            const speed = element.getAttribute('data-parallax') || 0.5;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    }
}

// ============================================================================
// 5. EFEITOS DE INTERAÇÃO - Cliques, hovers dinâmicos
// ============================================================================

class InteractionEffects {
    constructor() {
        this.socialIcons = document.querySelectorAll('.social-icons a');
        this.btn = document.querySelector('.btn');
        this.init();
    }

    init() {
        this.attachClickEffects();
        this.attachRippleEffect();
    }

    attachClickEffects() {
        this.socialIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                this.createClickEffect(e);
                // Links funcionam normalmente com target="_blank"
            });
        });

        if (this.btn) {
            this.btn.addEventListener('click', (e) => {
                this.createClickEffect(e);
                // Link de WhatsApp funciona normalmente
            });
        }
    }

    attachRippleEffect() {
        const buttons = document.querySelectorAll('.btn, .social-icons a');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', function () {
                this.style.boxShadow = '0 0 30px rgba(183, 75, 75, 0.8)';
            });
            btn.addEventListener('mouseleave', function () {
                this.style.boxShadow = '';
            });
        });
    }

    createClickEffect(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';

        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        e.target.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }
}

// ============================================================================
// 6. TEMA ESCURO/CLARO - Toggle de modo
// ============================================================================

class ThemeToggle {
    constructor() {
        this.isDarkMode = state.darkMode;
        this.init();
    }

    init() {
        this.createThemeToggle();
        if (this.isDarkMode) {
            this.applyDarkMode();
        }
    }

    createThemeToggle() {
        const style = document.createElement('style');
        style.textContent = `
            .theme-toggle {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                width: 3rem;
                height: 3rem;
                background: rgba(183, 75, 75, 0.2);
                border: 2px solid #b74b4b;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5rem;
                transition: all 0.3s ease;
                z-index: 1000;
                backdrop-filter: blur(5px);
            }

            .theme-toggle:hover {
                background: rgba(183, 75, 75, 0.4);
                transform: scale(1.1);
            }

            body.dark-mode {
                background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0f0f1e 100%);
            }
        `;
        document.head.appendChild(style);

        const toggle = document.createElement('button');
        toggle.className = 'theme-toggle';
        toggle.innerHTML = '🌙';
        toggle.title = 'Alternar tema';
        toggle.addEventListener('click', () => this.toggle());
        document.body.appendChild(toggle);
    }

    toggle() {
        this.isDarkMode = !this.isDarkMode;
        state.darkMode = this.isDarkMode;
        localStorage.setItem('darkMode', this.isDarkMode);

        if (this.isDarkMode) {
            this.applyDarkMode();
        } else {
            this.removeDarkMode();
        }
    }

    applyDarkMode() {
        document.body.classList.add('dark-mode');
    }

    removeDarkMode() {
        document.body.classList.remove('dark-mode');
    }
}

// ============================================================================
// 7. PERFORMANCE - Lazy loading e otimizações
// ============================================================================

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.reduceMotion();
    }

    lazyLoadImages() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    reduceMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            document.documentElement.style.scrollBehavior = 'auto';
        }
    }
}

// ============================================================================
// 8. UTILITÁRIOS - Funções auxiliares
// ============================================================================

class Utilities {
    // Adicionar estilo de ripple globalmente
    static addRippleStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            }

            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Log de informações (apenas em desenvolvimento)
    static logInit() {
        console.log('%c🎨 Portfólio Ivanildo Lima - Carregado com sucesso!',
            'color: #b74b4b; font-size: 16px; font-weight: bold;');
        console.log('%cFuncionalidades ativas:', 'color: #e74c3c; font-weight: bold;');
        console.log('✅ Menu responsivo');
        console.log('✅ Smooth scroll');
        console.log('✅ Detecção de seção ativa');
        console.log('✅ Animações ao rolar');
        console.log('✅ Efeitos de interação');
        console.log('✅ Tema claro/escuro');
    }
}

// ============================================================================
// 9. INICIALIZAÇÃO - Executar tudo quando o DOM estiver pronto
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas as funcionalidades
    Utilities.addRippleStyles();

    const mobileMenu = new MobileMenu();
    const smoothScroll = new SmoothScroll();
    const activeSection = new ActiveSectionDetector();
    const scrollAnimations = new ScrollAnimations();
    const interactionEffects = new InteractionEffects();
    const themeToggle = new ThemeToggle();
    const performanceOptimizer = new PerformanceOptimizer();

    // Log de inicialização
    Utilities.logInit();

    // Evento adicional: Log quando o usuário interage
    document.addEventListener('click', (e) => {
        if (e.target.closest('nav a')) {
            console.log('🔗 Navegando para:', e.target.textContent);
        }
    });
});

// ============================================================================
// 10. EVENT LISTENERS ADICIONAIS
// ============================================================================

// Detectar mudança de tamanho da tela
window.addEventListener('resize', () => {
    if (window.innerWidth > 995) {
        const nav = document.querySelector('nav');
        nav?.classList.remove('active');
        state.mobileMenuOpen = false;
    }
});

// Atualizar posição do scroll
window.addEventListener('scroll', () => {
    state.scrollPosition = window.scrollY;
});

// Detectar conectividade
window.addEventListener('online', () => {
    console.log('✅ Conexão restaurada!');
});

window.addEventListener('offline', () => {
    console.log('⚠️ Sem conexão com internet');
});
