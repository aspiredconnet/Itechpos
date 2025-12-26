document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Number Counter Animation
    const stats = document.querySelectorAll('.number');
    let hasCounted = false;

    const countUp = (el) => {
        const target = +el.getAttribute('data-target');
        const count = +el.innerText;
        const increment = target / 100;

        if (count < target) {
            el.innerText = Math.ceil(count + increment);
            setTimeout(() => countUp(el), 20);
        } else {
            el.innerText = target;
        }
    };

    const runCounter = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                stats.forEach(stat => countUp(stat));
                hasCounted = true;
                observer.disconnect();
            }
        });
    };

    const observer = new IntersectionObserver(runCounter, {
        threshold: 0.5
    });

    const statSection = document.querySelector('.about-stat');
    if (statSection) {
        observer.observe(statSection);
    }

    // Scroll Fade In Animation
    const fadeElements = document.querySelectorAll('.feature-card, .testimonial-card, .about-content, .gallery-item');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        fadeObserver.observe(el);
    });

    // Form Submission Handling (Demo)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Sent!';
            btn.style.backgroundColor = '#10B981'; // Green color

            setTimeout(() => {
                contactForm.reset();
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
            }, 3000);

            alert('Thank you for your interest! We will contact you shortly.');
        });
    }
});
