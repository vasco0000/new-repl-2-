// Music Player Class
class MusicPlayer {
    constructor() {
        this.audio = new Audio('/static/music/rzchnnel.mp3');
        this.audio.preload = 'auto';
        this.isPlaying = false;
        this.audio.loop = true;
        // Add better mobile support
        document.addEventListener('touchstart', () => {
            if (this.audio.paused && !this.isPlaying) {
                this.audio.load();
            }
        }, { once: true });
    }

    toggle() {
        if (this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
        } else {
            const playPromise = this.audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error('Error playing audio:', error);
                });
            }
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

    if (envelope) {
        const openLetter = () => {
            envelope.classList.add('open');
            
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
        };

        // Support both click and touch events
        envelope.addEventListener('click', openLetter);
        envelope.addEventListener('touchend', (e) => {
            e.preventDefault();
            openLetter();
        });
    }

    // Create floating hearts with varied styles
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = Math.random() > 0.5 ? '❤' : '💖';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 8 + 7 + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.fontSize = (Math.random() * 2 + 1) + 'rem';
        heart.style.filter = `hue-rotate(${Math.random() * 40 - 20}deg)`;
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 15000);
    }

    // Create hearts more frequently for a romantic atmosphere
    setInterval(createHeart, 800);

    // Create initial hearts
    for(let i = 0; i < 15; i++) {
        setTimeout(createHeart, Math.random() * 3000);
    }

    // Music toggle button functionality with better mobile support
    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle) {
        const handleMusicToggle = (e) => {
            e.preventDefault();
            const isPlaying = musicPlayer.toggle();
            musicToggle.classList.toggle('playing', isPlaying);
            musicToggle.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-music"></i>';
        };

        musicToggle.addEventListener('click', handleMusicToggle);
        musicToggle.addEventListener('touchend', handleMusicToggle);
    }
});
