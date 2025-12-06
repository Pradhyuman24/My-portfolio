document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Dark Mode Logic ---
    const themeToggleBtns = document.querySelectorAll('#theme-toggle, #mobile-theme-toggle');
    const html = document.documentElement;

    // Initialize Theme
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    // Toggle Function
    const toggleTheme = () => {
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.theme = 'light';
        } else {
            html.classList.add('dark');
            localStorage.theme = 'dark';
        }
    };

    themeToggleBtns.forEach(btn => btn.addEventListener('click', toggleTheme));


    // --- 2. Mobile Menu Logic ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = menuBtn.querySelector('i');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Toggle Icon
            if(mobileMenu.classList.contains('hidden')){
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            } else {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            }
        });

        // Close menu when link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            });
        });
    }


    // --- 3. Scroll Progress Bar ---
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrolled + "%";
    });


    // --- 4. Intersection Observer (Scroll Animations) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-on-scroll').forEach(el => observer.observe(el));


    // --- 5. Typewriter Effect ---
    const typeWriterElement = document.getElementById('typewriter');
    const phrases = ["B.Tech Student", "AI Enthusiast", "Web Developer", "Problem Solver"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typeWriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Deleting is faster
        } else {
            typeWriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Typing speed
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    if(typeWriterElement) type();


    // --- 6. Contact Form Simulation (Robust) ---
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const resetBtn = document.getElementById('reset-form-btn');
    const submitBtn = document.getElementById('submit-btn');
    const submitBtnText = submitBtn ? submitBtn.querySelector('span') : null;

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Loading State
            if(submitBtn) {
                submitBtn.disabled = true;
                submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
                if(submitBtnText) submitBtnText.textContent = "Sending...";
            }

            // Simulate Network Request (1.5s delay)
            setTimeout(() => {
                // Success State
                if(successMessage) {
                    successMessage.classList.remove('opacity-0', 'pointer-events-none');
                    successMessage.classList.add('opacity-100', 'pointer-events-auto');
                }
                contactForm.reset();
                
                // Reset Button State
                if(submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
                    if(submitBtnText) submitBtnText.textContent = "Send Message";
                }
            }, 1500);
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            successMessage.classList.remove('opacity-100', 'pointer-events-auto');
            successMessage.classList.add('opacity-0', 'pointer-events-none');
        });
    }
});

