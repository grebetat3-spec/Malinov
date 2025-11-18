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

// ==================== АДМИН-ПАНЕЛЬ С ПРОСТЫМ УПРАВЛЕНИЕМ ====================

const ADMIN_PASSWORD = "922334";
let adminPressTimer;

// Данные контента
let contentData = {
    releases: [],
    plans: [],
    social: []
};

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    loadContentData();
    setupAdminPanel();
});

function setupAdminPanel() {
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
}

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
    document.getElementById('adminPanel').style.display = 'block';
}

function hideAdminPanel() {
    document.getElementById('adminPanel').style.display = 'none';
}

// ==================== УПРАВЛЕНИЕ РЕЛИЗАМИ ====================

function addNewRelease() {
    const title = document.getElementById('albumTitle').value.trim();
    const date = document.getElementById('albumDate').value.trim();
    const description = document.getElementById('albumDescription').value.trim();
    
    if (!title || !date || !description) {
        alert('❌ Заполните все поля!');
        return;
    }
    
    const newRelease = {
        id: Date.now(),
        title: title,
        date: date,
        description: description
    };
    
    contentData.releases.push(newRelease);
    clearReleaseForm();
    showNotification('✅ Релиз добавлен! Сохраните изменения.');
}

function clearReleaseForm() {
    document.getElementById('albumTitle').value = '';
    document.getElementById('albumDate').value = '';
    document.getElementById('albumDescription').value = '';
}

// ==================== УПРАВЛЕНИЕ ПЛАНАМИ ====================

function addNewPlan() {
    const date = document.getElementById('planDate').value.trim();
    const title = document.getElementById('planTitle').value.trim();
    const description = document.getElementById('planDescription').value.trim();
    const status = document.getElementById('planStatus').value;
    
    if (!date || !title || !description) {
        alert('❌ Заполните все поля!');
        return;
    }
    
    const newPlan = {
        id: Date.now(),
        date: date,
        title: title,
        description: description,
        status: status
    };
    
    contentData.plans.push(newPlan);
    clearPlanForm();
    showNotification('✅ План добавлен! Сохраните изменения.');
}

function clearPlanForm() {
    document.getElementById('planDate').value = '';
    document.getElementById('planTitle').value = '';
    document.getElementById('planDescription').value = '';
    document.getElementById('planStatus').value = 'upcoming';
}

// ==================== УПРАВЛЕНИЕ СОЦСЕТЯМИ ====================

function addNewSocial() {
    const platform = document.getElementById('socialPlatform').value;
    const link = document.getElementById('socialLink').value.trim();
    const description = document.getElementById('socialDescription').value.trim();
    const username = document.getElementById('socialUsername').value.trim();
    
    if (!link || !description || !username) {
        alert('❌ Заполните все поля!');
        return;
    }
    
    const newSocial = {
        id: Date.now(),
        platform: platform,
        link: link,
        description: description,
        username: username
    };
    
    contentData.social.push(newSocial);
    clearSocialForm();
    showNotification('✅ Соцсеть добавлена! Сохраните изменения.');
}

function clearSocialForm() {
    document.getElementById('socialLink').value = '';
    document.getElementById('socialDescription').value = '';
    document.getElementById('socialUsername').value = '';
}

// ==================== СОХРАНЕНИЕ И ЗАГРУЗКА ДАННЫХ ====================

function saveAllChanges() {
    localStorage.setItem('malinovContent', JSON.stringify(contentData));
    showNotification('✅ Все изменения сохранены! Обновите страницы.');
    
    // Принудительно обновляем все страницы
    updateAllPages();
}

function loadContentData() {
    const savedData = localStorage.getItem('malinovContent');
    if (savedData) {
        try {
            contentData = JSON.parse(savedData);
        } catch (e) {
            console.error('Ошибка загрузки данных:', e);
            loadDefaultContent();
        }
    } else {
        loadDefaultContent();
    }
}

function clearAllContent() {
    if (confirm('❌ ТОЧНО ОЧИСТИТЬ ВЕСЬ КОНТЕНТ? Это нельзя отменить!')) {
        contentData = { releases: [], plans: [], social: [] };
        localStorage.removeItem('malinovContent');
        showNotification('🗑️ Весь контент очищен!');
        updateAllPages();
    }
}

