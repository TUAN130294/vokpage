// VOK Landing Page - Interactive Scripts

// Navbar scroll effect
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.style.background = 'rgba(10, 10, 15, 0.95)';
        nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        nav.style.background = 'rgba(10, 10, 15, 0.8)';
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Generate floating particles
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = 15 + Math.random() * 10 + 's';
        particle.style.width = 2 + Math.random() * 4 + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

// Copy code functionality
function copyCode(button) {
    const codeBlock = button.parentElement.querySelector('code');
    const text = codeBlock.innerText;

    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.innerText;
        button.innerText = 'Copied!';
        button.style.background = '#22c55e';
        button.style.color = 'white';

        setTimeout(() => {
            button.innerText = originalText;
            button.style.background = '';
            button.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        button.innerText = 'Failed';
        setTimeout(() => {
            button.innerText = 'Copy';
        }, 2000);
    });
}

// Typing animation for terminal
const typingElements = document.querySelectorAll('.typing');
typingElements.forEach((el, index) => {
    const text = el.innerText;
    el.innerText = '';
    el.style.borderRight = '2px solid var(--color-primary)';

    let charIndex = 0;
    const typeInterval = setInterval(() => {
        if (charIndex < text.length) {
            el.innerText += text[charIndex];
            charIndex++;
        } else {
            clearInterval(typeInterval);
            el.style.borderRight = 'none';
        }
    }, 50);
});

// Smooth scroll for anchor links
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

// Intersection Observer for animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
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

// Apply to feature cards, agent cards, etc.
document.querySelectorAll('.feature-card, .agent-card, .install-step, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Stats counter animation
const statValues = document.querySelectorAll('.stat-value');
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        let value = Math.floor(progress * (end - start) + start);

        if (element.innerText.includes('+')) {
            element.innerText = value + '+';
        } else if (element.innerText.includes('%')) {
            element.innerText = value + '%';
        } else {
            element.innerText = value;
        }

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statValues.forEach(stat => {
                const finalValue = parseInt(stat.innerText);
                if (!isNaN(finalValue)) {
                    const hasSuffix = stat.innerText.includes('+') || stat.innerText.includes('%');
                    animateValue(stat, 0, finalValue, 1500);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Terminal output animation
const terminalOutputs = document.querySelectorAll('.terminal-output');
terminalOutputs.forEach((output, index) => {
    output.style.opacity = '0';
    output.style.transform = 'translateX(-10px)';

    setTimeout(() => {
        output.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        output.style.opacity = '1';
        output.style.transform = 'translateX(0)';
    }, 2000 + (index * 500));
});

// Add hover effect to cards
document.querySelectorAll('.feature-card, .agent-card, .pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.borderColor = '#ff6b4a';
    });

    card.addEventListener('mouseleave', function () {
        if (!this.classList.contains('vok')) {
            this.style.borderColor = '';
        }
    });
});

// Mobile menu toggle (placeholder - add hamburger menu if needed)
const createMobileMenu = () => {
    const nav = document.querySelector('.nav-container');
    const links = document.querySelector('.nav-links');

    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    hamburger.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: white;
        cursor: pointer;
    `;

    if (window.innerWidth <= 768) {
        hamburger.style.display = 'block';
    }

    hamburger.addEventListener('click', () => {
        links.classList.toggle('mobile-open');
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            hamburger.style.display = 'block';
        } else {
            hamburger.style.display = 'none';
            links.classList.remove('mobile-open');
        }
    });
};

// Initialize mobile menu
createMobileMenu();

// Console welcome message
console.log('%c⚡ VOK - Vibecode Omni Kit', 'color: #ff6b4a; font-size: 24px; font-weight: bold;');
console.log('%cSmart AI Router for Developers', 'color: #a0a0b0; font-size: 14px;');
console.log('%cGitHub: https://github.com/TUAN130294/vok', 'color: #3b82f6; font-size: 12px;');
