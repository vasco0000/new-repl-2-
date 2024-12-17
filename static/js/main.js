document.addEventListener('DOMContentLoaded', function() {
    // Create floating hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 10 + 5 + 's';
        heart.style.opacity = Math.random();
        heart.style.fontSize = (Math.random() * 1.5 + 0.5) + 'rem';
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 15000);
    }

    // Create hearts periodically
    setInterval(createHeart, 1000);

    // Create initial hearts
    for(let i = 0; i < 10; i++) {
        setTimeout(createHeart, Math.random() * 5000);
    }

    // Smooth scroll functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Song buttons hover effect
    const songButtons = document.querySelectorAll('.song-btn');
    songButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        button.addEventListener('click', function() {
            // Remove active class from all buttons
            songButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Future implementation: Play selected song
            console.log('Selected song:', this.dataset.song);
        });
    });
});
