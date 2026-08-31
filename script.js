// DOM Elements
const sections = {
    landing: document.getElementById('landing'),
    birthday: document.getElementById('birthday'),
    friendship: document.getElementById('friendship'),
    message: document.getElementById('message'),
    fun: document.getElementById('fun'),
    final: document.getElementById('final')
};

const buttons = {
    begin: document.getElementById('beginBtn'),
    friendship: document.getElementById('friendshipBtn'),
    message: document.getElementById('messageBtn'),
    fun: document.getElementById('funBtn'),
    yes: document.getElementById('yesBtn'),
    no: document.getElementById('noBtn'),
    restart: document.getElementById('restartBtn')
};

const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const typingText = document.getElementById('typingText');
const confettiContainer = document.getElementById('confetti');
const daysCounter = document.getElementById('daysCounter');
const popup = document.getElementById('popup');

// State
let currentSection = 'landing';
let isMusicPlaying = false;

// Section Navigation
function showSection(sectionName) {
    // Hide current section
    sections[currentSection].classList.remove('active');
    
    // Show new section
    setTimeout(() => {
        sections[sectionName].classList.add('active');
        currentSection = sectionName;
    }, 100);
}

// Typing Effect
function typeText(text, element, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Confetti Animation
function createConfetti() {
    const colors = ['#ff6b9d', '#9b59b6', '#f093fb', '#ffd1dc', '#be90d4', '#00b894', '#fdcb6e'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 30);
    }
}

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Music Toggle
musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
    } else {
        bgMusic.play();
        musicToggle.classList.add('playing');
    }
    isMusicPlaying = !isMusicPlaying;
});

// Button Event Listeners
buttons.begin.addEventListener('click', () => {
    showSection('birthday');
    setTimeout(() => {
        createConfetti();
        typeText('You are not just a friend... you are something very special to me ❤️', typingText, 40);
    }, 500);
});

buttons.friendship.addEventListener('click', () => {
    showSection('friendship');
    setTimeout(() => {
        animateCounter(daysCounter, 730, 2000);
    }, 500);
});

buttons.message.addEventListener('click', () => {
    showSection('message');
});

buttons.fun.addEventListener('click', () => {
    showSection('fun');
});

// Fun Button Interactions
buttons.yes.addEventListener('click', () => {
    popup.classList.add('show');
    setTimeout(() => {
        popup.classList.remove('show');
        showSection('final');
    }, 2000);
});

buttons.no.addEventListener('mouseover', () => {
    const maxX = window.innerWidth - buttons.no.offsetWidth - 20;
    const maxY = window.innerHeight - buttons.no.offsetHeight - 20;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    buttons.no.style.position = 'fixed';
    buttons.no.style.left = randomX + 'px';
    buttons.no.style.top = randomY + 'px';
    buttons.no.classList.add('moving');
});

buttons.no.addEventListener('click', () => {
    const maxX = window.innerWidth - buttons.no.offsetWidth - 20;
    const maxY = window.innerHeight - buttons.no.offsetHeight - 20;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    buttons.no.style.position = 'fixed';
    buttons.no.style.left = randomX + 'px';
    buttons.no.style.top = randomY + 'px';
});

buttons.restart.addEventListener('click', () => {
    // Reset everything
    currentSection = 'landing';
    typingText.textContent = '';
    daysCounter.textContent = '0';
    buttons.no.style.position = '';
    buttons.no.style.left = '';
    buttons.no.style.top = '';
    buttons.no.classList.remove('moving');
    
    // Hide all sections
    Object.values(sections).forEach(section => {
        section.classList.remove('active');
    });
    
    // Show landing
    setTimeout(() => {
        sections.landing.classList.add('active');
    }, 100);
});

// Create additional floating hearts and stars dynamically
function createFloatingElements() {
    const background = document.querySelector('.background');
    const heartsContainer = document.querySelector('.floating-hearts');
    const starsContainer = document.querySelector('.floating-stars');
    
    // Add more hearts
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.textContent = '💖';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animation = `floatHeart ${15 + Math.random() * 10}s linear infinite`;
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.fontSize = (1.5 + Math.random()) + 'rem';
        heartsContainer.appendChild(heart);
    }
    
    // Add more stars
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('div');
        star.textContent = '⭐';
        star.style.position = 'absolute';
        star.style.left = Math.random() * 100 + '%';
        star.style.animation = `floatStar ${20 + Math.random() * 10}s linear infinite`;
        star.style.animationDelay = Math.random() * 5 + 's';
        star.style.opacity = Math.random() * 0.5 + 0.2;
        star.style.fontSize = (1 + Math.random()) + 'rem';
        starsContainer.appendChild(star);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createFloatingElements();
    
    // Set music volume
    bgMusic.volume = 0.3;
});

