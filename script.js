// Interactive features for Sasurai-So website

document.addEventListener('DOMContentLoaded', function() {

    // Particle effect background
    createParticleBackground();

    // Enhanced room interactions
    const rooms = document.querySelectorAll('.room.active');

    rooms.forEach(room => {
        // Mouse tracking effect
        room.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });

        room.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });

        // Add ripple effect on click
        room.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });

    // Coming Soon rooms - enhanced notification
    const comingSoonRooms = document.querySelectorAll('.room.coming-soon');

    comingSoonRooms.forEach(room => {
        room.addEventListener('click', function(e) {
            e.preventDefault();

            // Create glitch effect notification
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.innerHTML = `
                <div class="glitch" data-text="準備中です">準備中です</div>
                <div style="margin-top: 10px; font-size: 0.9rem; font-family: 'Space Mono', monospace;">
                    もうしばらくお待ちください...
                </div>
            `;
            notification.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, rgba(176, 0, 255, 0.95), rgba(255, 0, 128, 0.95));
                color: white;
                padding: 30px 50px;
                border-radius: 16px;
                font-size: 1.4rem;
                z-index: 10000;
                text-align: center;
                box-shadow: 0 0 50px rgba(255, 0, 128, 0.8);
                animation: slideIn 0.5s ease forwards;
                border: 2px solid rgba(255, 255, 255, 0.3);
            `;

            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideOut 0.5s ease forwards';
                setTimeout(() => notification.remove(), 500);
            }, 2000);
        });
    });

    // Add enhanced animations CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translate(-50%, -60%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }

        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -40%);
            }
        }

        .glitch {
            position: relative;
            font-weight: bold;
            text-shadow: 0 0 10px #fff;
        }

        .glitch::before,
        .glitch::after {
            content: attr(data-text);
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }

        .glitch::before {
            left: 2px;
            text-shadow: -2px 0 #00ffff;
            animation: glitch-1 0.5s infinite;
        }

        .glitch::after {
            left: -2px;
            text-shadow: 2px 0 #ff00ff;
            animation: glitch-2 0.5s infinite;
        }

        @keyframes glitch-1 {
            0%, 100% { clip-path: inset(0 0 0 0); }
            20% { clip-path: inset(40% 0 30% 0); }
            40% { clip-path: inset(20% 0 60% 0); }
            60% { clip-path: inset(70% 0 10% 0); }
            80% { clip-path: inset(10% 0 70% 0); }
        }

        @keyframes glitch-2 {
            0%, 100% { clip-path: inset(0 0 0 0); }
            20% { clip-path: inset(60% 0 20% 0); }
            40% { clip-path: inset(30% 0 50% 0); }
            60% { clip-path: inset(10% 0 80% 0); }
            80% { clip-path: inset(50% 0 30% 0); }
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 255, 255, 0.6), transparent);
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

        .particle {
            position: fixed;
            width: 2px;
            height: 2px;
            background: #00ffff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 0;
            opacity: 0;
            animation: float 10s infinite;
        }

        @keyframes float {
            0% {
                transform: translateY(100vh) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 0.5;
            }
            90% {
                opacity: 0.5;
            }
            100% {
                transform: translateY(-100px) translateX(100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Create ripple effect
    function createRipple(e, element) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        element.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    // Particle background
    function createParticleBackground() {
        const particleCount = 30;
        const container = document.body;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            const startX = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = 10 + Math.random() * 10;
            const color = ['#00ffff', '#ff0080', '#b000ff'][Math.floor(Math.random() * 3)];

            particle.style.left = startX + '%';
            particle.style.animationDelay = delay + 's';
            particle.style.animationDuration = duration + 's';
            particle.style.background = color;
            particle.style.boxShadow = `0 0 10px ${color}`;

            container.appendChild(particle);
        }
    }

    // Enhanced scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('.about, .landlord, .entrance').forEach(el => {
        observer.observe(el);
    });

    // Header neon flicker effect enhancement
    const header = document.querySelector('header h1');
    if (header) {
        setInterval(() => {
            if (Math.random() > 0.95) {
                header.style.opacity = '0.8';
                setTimeout(() => {
                    header.style.opacity = '1';
                }, 50);
            }
        }, 100);
    }

    // Easter egg: Konami code activation
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(',') === konamiSequence.join(',')) {
            activateEasterEgg();
        }
    });

    function activateEasterEgg() {
        // Create matrix effect
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(0, 255, 255, 0.95), rgba(176, 0, 255, 0.95));
            color: #ffffff;
            padding: 40px 60px;
            border-radius: 20px;
            font-size: 1.8rem;
            z-index: 10000;
            text-align: center;
            box-shadow: 0 0 80px rgba(0, 255, 255, 1);
            font-weight: bold;
            border: 3px solid #fff;
            font-family: 'Orbitron', sans-serif;
        `;
        message.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 20px;">🎉</div>
            <div class="glitch" data-text="隠しコマンド発見！">隠しコマンド発見！</div>
            <div style="margin-top: 20px; font-size: 1.2rem; font-family: 'Space Mono', monospace;">
                あなたは正真正銘の<br>「さすらい人」です
            </div>
        `;

        document.body.appendChild(message);

        // Explosive animation
        const colors = ['#00ffff', '#ff0080', '#b000ff', '#00ff00', '#ffff00'];
        let colorIndex = 0;

        const colorInterval = setInterval(() => {
            message.style.boxShadow = `0 0 80px ${colors[colorIndex]}`;
            message.style.borderColor = colors[colorIndex];
            colorIndex = (colorIndex + 1) % colors.length;
        }, 200);

        setTimeout(() => {
            clearInterval(colorInterval);
            message.style.animation = 'slideOut 0.5s ease forwards';
            setTimeout(() => message.remove(), 500);
        }, 5000);
    }

    // Smooth scroll for internal links
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

    // Track visitor interaction
    function logInteraction(action, element) {
        console.log(`%c[さすらい荘] ${action}`, 'color: #00ffff; font-weight: bold;', element);
    }

    // Log room clicks
    document.querySelectorAll('.room').forEach(room => {
        room.addEventListener('click', function() {
            const roomName = this.querySelector('h3')?.textContent || 'Unknown';
            logInteraction('Room Click', roomName);
        });
    });

    // Cursor trail effect
    let cursorTrail = [];
    const trailLength = 20;

    document.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.8) {
            const trail = document.createElement('div');
            trail.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, #00ffff, transparent);
                border-radius: 50%;
                pointer-events: none;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                z-index: 9999;
                animation: fade-out 0.5s ease-out forwards;
            `;

            document.body.appendChild(trail);
            cursorTrail.push(trail);

            if (cursorTrail.length > trailLength) {
                const oldTrail = cursorTrail.shift();
                oldTrail.remove();
            }

            setTimeout(() => trail.remove(), 500);
        }
    });

    const fadeOutStyle = document.createElement('style');
    fadeOutStyle.textContent = `
        @keyframes fade-out {
            to {
                opacity: 0;
                transform: scale(0);
            }
        }
    `;
    document.head.appendChild(fadeOutStyle);

    // Welcome message in console
    console.log('%c🏠 さすらい荘へようこそ',
        'font-size: 24px; font-weight: bold; color: #00ffff; text-shadow: 0 0 10px #00ffff; font-family: Orbitron;');
    console.log('%c思考のアジトで、あなたも「さすらい人」に',
        'font-size: 16px; color: #ff0080; font-family: "Space Mono";');
    console.log('%cヒント: コナミコマンド (↑↑↓↓←→←→BA) を試してみてください...',
        'font-size: 12px; color: #b000ff; font-style: italic;');
    console.log('%c%s',
        'color: #00ffff; font-family: monospace;',
        `
    ╔═══════════════════════════════════════╗
    ║   Welcome to Sasurai-So            ║
    ║   Wandering Thoughts Community     ║
    ╚═══════════════════════════════════════╝
        `);
});
