// Анимации при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления элементов
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.release-card, .social-card, .timeline-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Установка начальных стилей для анимации
    const elementsToAnimate = document.querySelectorAll('.release-card, .social-card, .timeline-item');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Запуск анимации при скролле
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Запуск при загрузке

    // Эффект параллакса для фона
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.bg-animation');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Интерактивные неоновые эффекты
    const interactiveElements = document.querySelectorAll('.nav-link, .quick-link, .social-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(255, 0, 255, 0.6)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    // Анимация для кнопки скачивания
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('mouseenter', function() {
            const glow = this.querySelector('.download-glow');
            glow.style.left = '100%';
        });
    }

    // Случайное мерцание неоновых элементов
    setInterval(() => {
        const neonElements = document.querySelectorAll('.neon-text, .neon-main');
        neonElements.forEach(element => {
            element.style.textShadow = `0 0 ${10 + Math.random() * 20}px rgba(255, 0, 255, ${0.5 + Math.random() * 0.5})`;
        });
    }, 2000);
});

// Предзагрузка важных ресурсов
window.addEventListener('load', function() {
    // Добавление плавного скролла для навигационных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});