/* ============================================================================
   PÁGINA DE CONTATO - INTERATIVIDADE
   ============================================================================ */

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.phoneInput = document.getElementById('phone');
        this.subjectInput = document.getElementById('subject');
        this.messageInput = document.getElementById('message');
        this.privacyCheckbox = document.getElementById('privacy');
        this.formMessage = document.getElementById('formMessage');

        this.init();
    }

    init() {
        // Event listeners
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.nameInput.addEventListener('blur', () => this.validateName());
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.subjectInput.addEventListener('blur', () => this.validateSubject());
        this.messageInput.addEventListener('blur', () => this.validateMessage());

        // Real-time validation
        this.nameInput.addEventListener('input', () => this.validateName());
        this.emailInput.addEventListener('input', () => this.validateEmail());
        this.subjectInput.addEventListener('change', () => this.validateSubject());
        this.messageInput.addEventListener('input', () => this.validateMessage());
    }

    validateName() {
        const value = this.nameInput.value.trim();
        const errorEl = document.getElementById('nameError');
        const formGroup = this.nameInput.parentElement;

        if (!value) {
            this.showError(formGroup, errorEl, 'Nome é obrigatório');
            return false;
        }

        if (value.length < 3) {
            this.showError(formGroup, errorEl, 'Nome deve ter pelo menos 3 caracteres');
            return false;
        }

        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) {
            this.showError(formGroup, errorEl, 'Nome deve conter apenas letras');
            return false;
        }

        this.clearError(formGroup, errorEl);
        return true;
    }

    validateEmail() {
        const value = this.emailInput.value.trim();
        const errorEl = document.getElementById('emailError');
        const formGroup = this.emailInput.parentElement;

        if (!value) {
            this.showError(formGroup, errorEl, 'Email é obrigatório');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            this.showError(formGroup, errorEl, 'Email inválido');
            return false;
        }

        this.clearError(formGroup, errorEl);
        return true;
    }

    validateSubject() {
        const value = this.subjectInput.value.trim();
        const errorEl = document.getElementById('subjectError');
        const formGroup = this.subjectInput.parentElement;

        if (!value) {
            this.showError(formGroup, errorEl, 'Selecione um assunto');
            return false;
        }

        this.clearError(formGroup, errorEl);
        return true;
    }

    validateMessage() {
        const value = this.messageInput.value.trim();
        const errorEl = document.getElementById('messageError');
        const formGroup = this.messageInput.parentElement;

        if (!value) {
            this.showError(formGroup, errorEl, 'Mensagem é obrigatória');
            return false;
        }

        if (value.length < 10) {
            this.showError(formGroup, errorEl, 'Mensagem deve ter pelo menos 10 caracteres');
            return false;
        }

        if (value.length > 1000) {
            this.showError(formGroup, errorEl, 'Mensagem não pode ter mais de 1000 caracteres');
            return false;
        }

        this.clearError(formGroup, errorEl);
        return true;
    }

    showError(formGroup, errorEl, message) {
        formGroup.classList.add('error');
        errorEl.textContent = message;
        errorEl.classList.add('show');
    }

    clearError(formGroup, errorEl) {
        formGroup.classList.remove('error');
        errorEl.textContent = '';
        errorEl.classList.remove('show');
    }

    handleSubmit(e) {
        e.preventDefault();

        // Validate all fields
        const isNameValid = this.validateName();
        const isEmailValid = this.validateEmail();
        const isSubjectValid = this.validateSubject();
        const isMessageValid = this.validateMessage();

        // Check privacy checkbox
        if (!this.privacyCheckbox.checked) {
            this.showFormMessage('Por favor, concorde com a política de privacidade', 'error');
            return;
        }

        if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
            this.showFormMessage('Por favor, corrija os erros acima', 'error');
            return;
        }

        // Prepare form data
        const formData = {
            name: this.nameInput.value.trim(),
            email: this.emailInput.value.trim(),
            phone: this.phoneInput.value.trim(),
            subject: this.subjectInput.value,
            message: this.messageInput.value.trim(),
            timestamp: new Date().toISOString()
        };

        // Simulate sending (in production, would send to backend)
        this.sendForm(formData);
    }

    sendForm(formData) {
        // Disable submit button
        const submitBtn = this.form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        // Simulate API call
        setTimeout(() => {
            // In a real scenario, this would send to a backend
            console.log('Formulário enviado:', formData);

            // Save to localStorage for demo
            const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            messages.push(formData);
            localStorage.setItem('contactMessages', JSON.stringify(messages));

            // Show success message
            this.showFormMessage(
                '✓ Mensagem enviada com sucesso! Entraremos em contato em breve.',
                'success'
            );

            // Reset form
            this.form.reset();

            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;

            // Clear success message after 5 seconds
            setTimeout(() => {
                this.clearFormMessage();
            }, 5000);
        }, 1500);
    }

    showFormMessage(message, type) {
        this.formMessage.textContent = message;
        this.formMessage.className = `form-message show ${type}`;
    }

    clearFormMessage() {
        this.formMessage.classList.remove('show');
        this.formMessage.textContent = '';
    }
}