function loadDefaultContent() {
    contentData = {
        releases: [
            {
                id: 1,
                title: "Neon Dreams",
                date: "Вышел 15 декабря 2024",
                description: "Экспериментальный синтвейв с элементами электроники"
            }
        ],
        plans: [
            {
                id: 1,
                date: "Февраль 2024",
                title: "Новый EP 'Digital Dreams'",
                description: "Работа над новым мини-альбомом из 5 треков",
                status: "current"
            }
        ],
        social: [
            {
                id: 1,
                platform: "spotify",
                link: "https://spotify.com",
                description: "Слушай мои треки",
                username: "@malinovmusic"
            }
        ]
    };
    showNotification('🔄 Загружены примеры контента! Сохраните изменения.');
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

// ==================== ФУНКЦИИ ДЛЯ СТРАНИЦ ====================

function renderReleases(container) {
    if (!container) return;
    
    if (!contentData.releases || contentData.releases.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #ccc; padding: 40px;">Пока нет релизов. Добавьте их через админ-панель!</p>';
        return;
    }
    
    container.innerHTML = contentData.releases.map(release => `
        <div class="release-card">
            <div class="release-art">
                <div class="album-cover neon-album-1">
                    <div class="album-title">${release.title.toUpperCase().substring(0, 10)}</div>
                </div>
            </div>
            <div class="release-info">
                <h3>${release.title}</h3>
                <p class="release-date">${release.date}</p>
                <p class="release-desc">${release.description}</p>
                <div class="track-list">
                    <div class="track">
                        <span>Трек 1</span>
                        <audio controls>
                            <source src="assets/music/track1.mp3" type="audio/mpeg">
                            Ваш браузер не поддерживает аудио
                        </audio>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderPlans(container) {
    if (!container) return;
    
    if (!contentData.plans || contentData.plans.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #ccc; padding: 40px;">Пока нет планов. Добавьте их через админ-панель!</p>';
        return;
    }
    
    container.innerHTML = contentData.plans.map(plan => `
        <div class="timeline-item ${plan.status}">
            <div class="timeline-date">${plan.date}</div>
            <div class="timeline-content">
                <h3>${plan.title}</h3>
                <p>${plan.description}</p>
            </div>
        </div>
    `).join('');
}

function renderSocial(container) {
    if (!container) return;
    
    if (!contentData.social || contentData.social.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #ccc; padding: 40px;">Пока нет соцсетей. Добавьте их через админ-панель!</p>';
        return;
    }
    
    const platformIcons = {
        spotify: 'fab fa-spotify',
        youtube: 'fab fa-youtube',
        instagram: 'fab fa-instagram',
        telegram: 'fab fa-telegram',
        soundcloud: 'fab fa-soundcloud',
        email: 'fas fa-envelope'
    };
    
    const platformColors = {
        spotify: '#1DB954',
        youtube: '#FF0000',
        instagram: '#E4405F',
        telegram: '#0088cc',
        soundcloud: '#ff7700',
        email: '#4ecdc4'
    };
    
    container.innerHTML = contentData.social.map(social => `
        <a href="${social.link}" class="social-card" target="_blank" style="border-color: ${platformColors[social.platform] || '#4ecdc4'};">
            <i class="${platformIcons[social.platform] || 'fas fa-link'}"></i>
            <h3>${getPlatformName(social.platform)}</h3>
            <p>${social.description}</p>
            <span class="social-handle">${social.username}</span>
        </a>
    `).join('');
}

function getPlatformName(platform) {
    const names = {
        spotify: 'Spotify',
        youtube: 'YouTube',
        instagram: 'Instagram',
        telegram: 'Telegram',
        soundcloud: 'SoundCloud',
        email: 'Email'
    };
    return names[platform] || platform;
}

// ==================== ОБНОВЛЕНИЕ ВСЕХ СТРАНИЦ ====================

function updateAllPages() {
    // Обновляем текущую страницу
    const releasesContainer = document.getElementById('releasesContainer');
    const plansContainer = document.getElementById('plansContainer');
    const socialContainer = document.getElementById('socialContainer');
    
    if (releasesContainer) renderReleases(releasesContainer);
    if (plansContainer) renderPlans(plansContainer);
    if (socialContainer) renderSocial(socialContainer);
}

// ==================== ГЛОБАЛЬНЫЕ ФУНКЦИИ ДЛЯ ВСЕХ СТРАНИЦ ====================

// Делаем функции глобальными для доступа со всех страниц
window.renderReleases = renderReleases;
window.renderPlans = renderPlans;
window.renderSocial = renderSocial;
window.updateAllPages = updateAllPages;
