// ========================================
// CUSTOM CURSOR
// ========================================

class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.cursorDot = document.querySelector('.cursor-dot');
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;

        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        this.animate();

        // Scale cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    animate() {
        // Smooth cursor following
        this.cursorX += (this.mouseX - this.cursorX) * 0.1;
        this.cursorY += (this.mouseY - this.cursorY) * 0.1;

        this.cursor.style.left = this.cursorX + 'px';
        this.cursor.style.top = this.cursorY + 'px';

        requestAnimationFrame(() => this.animate());
    }
}

// ========================================
// LOADER
// ========================================

class Loader {
    constructor() {
        this.loader = document.querySelector('.loader');
        this.counter = document.querySelector('.loader-counter');
        this.progress = 0;

        this.init();
    }

    init() {
        this.animateProgress();

        // Click to enter
        const loaderBtn = document.querySelector('.loader-btn');
        if (loaderBtn) {
            loaderBtn.addEventListener('click', () => {
                this.hide();
            });
        }

        // Auto hide after progress complete
        setTimeout(() => {
            if (this.loader.classList.contains('loaded')) return;
            this.hide();
        }, 3000);
    }

    animateProgress() {
        const interval = setInterval(() => {
            this.progress += Math.random() * 15;
            if (this.progress >= 100) {
                this.progress = 100;
                clearInterval(interval);
            }
            this.counter.textContent = Math.floor(this.progress);
        }, 100);
    }

    hide() {
        this.loader.classList.add('loaded');
        document.body.style.overflow = 'auto';
    }
}

// ========================================
// NAVIGATION
// ========================================

class Navigation {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.burger = document.querySelector('.nav-burger');
        this.menu = document.querySelector('.nav-menu');
        this.links = document.querySelectorAll('.nav-link');
        this.isOpen = false;
        this.lastScroll = 0;

        this.init();
    }

    init() {
        // Mobile menu toggle
        if (this.burger) {
            this.burger.addEventListener('click', () => {
                this.toggleMenu();
            });
        }

        // Close menu on link click
        this.links.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isOpen) {
                    this.toggleMenu();
                }
            });
        });

        // Hide/show nav on scroll
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > this.lastScroll && currentScroll > 100) {
                this.nav.style.transform = 'translateY(-100%)';
            } else {
                this.nav.style.transform = 'translateY(0)';
            }

            this.lastScroll = currentScroll;
        });
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.menu.classList.toggle('active');

        const openText = this.burger.querySelector('.nav-open');
        const closeText = this.burger.querySelector('.nav-close');

        if (this.isOpen) {
            openText.style.display = 'none';
            closeText.style.display = 'inline';
        } else {
            openText.style.display = 'inline';
            closeText.style.display = 'none';
        }
    }
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-scroll]');
        this.observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, this.observerOptions);

        this.elements.forEach(el => observer.observe(el));

        // Service items
        const serviceItems = document.querySelectorAll('.service-item');
        serviceItems.forEach(el => observer.observe(el));
    }
}

// ========================================
// PARALLAX EFFECTS
// ========================================

class ParallaxEffects {
    constructor() {
        this.heroHeadline = document.querySelector('.hero-headline');
        this.projectCards = document.querySelectorAll('.project-card');

        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            // Hero parallax
            if (this.heroHeadline) {
                const heroOffset = scrolled * 0.5;
                this.heroHeadline.style.transform = `translateY(${heroOffset}px)`;
            }

            // Project cards parallax
            this.projectCards.forEach((card, index) => {
                const cardTop = card.getBoundingClientRect().top;
                const cardVisible = cardTop < window.innerHeight;

                if (cardVisible) {
                    const offset = (window.innerHeight - cardTop) * 0.05;
                    card.style.transform = `translateY(${-offset}px)`;
                }
            });
        });
    }
}

// ========================================
// WEBGL CANVAS EFFECTS
// ========================================

class CanvasEffects {
    constructor() {
        this.heroCanvas = document.getElementById('heroCanvas');
        this.projectsCanvas = document.getElementById('projectsCanvas');

        if (this.heroCanvas) {
            this.initHeroCanvas();
        }

        if (this.projectsCanvas) {
            this.initProjectsCanvas();
        }
    }

