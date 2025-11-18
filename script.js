// ==================== ОСНОВНЫЕ АНИМАЦИИ ====================

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
    animateOnScroll();

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

// ==================== АДМИН-ПАНЕЛЬ С ПАРОЛЕМ ====================

const ADMIN_PASSWORD = "922334";
let adminPressTimer;

// Активация панели админа
document.addEventListener('DOMContentLoaded', function() {
    const secretTrigger = document.getElementById('secretTrigger');
    if (secretTrigger) {
        secretTrigger.addEventListener('mousedown', function() {
            adminPressTimer = setTimeout(showAdminLogin, 1000);
        });

        secretTrigger.addEventListener('mouseup', function() {
            clearTimeout(adminPressTimer);
        });

        secretTrigger.addEventListener('touchstart', function() {
            adminPressTimer = setTimeout(showAdminLogin, 1000);
        });

        secretTrigger.addEventListener('touchend', function() {
            clearTimeout(adminPressTimer);
        });
    }
});

function showAdminLogin() {
    document.getElementById('adminLogin').style.display = 'block';
    document.getElementById('adminPassword').focus();
}

function hideAdminLogin() {
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminPassword').value = '';
}

function checkAdminPassword() {
    const password = document.getElementById('adminPassword').value;
    
    if (password === ADMIN_PASSWORD) {
        hideAdminLogin();
        showAdminPanel();
    } else {
        alert('❌ Неверный пароль!');
        document.getElementById('adminPassword').value = '';
        document.getElementById('adminPassword').focus();
    }
}

function showAdminPanel() {
    loadAdminContent();
    document.getElementById('adminPanel').style.display = 'block';
}

function hideAdminPanel() {
    document.getElementById('adminPanel').style.display = 'none';
}

function loadAdminContent() {
    // Загружаем сохранённый контент или исходный
    document.getElementById('releasesContent').value = localStorage.getItem('malinovReleases') || getDefaultReleases();
    document.getElementById('plansContent').value = localStorage.getItem('malinovPlans') || getDefaultPlans();
    document.getElementById('socialContent').value = localStorage.getItem('malinovSocial') || getDefaultSocial();
}

function saveAdminChanges() {
    // Сохраняем изменения
    localStorage.setItem('malinovReleases', document.getElementById('releasesContent').value);
    localStorage.setItem('malinovPlans', document.getElementById('plansContent').value);
    localStorage.setItem('malinovSocial', document.getElementById('socialContent').value);
    
    // Показываем уведомление
    showNotification('✅ Изменения сохранены! Обнови страницы релизов/планов/соцсетей');
}

function resetAllContent() {
    if (confirm('Точно сбросить ВЕСЬ контент к исходному?')) {
        localStorage.removeItem('malinovReleases');
        localStorage.removeItem('malinovPlans');
        localStorage.removeItem('malinovSocial');
        loadAdminContent();
        showNotification('🔄 Контент сброшен к исходному');
    }
}

function showNotification(message) {
    // Удаляем старое уведомление если есть
    const oldNotification = document.querySelector('.admin-notification');
    if (oldNotification) {
        oldNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'admin-notification';
    notification.style.cssText = `
        position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
        background: var(--neon-blue); color: black; padding: 15px 25px;
        border-radius: 10px; z-index: 10000; font-weight: bold;
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 3000);
}

// Исходный контент по умолчанию
function getDefaultReleases() {
    return `<!-- Пример релиза -->
<div class="release-card">
    <div class="release-art">
        <div class="album-cover neon-album-1">
            <div class="album-title">NEON DREAMS</div>
        </div>
    </div>
    <div class="release-info">
        <h3>Neon Dreams</h3>
        <p class="release-date">Вышел 15 декабря 2024</p>
        <p class="release-desc">Экспериментальный синтвейв с элементами электроники</p>
        <div class="track-list">
            <div class="track">
                <span>1. Digital Sunrise</span>
                <audio controls>
                    <source src="assets/music/digital-sunrise.mp3" type="audio/mpeg">
                </audio>
            </div>
        </div>
    </div>
</div>`;
}

function getDefaultPlans() {
    return `<!-- Пример плана -->
<div class="timeline-item current">
    <div class="timeline-date">Февраль 2024</div>
    <div class="timeline-content">
        <h3>Новый EP "Digital Dreams"</h3>
        <p>Работа над новым мини-альбомом из 5 треков</p>
    </div>
</div>`;
}

function getDefaultSocial() {
    return `<!-- Пример соцсети -->
<a href="https://spotify.com" class="social-card spotify">
    <i class="fab fa-spotify"></i>
    <h3>Spotify</h3>
    <p>Слушай мои треки</p>
    <span class="social-handle">@malinovmusic</span>
</a>`;
}
