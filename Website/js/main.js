/* ========================================
   MAIN JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    /* ========================================
       HEADER SCROLL EFFECT
       ======================================== */
    const header = document.getElementById('mainHeader');
    const headerLogo = document.querySelector('.header-logo img');
    const whiteLogo = 'images/logo/Crisp-interiors-logo-trans-whitetext.png';
    const darkLogo = 'images/logo/Crisp-interiors-logo-trans.png';
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('head-pinned');
            headerLogo.src = darkLogo;
        } else {
            header.classList.remove('head-pinned');
            headerLogo.src = whiteLogo;
        }
    });
    
    // Also check initial state
    if (window.scrollY > 50) {
        headerLogo.src = darkLogo;
    }
    
    
    /* ========================================
       SCROLL INDICATOR
       ======================================== */
    var scrollIndicator = document.getElementById('scrollIndicator');
    var footer = document.querySelector('.footer');
    var sections = ['about', 'developments', 'team', 'services', 'testimonials', 'contact'];
    var sectionIndex = 0;
    
    if (scrollIndicator) {
        scrollIndicator.style.zIndex = '9999';
        scrollIndicator.onclick = function() {
            var target = document.getElementById(sections[sectionIndex]);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            sectionIndex++;
            if (sectionIndex >= sections.length) {
                sectionIndex = 0;
            }
        };
    }
    
    if (footer && scrollIndicator) {
        window.addEventListener('scroll', function() {
            var footerRect = footer.getBoundingClientRect();
            if (footerRect.top < window.innerHeight + 100) {
                scrollIndicator.classList.add('hidden');
            } else {
                scrollIndicator.classList.remove('hidden');
            }
        });
    }
    
    
    /* ========================================
       MOBILE MENU TOGGLE
       ======================================== */
    const burger = document.getElementById('burger');
    const asideMenu = document.getElementById('asideMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    if (burger) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('open');
            asideMenu.classList.toggle('open');
            menuOverlay.classList.toggle('open');
            document.body.classList.toggle('stop-scrolling');
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', () => {
            burger && burger.classList.remove('open');
            asideMenu.classList.remove('open');
            menuOverlay.classList.remove('open');
            document.body.classList.remove('stop-scrolling');
        });
    }

    const menuClose = document.getElementById('menuClose');
    if (menuClose) {
        menuClose.addEventListener('click', () => {
            burger && burger.classList.remove('open');
            asideMenu.classList.remove('open');
            menuOverlay.classList.remove('open');
            document.body.classList.remove('stop-scrolling');
        });
    }
    
    // Handle menu toggle click directly on the toggle span
    asideMenu.querySelectorAll('.menu-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const link = toggle.closest('.menu-link');
            const menuItem = link.closest('.menu-item');
            const subMenus = menuItem.querySelectorAll('.sub-menu');
            
            if (menuItem.classList.contains('menu-open')) {
                menuItem.classList.remove('menu-open');
                subMenus.forEach(sm => sm.classList.remove('open'));
                toggle.textContent = '+';
            } else {
                menuItem.classList.add('menu-open');
                subMenus.forEach(sm => sm.classList.add('open'));
                toggle.textContent = '−';
            }
        });
    });
    
    // Close menu when clicking a link (but not when toggling sub-menus)
    asideMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            // Don't close menu if clicking on menu toggle
            if (link.querySelector('.menu-toggle')) {
                return;
            }
            
            burger.classList.remove('open');
            asideMenu.classList.remove('open');
            menuOverlay.classList.remove('open');
            document.body.classList.remove('stop-scrolling');
        });
    });
    
    
    const devFilterBtns = document.querySelectorAll('.development-filters__btn');
    const devCards = document.querySelectorAll('.development-card');

    // Set default filter to "completed"
    const defaultFilter = 'completed';
    devFilterBtns.forEach(btn => {
        if (btn.dataset.filter === defaultFilter) {
            btn.classList.add('development-filters__btn--active');
        } else {
            btn.classList.remove('development-filters__btn--active');
        }
    });
    devCards.forEach(card => {
        const status = card.dataset.status;
        if (status === defaultFilter) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });

    devFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            devFilterBtns.forEach(b => b.classList.remove('development-filters__btn--active'));
            btn.classList.add('development-filters__btn--active');

            devCards.forEach(card => {
                const status = card.dataset.status;

                if (filter === 'all' || status === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    
    /* ========================================
       HERO TITLE GRADIENT ANIMATION
       ======================================== */
    const titleSpans = document.querySelectorAll('.hero-title span');
    
    gsap.set(titleSpans, { '--stop-hover': '0%' });
    
    const customEase = CustomEase.create("custom", "M0,0 C0.548,0.032 0.63,1 1,1 ");
    
    titleSpans.forEach(span => {
        span.addEventListener('mouseenter', function() {
            gsap.to(this, {
                '--stop-hover': '100%',
                ease: customEase,
                duration: 0.8
            });
        });
        
        span.addEventListener('mouseleave', function() {
            gsap.to(this, {
                '--stop-hover': '0%',
                ease: customEase,
                duration: 0.8
            });
        });
    });
    
    
    /* ========================================
       TESTIMONIALS SLIDER
       ======================================== */
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    if (testimonialsSlider && typeof Swiper !== 'undefined') {
        new Swiper('.testimonials-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            loop: true,
        });
    }
    
    
    /* ========================================
       SCROLL ANIMATIONS
       ======================================== */
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.about-section, .developments-section, .about-team-section, .services-section, .testimonials-section, .contact-section').forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });
    
    const form = document.getElementById('form');
    if (form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            formData.append("access_key", "eeb251dc-95fd-4c37-b43d-c0d07d0edcd5");

            const originalText = submitBtn.textContent;

            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData,
                    redirect: "manual"
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Success! Your message has been sent.");
                    form.reset();
                } else {
                    alert("Error: " + data.message);
                }

            } catch (error) {
                alert("Something went wrong. Please try again.");
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

});

