// ============================================================================
// PÁGINA DE PROJETOS - FUNCIONALIDADES
// ============================================================================

class ProjectsFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.attachEventListeners();
    }

    attachEventListeners() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.filterProjects(e.target.getAttribute('data-filter'));
                this.updateActiveButton(e.target);
            });
        });
    }

    filterProjects(category) {
        this.projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            // Adicionar animação de saída
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';

            setTimeout(() => {
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                    // Animar entrada
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            }, 300);
        });
    }

    updateActiveButton(activeButton) {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }
}

// ============================================================================
// ANIMAÇÕES AO CARREGAR
// ============================================================================

class ProjectsAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.animateCardsOnLoad();
        this.attachScrollAnimations();
    }

    animateCardsOnLoad() {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }

    attachScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.project-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease-out';
            observer.observe(card);
        });
    }
}

// ============================================================================
// EFEITO DE TRANSIÇÃO SUAVE
// ============================================================================

class SmoothTransitions {
    constructor() {
        this.projectCards = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.projectCards.forEach(card => {
            card.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    }
}

// ============================================================================
// CONTADORES DE PROJETOS (OPCIONAL)
// ============================================================================

class ProjectStats {
    constructor() {
        this.projectCards = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.displayStats();
    }

    displayStats() {
        const categories = {
            'all': this.projectCards.length,
            'frontend': this.projectCards.filter(c => c.getAttribute('data-category') === 'frontend').length,
            'backend': this.projectCards.filter(c => c.getAttribute('data-category') === 'backend').length,
            'fullstack': this.projectCards.filter(c => c.getAttribute('data-category') === 'fullstack').length
        };

        console.log('%c📊 Estatísticas de Projetos', 'color: #b74b4b; font-weight: bold; font-size: 14px;');
        console.log(`Total: ${categories.all}`);
        console.log(`Front-end: ${categories.frontend}`);
        console.log(`Back-end: ${categories.backend}`);
        console.log(`Full-stack: ${categories.fullstack}`);
    }
}

// ============================================================================
// NAVEGAÇÃO DE VOLTA AO TOPO
// ============================================================================

class BackToTopButton {
    constructor() {
        this.init();
    }

    init() {
        this.createButton();
    }

    createButton() {
        const style = document.createElement('style');
        style.textContent = `
            .back-to-top {
                position: fixed;
                bottom: 6rem;
                right: 2rem;
                width: 3rem;
                height: 3rem;
                background: linear-gradient(135deg, #b74b4b, #e74c3c);
                border: none;
                border-radius: 50%;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 999;
                opacity: 0;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(183, 75, 75, 0.4);
            }

            .back-to-top.show {
                display: flex;
                opacity: 1;
            }

            .back-to-top:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 25px rgba(183, 75, 75, 0.6);
            }

            @media (max-width: 768px) {
                .back-to-top {
                    bottom: 4rem;
                    right: 1rem;
                    width: 2.5rem;
                    height: 2.5rem;
                    font-size: 1.2rem;
                }
            }
        `;
        document.head.appendChild(style);

        const button = document.createElement('button');
        button.className = 'back-to-top';
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(button);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                button.classList.add('show');
            } else {
                button.classList.remove('show');
            }
        });

        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas as funcionalidades
    const projectsFilter = new ProjectsFilter();
    const projectsAnimations = new ProjectsAnimations();
    const smoothTransitions = new SmoothTransitions();
    const projectStats = new ProjectStats();
    const backToTopButton = new BackToTopButton();

    // Log de inicialização
    console.log('%c✅ Página de Projetos Carregada com Sucesso!',
        'color: #b74b4b; font-size: 16px; font-weight: bold;');
    console.log('%cFuncionalidades:', 'color: #e74c3c; font-weight: bold;');
    console.log('✨ Filtros de categorias');
    console.log('🎨 Animações suaves');
    console.log('📊 Estatísticas de projetos');
    console.log('⬆️ Botão voltar ao topo');
});

// ============================================================================
// EFEITO DE RIPPLE NOS BOTÕES DE FILTRO
// ============================================================================

const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

