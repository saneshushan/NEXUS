/**
 * NEXUS GAMING APPLICATION CORE
 * Orchestrates games catalog, arcade cabinet, modals, leaderboards, wishlist & audio
 */

// ================= 1. GAMES CATALOG DATA =================
const GAMES_CATALOG = [
  {
    id: 'game-1',
    title: 'CYBER HORIZON: 2099',
    genre: 'Sci-Fi',
    category: 'Action',
    rating: 4.9,
    price: 'FREE TO PLAY',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    developer: 'Quantum Matrix Labs',
    release: '2026',
    players: '142,500 Active',
    desc: 'High-octane tactical squad FPS set in the neon sprawl of Neo-Tokyo. Features raytraced cyber warfare, vertical grappling mobility, and hyper-customizable plasma weaponry.'
  },
  {
    id: 'game-2',
    title: 'NEON DRIFT: VELOCITY',
    genre: 'Racing',
    category: 'Racing',
    rating: 4.8,
    price: '$19.99',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    developer: 'Apex Horizon Games',
    release: '2026',
    players: '86,300 Active',
    desc: 'Anti-gravity supersonic racing on holographic magnetic tracks. Drift at Mach 2 through synthwave cyber highways with an adaptive electronic soundtrack.'
  },
  {
    id: 'game-3',
    title: 'CHRONO BLADE: RONIN',
    genre: 'RPG',
    category: 'RPG',
    rating: 4.95,
    price: '$29.99',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    developer: 'Kurogane Interactive',
    release: '2025',
    players: '210,000 Active',
    desc: 'Cyber-samurai soulslike action RPG. Master precision parrying, time-dilation dashes, and unlock cybernetic katana augmentations in feudal dystopian megastructures.'
  },
  {
    id: 'game-4',
    title: 'CYBER STRIKE: SECTOR 7',
    genre: 'Arcade',
    category: 'Arcade',
    rating: 5.0,
    price: 'PLAY IN BROWSER',
    isPlayable: true,
    arcadeType: 'shooter',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    developer: 'Nexus Studio Core',
    release: '2026',
    players: '45,200 Active',
    desc: 'Our flagship built-in retro sci-fi space shooter. Fight waves of hyper-drones and rogue asteroids directly in your web browser with zero loading time.'
  },
  {
    id: 'game-5',
    title: 'NEON SNAKE 2088',
    genre: 'Arcade',
    category: 'Arcade',
    rating: 4.85,
    price: 'PLAY IN BROWSER',
    isPlayable: true,
    arcadeType: 'snake',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    developer: 'Nexus Studio Core',
    release: '2026',
    players: '31,800 Active',
    desc: 'The timeless arcade classic reborn with hyper-speed physics, glowing particle shockwaves, dynamic music blips, and neon grid aesthetics.'
  },
  {
    id: 'game-6',
    title: 'AURA PROTOCOL: 0',
    genre: 'Sci-Fi',
    category: 'Sci-Fi',
    rating: 4.7,
    price: 'FREE TO PLAY',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop&q=80',
    developer: 'Synapse Core Media',
    release: '2025',
    players: '58,400 Active',
    desc: 'Cyber-stealth infiltration thriller. Hack surveillance grids, puppet security droids, and unravel corporate conspiracies within the deep darknet.'
  },
  {
    id: 'game-7',
    title: 'CHRONO REFLEX: MATRIX',
    genre: 'Arcade',
    category: 'Arcade',
    rating: 4.9,
    price: 'PLAY IN BROWSER',
    isPlayable: true,
    arcadeType: 'reflex',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80',
    developer: 'Nexus Studio Core',
    release: '2026',
    players: '28,100 Active',
    desc: 'Competitive millisecond reflex tester. Measure your human reaction time, conquer the reflex leaderboard, and discover if you rank as a Cyber God.'
  },
  {
    id: 'game-8',
    title: 'MECHA SIEGE: TITAN',
    genre: 'Action',
    category: 'Action',
    rating: 4.75,
    price: '$24.99',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80',
    developer: 'Ironclad Games',
    release: '2026',
    players: '74,900 Active',
    desc: 'Colossal mech battles with fully destructible procedural cities. Customize your loadout with dual railguns, thermal particle shields, and EMP launchers.'
  }
];

