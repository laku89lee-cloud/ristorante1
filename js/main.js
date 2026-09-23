// ============================================
// RISTORANTE PREMIUM - MAIN JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // --- Menu Tabs Active State ---
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    if (menuTabs.length > 0 && menuCategories.length > 0) {
        // Update active tab on scroll
        window.addEventListener('scroll', () => {
            let current = '';
            
            menuCategories.forEach(category => {
                const categoryTop = category.offsetTop - 200;
                const categoryHeight = category.offsetHeight;
                
                if (window.scrollY >= categoryTop && window.scrollY < categoryTop + categoryHeight) {
                    current = category.getAttribute('id');
                }
            });
            
            menuTabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.getAttribute('href') === `#${current}`) {
                    tab.classList.add('active');
                }
            });
        });
        
        // Click on tab scrolls to section
        menuTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = tab.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const offsetTop = target.offsetTop - 150;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // --- Reservation Form Handler ---
    const reservationForm = document.getElementById('reservation-form');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(reservationForm);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            const requiredFields = ['name', 'email', 'phone', 'date', 'time', 'guests'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!data[field] || data[field].trim() === '') {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Show success message
                alert('Grazie! La tua richiesta di prenotazione è stata inviata. Riceverai una email di conferma entro 24 ore.');
                reservationForm.reset();
                
                // Here you would typically send the data to a server
                console.log('Reservation data:', data);
            } else {
                alert('Per favore, compila tutti i campi obbligatori.');
            }
        });
        
        // Set minimum date to today
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
    }
    
    // --- Contact Form Handler ---
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            const requiredFields = ['name', 'email', 'subject', 'message'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!data[field] || data[field].trim() === '') {
                    isValid = false;
                }
            });
            
            if (isValid) {
                alert('Grazie per il tuo messaggio! Ti risponderemo entro 24 ore.');
                contactForm.reset();
                
                console.log('Contact form data:', data);
            } else {
                alert('Per favore, compila tutti i campi obbligatori.');
            }
        });
    }
    
    // --- Intersection Observer for Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
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
    
    // Observe elements for animation
    document.querySelectorAll('.menu-card, .testimonial-card, .feature, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // --- Dynamic Year in Footer ---
    const yearElements = document.querySelectorAll('.footer-bottom p');
    yearElements.forEach(el => {
        el.innerHTML = el.innerHTML.replace('2025', new Date().getFullYear());
    });
    
    // --- Parallax Effect for Hero ---
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
            }
        });
    }
    
    console.log('Ristorante Premium - Website Loaded Successfully! 🍽️');
});