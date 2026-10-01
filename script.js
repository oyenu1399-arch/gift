const opening = document.getElementById('opening');
const app = document.getElementById('app');
const audio = document.getElementById('audio');
const musicToggle = document.getElementById('musicToggle');
const musicLabel = document.getElementById('musicLabel');

// ==========================
// OPENING
// ==========================
document.getElementById('enterBtn').addEventListener('click', () => {
  opening.style.transition = 'opacity .7s ease, transform .7s ease';
  opening.style.opacity = '0';
  opening.style.transform = 'scale(1.03)';
  setTimeout(() => {
    opening.classList.add('hidden');
    app.classList.remove('hidden');
    showPage('home');
  }, 650);
});

// ==========================
// PAGE NAVIGATION
// ==========================
function showPage(id) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active-page'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active-page');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.replaceState(null, '', `#${id}`);
  }
}

document.addEventListener('click', e => {
  const button = e.target.closest('[data-page]');
  if (!button) return;
  showPage(button.dataset.page);
});

// Open directly with #journey, #moments, etc.
window.addEventListener('load', () => {
  const hash = location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) {
    opening.classList.add('hidden');
    app.classList.remove('hidden');
    showPage(hash);
  }
});

// ==========================
// MUSIC PLAYER
// ==========================
let musicOn = false;
let currentSong = null;

musicToggle.addEventListener('click', () => {
  if (!currentSong) {
    musicLabel.textContent = 'Pilih lagu';
    document.getElementById('playlist').scrollIntoView({ behavior: 'smooth' });
    return;
  }
  if (musicOn) {
    audio.pause();
    musicOn = false;
    musicToggle.classList.remove('on');
    musicLabel.textContent = 'Musik mati';
  } else {
    audio.play().then(() => {
      musicOn = true;
      musicToggle.classList.add('on');
      musicLabel.textContent = 'Musik hidup';
    }).catch(() => {
      musicLabel.textContent = 'Tambah musik dulu';
    });
  }
});

document.querySelectorAll('.song').forEach(song => {
  song.addEventListener('click', () => {
    document.querySelectorAll('.song').forEach(s => s.classList.remove('active'));
    song.classList.add('active');
    currentSong = song;
    const src = song.dataset.src.trim();
    const title = song.dataset.title || song.querySelector('b').textContent;

    if (!src) {
      musicLabel.textContent = 'Tambah musik dulu';
      musicOn = false;
      musicToggle.classList.remove('on');
      return;
    }

    audio.src = src;
    audio.play().then(() => {
      musicOn = true;
      musicToggle.classList.add('on');
      musicLabel.textContent = title;
    }).catch(() => {
      musicLabel.textContent = 'Tidak bisa diputar';
    });
  });
});

audio.addEventListener('ended', () => {
  musicOn = false;
  musicToggle.classList.remove('on');
  musicLabel.textContent = 'Musik mati';
});

// ==========================
// GIFT / LETTER
// ==========================
const giftBox = document.getElementById('giftBox');
const letter = document.getElementById('letter');
const giftInstruction = document.getElementById('giftInstruction');

function openGift() {
  if (giftBox.classList.contains('opened')) return;
  giftBox.classList.add('opened');
  giftInstruction.textContent = 'Tunggu... ada surat kecil di dalamnya.';
  setTimeout(() => {
    letter.classList.remove('hidden-letter');
    letter.classList.add('show-letter');
    giftInstruction.textContent = 'Untukmu. ♡';
  }, 650);
}

giftBox.addEventListener('click', openGift);
giftBox.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') openGift();
});