    initHeroCanvas() {
        const ctx = this.heroCanvas.getContext('2d');
        this.heroCanvas.width = window.innerWidth;
        this.heroCanvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 50;

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * this.heroCanvas.width,
                y: Math.random() * this.heroCanvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, this.heroCanvas.width, this.heroCanvas.height);

            // Update and draw particles
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x < 0 || particle.x > this.heroCanvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > this.heroCanvas.height) particle.vy *= -1;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 107, 53, 0.3)';
                ctx.fill();
            });

            // Draw connections
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 107, 53, ${0.2 * (1 - distance / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();

        // Resize handler
        window.addEventListener('resize', () => {
            this.heroCanvas.width = window.innerWidth;
            this.heroCanvas.height = window.innerHeight;
        });
    }

    initProjectsCanvas() {
        const ctx = this.projectsCanvas.getContext('2d');
        this.projectsCanvas.width = window.innerWidth;
        this.projectsCanvas.height = document.querySelector('.projects').offsetHeight;

        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            const rect = this.projectsCanvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top + window.pageYOffset;
        });

        const animate = () => {
            ctx.clearRect(0, 0, this.projectsCanvas.width, this.projectsCanvas.height);

            // Draw gradient following mouse
            const gradient = ctx.createRadialGradient(
                mouseX, mouseY - window.pageYOffset, 0,
                mouseX, mouseY - window.pageYOffset, 300
            );
            gradient.addColorStop(0, 'rgba(255, 107, 53, 0.1)');
            gradient.addColorStop(1, 'transparent');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, this.projectsCanvas.width, this.projectsCanvas.height);

            requestAnimationFrame(animate);
        };

        animate();

        // Resize handler
        window.addEventListener('resize', () => {
            this.projectsCanvas.width = window.innerWidth;
            this.projectsCanvas.height = document.querySelector('.projects').offsetHeight;
        });
    }
}

// ========================================
// SMOOTH SCROLL
// ========================================

class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Scroll to section on link click
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));

                if (target) {
                    const offsetTop = target.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Scroll buttons
        const heroScrollBtn = document.querySelector('.hero-scroll-btn');
        const contactScrollTop = document.querySelector('.contact-scroll-top');

        if (heroScrollBtn) {
            heroScrollBtn.addEventListener('click', () => {
                const projects = document.querySelector('.projects');
                if (projects) {
                    window.scrollTo({
                        top: projects.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        }

        if (contactScrollTop) {
            contactScrollTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
}

// ========================================
// PROJECT CARDS HOVER EFFECTS
// ========================================

class ProjectCardEffects {
    constructor() {
        this.cards = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            const image = card.querySelector('.project-image-inner');

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                if (image) {
                    image.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                }
            });

            card.addEventListener('mouseleave', () => {
                if (image) {
                    image.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
                }
            });
        });
    }
}

// ========================================
// MAGNETIC BUTTONS
// ========================================

class MagneticButtons {
    constructor() {
        this.buttons = document.querySelectorAll('button, .nav-link, .contact-cta');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }
}

// ========================================
// TEXT REVEAL ANIMATIONS
// ========================================

class TextRevealAnimations {
    constructor() {
        this.headlines = document.querySelectorAll('.hero-headline, .projects-headline, .contact-headline');
        this.init();
    }

    init() {
        this.headlines.forEach(headline => {
            const text = headline.textContent;
            headline.innerHTML = '';

            const words = text.split(' ');
            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.textContent = word + ' ';
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(50px)';
                span.style.animation = `fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s forwards`;
                headline.appendChild(span);
            });
        });
    }
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));

        // Debounce scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = window.requestAnimationFrame(() => {
                // Scroll logic here
            });
        });
    }
}

// ========================================
// INITIALIZE ALL
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    new CustomCursor();
    new Loader();
    new Navigation();
    new ScrollAnimations();
    new ParallaxEffects();
    new CanvasEffects();
    new SmoothScroll();
    new ProjectCardEffects();
    new MagneticButtons();
    new TextRevealAnimations();
    new PerformanceOptimizer();

    // Add loaded class to body after initialization
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ========================================
// RESIZE HANDLER
// ========================================

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate dimensions on resize
        const canvases = document.querySelectorAll('canvas');
        canvases.forEach(canvas => {
            if (canvas.id === 'heroCanvas') {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        });
    }, 250);
});

// ========================================
// PREVENT FLASH OF UNSTYLED CONTENT
// ========================================

window.addEventListener('load', () => {
    document.body.style.visibility = 'visible';
});
