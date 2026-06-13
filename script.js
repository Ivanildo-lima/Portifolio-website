// ============================================================================
// PORTFÓLIO INTERATIVO — Script Principal
// ============================================================================

const state = {
  mobileMenuOpen: false,
  scrollPosition: 0,
};

// ============================================================================
// 1. MENU RESPONSIVO
// ============================================================================

class MobileMenu {
  constructor() {
    this.nav = document.querySelector('nav');
    this.navLinks = document.querySelectorAll('nav a');
    this.hamburger = null;
    if (this.nav) this.init();
  }

  init() {
    this.createHamburger();
    this.attachEventListeners();
  }

  createHamburger() {
    const header = document.querySelector('header');
    if (!header) return;

    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Abrir menu');
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('tabindex', '0');
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    header.appendChild(hamburger);
    this.hamburger = hamburger;
  }

  attachEventListeners() {
    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.toggle());
      this.hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') this.toggle();
      });
    }

    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.close());
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('header') && state.mobileMenuOpen) this.close();
    });
  }

  toggle() {
    state.mobileMenuOpen ? this.close() : this.open();
  }

  open() {
    state.mobileMenuOpen = true;
    this.nav.classList.add('active');
    this.hamburger?.classList.add('active');
  }

  close() {
    state.mobileMenuOpen = false;
    this.nav.classList.remove('active');
    this.hamburger?.classList.remove('active');
  }
}

// ============================================================================
// 2. SMOOTH SCROLL
// ============================================================================

class SmoothScroll {
  constructor() {
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
}

// ============================================================================
// 3. HEADER SCROLL EFFECT
// ============================================================================

class HeaderScroll {
  constructor() {
    this.header = document.querySelector('header');
    if (this.header) {
      window.addEventListener('scroll', () => this.update(), { passive: true });
    }
  }

  update() {
    if (window.scrollY > 20) {
      this.header.style.borderBottomColor = 'rgba(234,179,8,0.15)';
    } else {
      this.header.style.borderBottomColor = '';
    }
  }
}

// ============================================================================
// 4. ANIMAÇÕES AO ROLAR (Intersection Observer)
// ============================================================================

class ScrollAnimations {
  constructor() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

    document.querySelectorAll('[data-animate]').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }
}

// ============================================================================
// 5. EFEITOS DE INTERAÇÃO
// ============================================================================

class InteractionEffects {
  constructor() {
    this.addRippleStyles();

    document.querySelectorAll('.btn, .social-icons a').forEach(btn => {
      btn.addEventListener('mouseenter', function () {
        this.style.boxShadow = '0 0 30px rgba(234,179,8,0.3)';
      });
      btn.addEventListener('mouseleave', function () {
        this.style.boxShadow = '';
      });
    });
  }

  addRippleStyles() {
    if (document.getElementById('ripple-styles')) return;
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.2);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
      }
      @keyframes ripple-animation {
        to { transform: scale(4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

// ============================================================================
// 6. PERFORMANCE — Lazy loading e reduced motion
// ============================================================================

class PerformanceOptimizer {
  constructor() {
    // Lazy load images with data-src
    if ('IntersectionObserver' in window) {
      const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) img.src = img.dataset.src;
            img.classList.add('loaded');
            imgObserver.unobserve(img);
          }
        });
      });
      document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
    }

    // Respeitar preferência por redução de movimento
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.scrollBehavior = 'auto';
    }
  }
}

// ============================================================================
// 7. BOTÃO VOLTAR AO TOPO
// ============================================================================

class BackToTop {
  constructor() {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.setAttribute('aria-label', 'Voltar ao topo');
    btn.style.cssText = `
      position:fixed; bottom:2.5rem; right:2.5rem;
      width:4rem; height:4rem;
      background:var(--accent); border:none; border-radius:50%;
      color:#08080f; font-size:1.4rem;
      cursor:pointer; z-index:999; display:none;
      align-items:center; justify-content:center;
      transition:all 0.25s ease;
      box-shadow:0 4px 20px rgba(234,179,8,0.25);
    `;
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      btn.style.display = window.scrollY > 400 ? 'flex' : 'none';
    }, { passive: true });

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    btn.addEventListener('mouseenter', () => btn.style.transform = 'translateY(-3px)');
    btn.addEventListener('mouseleave', () => btn.style.transform = '');
  }
}

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  new MobileMenu();
  new SmoothScroll();
  new HeaderScroll();
  new ScrollAnimations();
  new InteractionEffects();
  new PerformanceOptimizer();
  new BackToTop();

  console.log('%c✦ Portfólio — Ivanildo Lima', 'color:#eab308; font-size:14px; font-weight:bold;');
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 995) {
    const nav = document.querySelector('nav');
    const hamburger = document.querySelector('.hamburger');
    nav?.classList.remove('active');
    hamburger?.classList.remove('active');
    state.mobileMenuOpen = false;
  }
}, { passive: true });

window.addEventListener('scroll', () => {
  state.scrollPosition = window.scrollY;
}, { passive: true });