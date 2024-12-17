// Music Player Class
class MusicPlayer {
    constructor() {
        this.audio = new Audio('https://drive.google.com/uc?export=download&id=1QwCtvwWx9tBoRwfXu4Ya9ti7uv7xwzCq');
        this.isPlaying = false;
        this.audio.loop = true;
    }

    toggle() {
        if (this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
        } else {
            this.audio.play().catch(error => {
                console.error('Error playing audio:', error);
            });
            this.isPlaying = true;
        }
        return this.isPlaying;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize music player
    const musicPlayer = new MusicPlayer();

    // Envelope and Letter Animation
    const envelope = document.getElementById('envelope');
    const letterContent = document.querySelector('.letter-content');
    const promptMessage = document.querySelector('.prompt-message');

    if (envelope) {
        envelope.addEventListener('click', function() {
            this.classList.add('open');
            promptMessage.style.display = 'none';
            
            setTimeout(() => {
                letterContent.classList.remove('hidden');
                letterContent.classList.add('reveal');
                // Start playing music when letter is revealed
                if (!musicPlayer.isPlaying) {
                    musicPlayer.toggle();
                    document.getElementById('musicToggle').classList.add('playing');
                    document.getElementById('musicToggle').innerHTML = '<i class="fas fa-pause"></i>';
                }
            }, 500);
        });
    }

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

    // Music toggle button functionality
    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle) {
        musicToggle.addEventListener('click', function() {
            const isPlaying = musicPlayer.toggle();
            this.classList.toggle('playing', isPlaying);
            this.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-music"></i>';
        });
    }
});