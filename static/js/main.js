// Music Player Class
class MusicPlayer {
    constructor() {
        this.songs = {
            perfect: {
                url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
                title: 'Perfect - Ed Sheeran'
            },
            alliwantisyou: {
                url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
                title: 'All I Want Is You - U2'
            },
            athousandyears: {
                url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
                title: 'A Thousand Years - Christina Perri'
            }
        };
        this.currentAudio = null;
        this.isPlaying = false;
    }

    play(songKey) {
        // Stop current song if playing
        if (this.currentAudio) {
            this.stop();
        }

        // Create and play new audio
        const song = this.songs[songKey];
        if (song) {
            this.currentAudio = new Audio(song.url);
            this.currentAudio.play();
            this.isPlaying = true;
            return true;
        }
        return false;
    }

    stop() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.isPlaying = false;
        }
    }

    getCurrentSong() {
        return this.currentAudio ? this.currentAudio.src : null;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize music player
    const musicPlayer = new MusicPlayer();

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

    // Song buttons functionality
    const songButtons = document.querySelectorAll('.song-btn');
    songButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        button.addEventListener('click', function() {
            const songKey = this.dataset.song;
            
            // Remove active class from all buttons
            songButtons.forEach(btn => btn.classList.remove('active'));
            
            // If clicking the same song that's playing, stop it
            if (musicPlayer.isPlaying && musicPlayer.getCurrentSong().includes(songKey)) {
                musicPlayer.stop();
                this.classList.remove('active');
            } else {
                // Play the selected song and add active class
                if (musicPlayer.play(songKey)) {
                    this.classList.add('active');
                }
            }
        });
    });
});