/* ===== PHONE INPUT FORMATTER ===== */
class PhoneFormatter {
    constructor() {
        this.phoneInput = document.getElementById('phone');
        if (this.phoneInput) {
            this.phoneInput.addEventListener('input', (e) => this.formatPhone(e));
        }
    }

    formatPhone(e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 11) {
            value = value.slice(0, 11);
        }

        if (value.length === 0) {
            e.target.value = '';
        } else if (value.length <= 2) {
            e.target.value = `(${value}`;
        } else if (value.length <= 7) {
            e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else {
            e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        }
    }
}

/* ===== SCROLL ANIMATIONS ===== */
class ContactAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.observerOptions
        );

        this.init();
    }

    init() {
        // Observe contact cards
        const cards = document.querySelectorAll('.info-card, .contact-form');
        cards.forEach(card => this.observer.observe(card));
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }
}

/* ===== MESSAGE COUNTER ===== */
class MessageCounter {
    constructor() {
        this.messageInput = document.getElementById('message');
        if (this.messageInput) {
            this.init();
        }
    }

    init() {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            text-align: right;
            color: #888;
            font-size: 0.8rem;
            margin-top: 0.3rem;
        `;

        this.messageInput.parentElement.appendChild(counter);

        this.messageInput.addEventListener('input', () => {
            const length = this.messageInput.value.length;
            const remaining = 1000 - length;
            counter.textContent = `${length}/1000 caracteres`;

            if (length > 900) {
                counter.style.color = '#e74c3c';
            } else if (length > 700) {
                counter.style.color = '#f39c12';
            } else {
                counter.style.color = '#888';
            }
        });
    }
}

/* ===== BACK TO TOP BUTTON ===== */
class BackToTopButton {
    constructor() {
        this.button = document.querySelector('.back-to-top');
        if (!this.button) {
            this.createButton();
        }
        this.init();
    }

    createButton() {
        this.button = document.createElement('button');
        this.button.className = 'back-to-top';
        this.button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        this.button.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 3.5rem;
            height: 3.5rem;
            background: linear-gradient(135deg, #b74b4b, #e74c3c);
            border: none;
            border-radius: 50%;
            color: white;
            cursor: pointer;
            z-index: 1000;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(183, 75, 75, 0.3);
        `;

        document.body.appendChild(this.button);
    }

    init() {
        window.addEventListener('scroll', () => this.toggleButton());
        this.button.addEventListener('click', () => this.scrollToTop());
    }

    toggleButton() {
        if (window.scrollY > 300) {
            this.button.style.display = 'flex';
        } else {
            this.button.style.display = 'none';
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

/* ===== INICIALIZAR TUDO ===== */
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
    new PhoneFormatter();
    new ContactAnimations();
    new MessageCounter();
    new BackToTopButton();

    console.log('✓ Contact page loaded successfully');
});
