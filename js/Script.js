/**
 * Illustra - Interaction & Animation Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect & Progress
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scrollProgress');

    window.addEventListener('scroll', () => {
        // Background change
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // 3. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                navLinks.classList.remove('active'); // Close mobile menu if open
                if (mobileToggle) {
                    mobileToggle.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Reveal Animations on Scroll (Intersection Observer)
    const revealElements = document.querySelectorAll('section, .service-card, .portfolio-item, .bento-item, .process-card, .pricing-card, .pricing-card-modern, .pricing-card-minimal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal-init'); // Add initial state
        revealObserver.observe(el);
    });

    // 5. Stats Counter Animation
    const stats = document.querySelectorAll('.stat-item h3');
    
    const animateCounter = (el) => {
        const target = parseInt(el.innerText);
        const suffix = el.innerText.replace(/[0-9]/g, '');
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps

        const updateCount = () => {
            count += increment;
            if (count < target) {
                el.innerText = Math.ceil(count) + suffix;
                requestAnimationFrame(updateCount);
            } else {
                el.innerText = target + suffix;
            }
        };
        updateCount();
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 1 });

    stats.forEach(stat => statsObserver.observe(stat));

    // 6. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 7. Accordion Toggle
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all other items (optional, but cleaner)
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 8. Testimonial Carousel
    const carousel = document.getElementById('testimonialCarousel');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');

    if (carousel && prevBtn && nextBtn) {
        const scrollAmount = () => {
            const card = carousel.querySelector('.testimonial-card');
            return card.offsetWidth + 24; // Card width + gap
        };

        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: scrollAmount(),
                behavior: 'smooth'
            });
        });

        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: -scrollAmount(),
                behavior: 'smooth'
            });
        });
    }

    console.log('Illustra Logic & Animations Initialized');
});