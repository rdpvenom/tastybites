document.addEventListener('DOMContentLoaded', () => {

    /* ---- Mobile Navigation ---- */
    const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.getElementById('navMenu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        navMenu.querySelectorAll('a').forEach(link =>
            link.addEventListener('click', () => {
                menuBtn.classList.remove('open');
                navMenu.classList.remove('open');
            })
        );

        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
                menuBtn.classList.remove('open');
                navMenu.classList.remove('open');
            }
        });
    }

    /* ---- Scroll Reveal ---- */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.recipe-card, .cat-tile, .hero-float').forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });

    const styles = document.createElement('style');
    styles.textContent = `.fade-up{opacity:0;transform:translateY(34px);transition:opacity .7s ease,transform .7s ease}.visible{opacity:1!important;transform:translateY(0)!important}`;
    document.head.appendChild(styles);

    /* ---- Header Shadow + Auto-hide ---- */
    const header = document.getElementById('header');
    if (header) {
        let lastY = 0;
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            header.style.boxShadow = y > 30 ? '0 2px 20px rgba(0,0,0,.06)' : 'none';
            header.style.transform = y > 500 && y > lastY ? 'translateY(-100%)' : 'translateY(0)';
            header.style.transition = 'transform .35s ease, box-shadow .3s ease';
            lastY = y;
        }, { passive: true });
    }

    /* ---- Smooth Scroll ---- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});