document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Load Data From Config
    if (typeof CONFIG !== 'undefined') {
        document.getElementById('display-name').textContent = CONFIG.displayName;
        document.getElementById('display-subtitle').textContent = CONFIG.subtitle;

        // Apply Link Targets
        const linkKeys = ['kick', 'youtube', 'tiktok', 'instagram', 'donation', 'discord', 'whatsapp', 'twitch', 'x', 'facebook', 'spotify'];
        linkKeys.forEach(key => {
            const el = document.getElementById(`link-${key}`);
            const footEl = document.getElementById(`foot-${key}`);
            if (el && CONFIG.links[key]) el.href = CONFIG.links[key];
            if (footEl && CONFIG.links[key]) footEl.href = CONFIG.links[key];
        });

        // Apply Audio Source
        if (CONFIG.audio) {
            document.getElementById('song-title').textContent = CONFIG.audio.title;
            document.getElementById('song-artist').textContent = CONFIG.audio.artist;
            document.getElementById('audio-player').src = CONFIG.audio.src;
        }
    }

    // 2. Live Digital Clock
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        const dateOptions = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
        
        document.getElementById('clock-time').textContent = `${hours}:${minutes}`;
        document.getElementById('clock-sec').textContent = `:${seconds}`;
        document.getElementById('clock-date').textContent = now.toLocaleDateString('en-US', dateOptions);
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 3. Audio Controls & Volume Slider
    const audio = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');
    const visualizer = document.getElementById('visualizer');
    const volumeSlider = document.getElementById('volume-slider');

    if (playBtn && audio) {
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
                visualizer.classList.add('active');
            } else {
                audio.pause();
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play');
                visualizer.classList.remove('active');
            }
        });
    }

    if (volumeSlider && audio) {
        volumeSlider.addEventListener('input', (e) => {
            audio.volume = e.target.value;
        });
    }
});