// ================= 2. LEADERBOARD DATA =================
const LEADERBOARD_DATA = {
  weekly: [
    { rank: 4, name: 'CYBER_VIPER', game: 'Cyber Horizon', winrate: '89.4%', score: '782,100', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
    { rank: 5, name: 'GHOST_RUNNER', game: 'Chrono Blade', winrate: '88.1%', score: '741,600', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
    { rank: 6, name: 'PULSE_RIDER', game: 'Neon Drift', winrate: '86.5%', score: '698,400', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
    { rank: 7, name: 'TITAN_SLAYER', game: 'Mecha Siege', winrate: '84.2%', score: '645,200', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80' },
    { rank: 8, name: 'ZERO_GRAV', game: 'Cyber Strike', winrate: '82.9%', score: '612,900', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' }
  ],
  alltime: [
    { rank: 4, name: 'NEXUS_LEGEND', game: 'Cyber Strike', winrate: '96.2%', score: '2,890,400', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
    { rank: 5, name: 'CYBER_VIPER', game: 'Cyber Horizon', winrate: '94.8%', score: '2,640,100', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
    { rank: 6, name: 'DARK_ORBIT', game: 'Mecha Siege', winrate: '93.5%', score: '2,420,800', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80' },
    { rank: 7, name: 'BLADE_MASTER', game: 'Chrono Blade', winrate: '91.7%', score: '2,180,300', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
    { rank: 8, name: 'APEX_DRIVE', game: 'Neon Drift', winrate: '90.2%', score: '1,990,000', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' }
  ]
};

// ================= 3. STATE MANAGEMENT =================
const AppState = {
  currentArcadeGame: 'shooter',
  activeGameInstance: null,
  activeGenre: 'all',
  searchQuery: '',
  wishlist: JSON.parse(localStorage.getItem('nexus_wishlist') || '[]'),
  gamerTag: localStorage.getItem('nexus_gamer_tag') || 'CYBER_PHANTOM'
};

// ================= 4. UI INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initAudioWidget();
  initHoloCardTilt();
  initArcadeCabinet();
  renderCatalog();
  initCatalogFilters();
  renderLeaderboard('weekly');
  initLeaderboardTabs();
  initModals();
  initWishlist();
  initProfile();
  initLiveCounter();
  initNewsletter();
});

// Toast Notification Engine
function showToast(message, icon = 'fa-solid fa-circle-info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  if (window.soundFX) window.soundFX.playClick();

  setTimeout(() => {
    toast.classList.add('toast-remove');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ================= 5. NAVBAR & AUDIO CONTROLS =================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking links
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
}

function initAudioWidget() {
  const btn = document.getElementById('sfxToggleBtn');
  if (!btn) return;

  function updateBtnUI() {
    const isMuted = window.soundFX.isMuted();
    if (isMuted) {
      btn.classList.add('muted');
      btn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i> <span class="audio-status">SFX: OFF</span>`;
    } else {
      btn.classList.remove('muted');
      btn.innerHTML = `<i class="fa-solid fa-volume-high"></i> <span class="audio-status">SFX: ON</span>`;
    }
  }

  updateBtnUI();

  btn.addEventListener('click', () => {
    window.soundFX.toggleMute();
    updateBtnUI();
    if (!window.soundFX.isMuted()) {
      window.soundFX.playScore();
      showToast('Sound Effects Enabled', 'fa-solid fa-volume-high');
    } else {
      showToast('Sound Effects Muted', 'fa-solid fa-volume-xmark');
    }
  });
}

// ================= 6. HOLOGRAPHIC 3D CARD TILT =================
function initHoloCardTilt() {
  const card = document.getElementById('holoCard');
  if (!card) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

// ================= 7. ARCADE CABINET CONTROLLER =================
function initArcadeCabinet() {
  const canvas = document.getElementById('arcadeCanvas');
  const overlay = document.getElementById('arcadeOverlay');
  const startBtn = document.getElementById('startArcadeGameBtn');
  const restartBtn = document.getElementById('arcadeRestartBtn');
  const pauseBtn = document.getElementById('arcadePauseBtn');
  const fullscreenBtn = document.getElementById('arcadeFullscreenBtn');
  const screenWrap = document.getElementById('arcadeScreenWrap');

  const hudScore = document.getElementById('hudScore');
  const hudHighScore = document.getElementById('hudHighScore');
  const hudMultiplier = document.getElementById('hudMultiplier');
  const hudControlsText = document.getElementById('hudControlsText');
  const activeGameTitle = document.getElementById('activeGameTitle');

  const overlayTitle = document.getElementById('overlayTitle');
  const overlayInstructions = document.getElementById('overlayInstructions');
  const overlayIcon = document.getElementById('overlayIcon');
  const scoreSummary = document.getElementById('scoreSummary');
  const finalScoreVal = document.getElementById('finalScoreVal');

  // Callback to update HUD stats
  function onScoreChange(score, highScore, multiplier) {
    if (hudScore) hudScore.textContent = score;
    if (hudHighScore) hudHighScore.textContent = highScore;
    if (hudMultiplier) hudMultiplier.textContent = multiplier;
  }

  // Callback on Game Over
  function onGameOver(finalScore, highScore) {
    overlay.classList.remove('hidden');
    overlayTitle.textContent = 'MISSION TERMINATED';
    scoreSummary.style.display = 'flex';
    finalScoreVal.textContent = finalScore;
    startBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> PLAY AGAIN';

    // Award Profile Stats
    addProfileXP(typeof finalScore === 'number' ? finalScore : 250);
  }

  // Game Switcher
  function switchArcadeGame(gameType) {
    if (AppState.activeGameInstance) {
      AppState.activeGameInstance.destroy();
      AppState.activeGameInstance = null;
    }

    AppState.currentArcadeGame = gameType;
    overlay.classList.remove('hidden');
    scoreSummary.style.display = 'none';
    startBtn.innerHTML = '<i class="fa-solid fa-play"></i> START ENGINE';

    if (gameType === 'shooter') {
      activeGameTitle.textContent = 'CYBER STRIKE // SECTOR 7';
      overlayTitle.textContent = 'READY PILOT ONE?';
      overlayInstructions.textContent = 'Arrow Keys / WASD to fly. SPACEBAR to fire plasma cannons.';
      overlayIcon.innerHTML = '<i class="fa-solid fa-rocket"></i>';
      hudControlsText.innerHTML = '<kbd>W/A/S/D</kbd> or <kbd>Arrows</kbd> to Move &bull; <kbd>SPACE</kbd> to Shoot';

      AppState.activeGameInstance = new SpaceShooterGame(canvas, onScoreChange, onGameOver);
      const high = localStorage.getItem('nexus_high_shooter') || '0';
      onScoreChange('0000', high, 'x1.0');

    } else if (gameType === 'snake') {
      activeGameTitle.textContent = 'NEON SNAKE 2088 // THE GRID';
      overlayTitle.textContent = 'ENTER THE MATRIX';
      overlayInstructions.textContent = 'Arrow Keys or WASD to navigate. Collect neon power orbs.';
      overlayIcon.innerHTML = '<i class="fa-solid fa-dragon"></i>';
      hudControlsText.innerHTML = '<kbd>W/A/S/D</kbd> or <kbd>Arrows</kbd> to Turn &bull; Avoid Walls & Body';

      AppState.activeGameInstance = new NeonSnakeGame(canvas, onScoreChange, onGameOver);
      const high = localStorage.getItem('nexus_high_snake') || '0';
      onScoreChange('0000', high, 'x1.0');

    } else if (gameType === 'reflex') {
      activeGameTitle.textContent = 'CHRONO REFLEX // NEURAL MATRIX';
      overlayTitle.textContent = 'TEST YOUR SYNAPSES';
      overlayInstructions.textContent = 'Wait for the Electric Green signal, then strike instantly with Click or Spacebar!';
      overlayIcon.innerHTML = '<i class="fa-solid fa-stopwatch"></i>';
      hudControlsText.innerHTML = '<kbd>CLICK</kbd> or <kbd>SPACE</kbd> on Green Signal &bull; 5 Test Rounds';

      AppState.activeGameInstance = new CyberReflexGame(canvas, onScoreChange, onGameOver);
      const high = localStorage.getItem('nexus_high_reflex') || '---';
      onScoreChange('---', high === '---' ? '---' : `${high}ms`, 'RND 0/5');
    }
  }

  // Setup tab buttons
  document.querySelectorAll('.arcade-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.arcade-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const game = tab.getAttribute('data-game');
      switchArcadeGame(game);
      if (window.soundFX) window.soundFX.playClick();
    });
  });

  // Start Button
  startBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    if (AppState.activeGameInstance) {
      AppState.activeGameInstance.start();
    }
    if (window.soundFX) window.soundFX.playScore();
  });

  // Restart Button
  restartBtn.addEventListener('click', () => {
    if (AppState.activeGameInstance) {
      overlay.classList.add('hidden');
      AppState.activeGameInstance.start();
      if (window.soundFX) window.soundFX.playClick();
    }
  });

  // Pause Button
  pauseBtn.addEventListener('click', () => {
    if (AppState.activeGameInstance) {
      AppState.activeGameInstance.pause();
      if (window.soundFX) window.soundFX.playClick();
      pauseBtn.innerHTML = AppState.activeGameInstance.paused 
        ? '<i class="fa-solid fa-play"></i>' 
        : '<i class="fa-solid fa-pause"></i>';
    }
  });

  // Fullscreen Button
  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      screenWrap.requestFullscreen?.() || screenWrap.webkitRequestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  });

  // Launch initial game
  switchArcadeGame('shooter');

  // Hero Quick Play button hooks
  document.querySelectorAll('.launch-hero-game').forEach(btn => {
    btn.addEventListener('click', () => {
      const g = btn.getAttribute('data-game') || 'shooter';
      const targetTab = document.querySelector(`.arcade-tab[data-game="${g}"]`);
      if (targetTab) targetTab.click();
      document.getElementById('arcade-section').scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        startBtn.click();
      }, 700);
    });
  });

  document.querySelectorAll('.play-arcade-cta').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('arcade-section').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ================= 8. CATALOG RENDERING & FILTERS =================
function renderCatalog() {
  const grid = document.getElementById('gamesGrid');
  if (!grid) return;

  const filtered = GAMES_CATALOG.filter(game => {
    const matchesGenre = AppState.activeGenre === 'all' || game.category.toLowerCase() === AppState.activeGenre.toLowerCase();
    const query = AppState.searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      game.title.toLowerCase().includes(query) || 
      game.genre.toLowerCase().includes(query) || 
      game.developer.toLowerCase().includes(query);
    return matchesGenre && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results-msg">
        <i class="fa-solid fa-ghost" style="font-size: 2.5rem; color: var(--neon-cyan); margin-bottom: 12px; display: block;"></i>
        No games match your cyber query. Try another keyword or reset filters.
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(game => {
    const isWishlisted = AppState.wishlist.includes(game.id);
    return `
      <div class="game-card" data-id="${game.id}">
        <div class="game-card-img-wrap">
          <img src="${game.image}" alt="${game.title}" loading="lazy">
          <button class="game-fav-btn ${isWishlisted ? 'active' : ''}" data-id="${game.id}" title="Add to Wishlist">
            <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
        </div>
        <div class="game-card-body">
          <div class="card-tags">
            <span class="card-genre">${game.genre}</span>
            <span class="card-score"><i class="fa-solid fa-star"></i> ${game.rating}</span>
          </div>
          <h3 class="card-title">${game.title}</h3>
          <p class="card-desc">${game.desc}</p>
          <div class="card-footer">
            <span class="card-price">${game.price}</span>
            <button class="btn btn-sm ${game.isPlayable ? 'btn-primary' : 'btn-ghost'} open-details-btn" data-id="${game.id}">
              ${game.isPlayable ? '<i class="fa-solid fa-gamepad"></i> PLAY' : 'DETAILS'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Re-bind click events
  grid.querySelectorAll('.open-details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      openGameDetails(id);
    });
  });

  grid.querySelectorAll('.game-fav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      toggleWishlist(id);
    });
  });
}

function initCatalogFilters() {
  const pills = document.querySelectorAll('.filter-pill');
  const searchInput = document.getElementById('gameSearchInput');
  const clearBtn = document.getElementById('clearSearchBtn');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      AppState.activeGenre = pill.getAttribute('data-genre');
      renderCatalog();
      if (window.soundFX) window.soundFX.playClick();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value;
      if (clearBtn) clearBtn.style.display = e.target.value ? 'block' : 'none';
      renderCatalog();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      AppState.searchQuery = '';
      clearBtn.style.display = 'none';
      renderCatalog();
    });
  }
}

// ================= 9. LEADERBOARDS =================
function renderLeaderboard(boardType) {
  const tbody = document.getElementById('leaderboardTbody');
  if (!tbody) return;

  const data = LEADERBOARD_DATA[boardType] || LEADERBOARD_DATA.weekly;

  tbody.innerHTML = data.map(item => `
    <tr>
      <td class="table-rank-num">#${item.rank}</td>
      <td>
        <div class="player-td-cell">
          <img src="${item.avatar}" alt="${item.name}">
          <strong>${item.name}</strong>
        </div>
      </td>
      <td>${item.game}</td>
      <td><span class="table-winrate">${item.winrate}</span></td>
      <td class="table-score-val">${item.score} PTS</td>
    </tr>
  `).join('');
}

function initLeaderboardTabs() {
  const tabs = document.querySelectorAll('.rank-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const board = tab.getAttribute('data-board');
      renderLeaderboard(board);
      if (window.soundFX) window.soundFX.playClick();
    });
  });
}

// ================= 10. WISHLIST SYSTEM =================
function initWishlist() {
  updateWishlistCount();

  const headerBtn = document.getElementById('wishlistHeaderBtn');
  const modal = document.getElementById('wishlistModal');
  const closeBtn = document.getElementById('closeWishlistModal');

  if (headerBtn && modal) {
    headerBtn.addEventListener('click', () => {
      renderWishlistDrawer();
      modal.classList.add('active');
    });
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }
}

function updateWishlistCount() {
  const countBadge = document.getElementById('wishlistCount');
  const drawerCount = document.getElementById('drawerWishlistCount');
  if (countBadge) countBadge.textContent = AppState.wishlist.length;
  if (drawerCount) drawerCount.textContent = `${AppState.wishlist.length} item${AppState.wishlist.length === 1 ? '' : 's'}`;
}

function toggleWishlist(gameId) {
  const game = GAMES_CATALOG.find(g => g.id === gameId);
  if (!game) return;

  const idx = AppState.wishlist.indexOf(gameId);
  if (idx > -1) {
    AppState.wishlist.splice(idx, 1);
    showToast(`Removed "${game.title}" from Wishlist`, 'fa-solid fa-heart-crack');
  } else {
    AppState.wishlist.push(gameId);
    showToast(`Saved "${game.title}" to Wishlist!`, 'fa-solid fa-heart');
  }

  localStorage.setItem('nexus_wishlist', JSON.stringify(AppState.wishlist));
  updateWishlistCount();
  renderCatalog();
}

function renderWishlistDrawer() {
  const container = document.getElementById('wishlistItemsList');
  if (!container) return;

  if (AppState.wishlist.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); padding: 40px 10px;">
        <i class="fa-regular fa-heart" style="font-size: 2.2rem; margin-bottom: 12px; color: var(--text-dim);"></i>
        <p>Your wishlist is currently empty.<br>Browse trending titles and save your favorites!</p>
      </div>
    `;
    return;
  }

  const items = GAMES_CATALOG.filter(g => AppState.wishlist.includes(g.id));
  container.innerHTML = items.map(game => `
    <div class="drawer-item">
      <img src="${game.image}" alt="${game.title}">
      <div class="drawer-item-info">
        <h4 class="drawer-item-title">${game.title}</h4>
        <span class="drawer-item-genre">${game.genre} &bull; ${game.price}</span>
      </div>
      <button class="drawer-remove-btn" data-id="${game.id}" title="Remove">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `).join('');

  container.querySelectorAll('.drawer-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      toggleWishlist(id);
      renderWishlistDrawer();
    });
  });
}

// ================= 11. PROFILE & XP =================
function initProfile() {
  const profileBtn = document.getElementById('profileBtn');
  const modal = document.getElementById('profileModal');
  const closeBtn = document.getElementById('closeProfileModal');
  const navGamerTag = document.getElementById('navGamerTag');
  const profileNameInput = document.getElementById('profileNameInput');
  const saveProfileBtn = document.getElementById('saveProfileBtn');
  const changeAvatarBtn = document.getElementById('changeAvatarBtn');
  const userAvatarImg = document.getElementById('userAvatarImg');
  const modalAvatarImg = document.getElementById('modalAvatarImg');

  const avatars = [
    'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80'
  ];
  let avatarIdx = 0;

  // Load saved tag
  if (navGamerTag && profileNameInput) {
    navGamerTag.textContent = AppState.gamerTag;
    profileNameInput.value = AppState.gamerTag;
  }

  if (profileBtn && modal) {
    profileBtn.addEventListener('click', () => modal.classList.add('active'));
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  if (saveProfileBtn && profileNameInput) {
    saveProfileBtn.addEventListener('click', () => {
      const newTag = profileNameInput.value.trim().toUpperCase() || 'CYBER_PILOT';
      AppState.gamerTag = newTag;
      localStorage.setItem('nexus_gamer_tag', newTag);
      navGamerTag.textContent = newTag;
      showToast(`Pilot Tag updated to ${newTag}!`, 'fa-solid fa-id-badge');
    });
  }

  if (changeAvatarBtn) {
    changeAvatarBtn.addEventListener('click', () => {
      avatarIdx = (avatarIdx + 1) % avatars.length;
      userAvatarImg.src = avatars[avatarIdx];
      modalAvatarImg.src = avatars[avatarIdx];
      showToast('Avatar transmission updated!', 'fa-solid fa-camera');
    });
  }
}

function addProfileXP(points) {
  const currentTotal = parseInt(localStorage.getItem('nexus_total_score') || '24580', 10);
  const currentGames = parseInt(localStorage.getItem('nexus_games_played') || '48', 10);

  const newTotal = currentTotal + points;
  const newGames = currentGames + 1;

  localStorage.setItem('nexus_total_score', newTotal);
  localStorage.setItem('nexus_games_played', newGames);

  const totalEl = document.getElementById('profileTotalScore');
  const gamesEl = document.getElementById('profileGamesPlayed');
  if (totalEl) totalEl.textContent = newTotal.toLocaleString();
  if (gamesEl) gamesEl.textContent = newGames;
}

// ================= 12. MODALS (GAME DETAILS & TRAILER) =================
function initModals() {
  // Game Details Modal
  const gameModal = document.getElementById('gameModal');
  const closeGameModal = document.getElementById('closeGameModal');
  if (closeGameModal && gameModal) {
    closeGameModal.addEventListener('click', () => gameModal.classList.remove('active'));
  }

  // Trailer Modal
  const trailerModal = document.getElementById('trailerModal');
  const watchTrailerBtn = document.getElementById('watchTrailerBtn');
  const closeTrailerModal = document.getElementById('closeTrailerModal');

  if (watchTrailerBtn && trailerModal) {
    watchTrailerBtn.addEventListener('click', () => {
      trailerModal.classList.add('active');
      if (window.soundFX) window.soundFX.playScore();
    });
  }
  if (closeTrailerModal && trailerModal) {
    closeTrailerModal.addEventListener('click', () => trailerModal.classList.remove('active'));
  }

  // Close modals when clicking backdrop
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('active');
      }
    });
  });

  // Jump from trailer to arcade
  document.querySelectorAll('.jump-to-arcade-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      trailerModal.classList.remove('active');
      document.getElementById('arcade-section').scrollIntoView({ behavior: 'smooth' });
      document.getElementById('startArcadeGameBtn')?.click();
    });
  });

  // Tournament registration buttons
  document.querySelectorAll('.join-tourney-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-tourney');
      showToast(`Squad [${AppState.gamerTag}] confirmed for ${name}! Bracket link transmitted.`, 'fa-solid fa-trophy');
      btn.textContent = 'REGISTERED ✓';
      btn.disabled = true;
      btn.classList.add('btn-ghost');
      if (window.soundFX) window.soundFX.playPowerup();
    });
  });
}

function openGameDetails(gameId) {
  const game = GAMES_CATALOG.find(g => g.id === gameId);
  if (!game) return;

  const modal = document.getElementById('gameModal');
  document.getElementById('modalImg').src = game.image;
  document.getElementById('modalGenre').textContent = game.genre.toUpperCase();
  document.getElementById('modalRating').innerHTML = `<i class="fa-solid fa-star"></i> ${game.rating}`;
  document.getElementById('modalTitle').textContent = game.title;
  document.getElementById('modalPrice').textContent = game.price;
  document.getElementById('modalDesc').textContent = game.desc;
  document.getElementById('modalDev').textContent = game.developer;
  document.getElementById('modalRelease').textContent = game.release;
  document.getElementById('modalPlayers').textContent = game.players;

  const playBtn = document.getElementById('modalPlayBtn');
  const wishlistBtn = document.getElementById('modalWishlistBtn');

  if (game.isPlayable) {
    playBtn.innerHTML = '<i class="fa-solid fa-gamepad"></i> LAUNCH IN BROWSER';
    playBtn.onclick = () => {
      modal.classList.remove('active');
      const targetTab = document.querySelector(`.arcade-tab[data-game="${game.arcadeType}"]`);
      if (targetTab) targetTab.click();
      document.getElementById('arcade-section').scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        document.getElementById('startArcadeGameBtn')?.click();
      }, 700);
    };
  } else {
    playBtn.innerHTML = '<i class="fa-solid fa-download"></i> GET GAME CLIENT';
    playBtn.onclick = () => {
      showToast(`Initiating download protocol for ${game.title}...`, 'fa-solid fa-cloud-arrow-down');
    };
  }

  wishlistBtn.onclick = () => {
    toggleWishlist(game.id);
  };

  modal.classList.add('active');
  if (window.soundFX) window.soundFX.playClick();
}

// ================= 13. LIVE COUNTER & NEWSLETTER =================
function initLiveCounter() {
  const counter = document.getElementById('liveCounter');
  if (!counter) return;

  let current = 14892;
  setInterval(() => {
    const delta = Math.floor(Math.random() * 21) - 10;
    current = Math.max(12000, current + delta);
    counter.textContent = current.toLocaleString();
  }, 4500);
}

function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  const success = document.getElementById('newsletterSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletterEmail').value;
      if (email) {
        form.style.display = 'none';
        if (success) success.style.display = 'block';
        if (window.soundFX) window.soundFX.playPowerup();
        showToast('Secret Drop Code sent to ' + email, 'fa-solid fa-gift');
      }
    });
  }
}
