// Navbar scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Dynamic Typing Effect
const typedTextSpan = document.getElementById("typed-text");
const textArray = ["Full Stack Developer", "Software Engineer", "Content Creator" , "Junior Engineer"];
const typingDelay = 100;
const erasingDelay = 80;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(elem => {
    observer.observe(elem);
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinksMenu = document.querySelector('.nav-links');
const hamburgerIcon = hamburger.querySelector('i');

hamburger.addEventListener('click', () => {
    navLinksMenu.classList.toggle('active');
    
    // Toggle Icon between bars and X
    if (navLinksMenu.classList.contains('active')) {
        hamburgerIcon.classList.remove('fa-bars');
        hamburgerIcon.classList.add('fa-times');
    } else {
        hamburgerIcon.classList.remove('fa-times');
        hamburgerIcon.classList.add('fa-bars');
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinksMenu.classList.remove('active');
        hamburgerIcon.classList.remove('fa-times');
        hamburgerIcon.classList.add('fa-bars');
    });
});

// Theme Toggle Logic & Particles.js Config
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

function initParticles(theme) {
    if (typeof particlesJS !== 'undefined') {
        // Clear existing particles if they exist
        const particlesContainer = document.getElementById('particles-js');
        if (particlesContainer) {
            particlesContainer.innerHTML = '';
        }

        // Set colors based on theme
        // Dark theme: Cyan and White. Light theme: Cyan and Dark Gray
        const particleColor = theme === 'light' ? ["#00f2fe", "#4facfe", "#333333"] : ["#00f2fe", "#4facfe", "#ffffff"];
        const lineColor = theme === 'light' ? "#333333" : "#4facfe";

        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": { "enable": true, "value_area": 800 }
                },
                "color": {
                    "value": particleColor
                },
                "shape": {
                    "type": "circle",
                    "stroke": { "width": 0, "color": "#000000" },
                    "polygon": { "nb_sides": 5 }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": lineColor,
                    "opacity": theme === 'light' ? 0.2 : 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                    "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
                    "repulse": { "distance": 200, "duration": 0.4 },
                    "push": { "particles_nb": 4 },
                    "remove": { "particles_nb": 2 }
                }
            },
            "retina_detect": true
        });
    }
}

// Check for saved user preference
let currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
    document.documentElement.classList.add('light-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

// Initialize particles on load with the correct theme
initParticles(currentTheme);

themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('light-mode');
    
    if (document.documentElement.classList.contains('light-mode')) {
        currentTheme = 'light';
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        currentTheme = 'dark';
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    
    localStorage.setItem('theme', currentTheme);
    
    // Re-initialize particles with the new theme colors
    initParticles(currentTheme);
});

// Vanilla Tilt Initialization
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".glass-card"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });
}

// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline && window.matchMedia("(min-width: 969px)").matches) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Using Web Animations API for smooth trailing effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 250, fill: "forwards" });
    });

    // Hover effect on clickable elements
    const clickables = document.querySelectorAll('a, button, input, textarea, .theme-toggle, .hamburger, .project-card');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.backgroundColor = 'rgba(0, 242, 254, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });
}

// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 600); // 600ms delay to ensure they see the cool animation briefly
    }
});

// Scroll Progress Logic
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    if (scrollProgress) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + "%";
    }
});

// Back to Top Button Logic
const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (backToTopBtn) {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contact Form AJAX Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        const formData = new FormData(this);
        // Add Web3Forms access key
        formData.append('access_key', '567b96cd-6fb6-4d34-b363-e029c4856765');
        
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        
        // Use Web3Forms AJAX endpoint
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(response => response.json())
        .then(data => {
            if(data.success === "true" || data.success === true) {
                // Clear the form fields
                contactForm.reset();
                
                // Show toast message
                const toast = document.getElementById('toast');
                if (toast) {
                    toast.classList.add('show');
                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 3000);
                }
            } else {
                alert('There was an error sending your message. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again later.');
        })
        .finally(() => {
            // Restore button state
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}

// Voice Navigation Logic
const voiceBtn = document.getElementById('voice-nav-btn');
const speechToast = document.getElementById('speech-toast');
const speechText = document.getElementById('speech-text');

// Check browser support
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition && voiceBtn) {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = true; // Makes it lightning fast!
    recognition.maxAlternatives = 1;

    let shouldListen = false;
    let isListening = false;
    let lastExecutedCommand = '';
    let lastExecutedTime = 0;

    // Command mapping
    const commands = {
        'home': () => window.scrollTo({ top: 0, behavior: 'smooth' }),
        'top': () => window.scrollTo({ top: 0, behavior: 'smooth' }),
        'about': () => document.getElementById('about').scrollIntoView({ behavior: 'smooth' }),
        'skills': () => document.getElementById('skills').scrollIntoView({ behavior: 'smooth' }),
        'experience': () => document.getElementById('experience').scrollIntoView({ behavior: 'smooth' }),
        'projects': () => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }),
        'work': () => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }),
        'contact': () => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }),
        'message': () => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }),
        'dark mode': () => {
            if (currentTheme !== 'dark') themeToggle.click();
        },
        'light mode': () => {
            if (currentTheme !== 'light') themeToggle.click();
        }
    };

    voiceBtn.addEventListener('click', () => {
        if (shouldListen) {
            shouldListen = false;
            recognition.stop();
        } else {
            shouldListen = true;
            try {
                recognition.start();
            } catch (e) {
                console.error('Speech recognition error', e);
            }
        }
    });

    recognition.onstart = function() {
        isListening = true;
        voiceBtn.classList.add('listening');
        speechText.innerText = "Listening...";
        speechToast.classList.add('show');
    };

    recognition.onspeechend = function() {
        // Continuous mode handles this naturally
    };

    recognition.onend = function() {
        // If it stopped but user didn't turn it off, restart it to keep "Always On"
        if (shouldListen) {
            try {
                recognition.start();
            } catch(e) {}
        } else {
            isListening = false;
            voiceBtn.classList.remove('listening');
            setTimeout(() => {
                speechToast.classList.remove('show');
            }, 2000);
        }
    };

    recognition.onresult = function(event) {
        // Get the most recent speech segment recognized
        const latestTranscript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
        speechText.innerText = `Heard: "${latestTranscript}"`;
        
        for (const [key, action] of Object.entries(commands)) {
            if (latestTranscript.includes(key)) {
                
                // Prevent executing the same command 50 times a second due to interim results
                if (lastExecutedCommand !== key || (Date.now() - lastExecutedTime) > 3000) {
                    action();
                    speechText.innerText = `Executing: ${key}`;
                    lastExecutedCommand = key;
                    lastExecutedTime = Date.now();
                }
                
                // We DO NOT call recognition.stop() here. This keeps the mic open permanently!
                break;
            }
        }
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error detected: ' + event.error);
        if (event.error === 'not-allowed' || event.error === 'audio-capture') {
            shouldListen = false;
            speechText.innerText = "Microphone access denied.";
        } else if (event.error !== 'aborted') {
            speechText.innerText = "Didn't catch that.";
        }
        
        if (!shouldListen) {
            isListening = false;
            voiceBtn.classList.remove('listening');
            setTimeout(() => {
                speechToast.classList.remove('show');
            }, 3000);
        }
    };

} else if (voiceBtn) {
    // Hide button if speech API is not supported by browser
    voiceBtn.style.display = 'none';
}
