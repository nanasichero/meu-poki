const games = [
    // --- MULTIPLAYER & SANDBOX ---
    {
        title: "Vectaria.io",
        category: "obby",
        image: "https://images.unsplash.com/photo-1627856013091-fed6e4e30492?w=400",
        url: "https://vectaria.io/",
        external: true // Abre direto ou em tela cheia garantida
    },
    {
        title: "MineFun.io",
        category: "obby",
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400",
        url: "https://minefun.io/",
        external: true
    },

    // --- PUZZLE & TROLL ---
    {
        title: "Brain Test: Tricky Puzzles",
        category: "puzzle",
        image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400",
        url: "https://html5.gamedistribution.com/rvvASMiM/brain-test/index.html",
        external: false
    },
    {
        title: "Level Devil",
        category: "obby",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400",
        url: "https://html5.gamedistribution.com/rvvASMiM/level-devil/index.html",
        external: false
    },
    {
        title: "2048 Classic",
        category: "puzzle",
        image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400",
        url: "https://play2048.co/",
        external: false
    },

    // --- FUTEBOL ---
    {
        title: "GoalHeads.io",
        category: "futebol",
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400",
        url: "https://www.gameflare.com/embed/goalheads-io/",
        external: false
    },
    {
        title: "Penalty Shooters 2",
        category: "futebol",
        image: "https://img.gamedistribution.com/571b9df027e449f78e3869ba19658754-512x512.jpeg",
        url: "https://html5.gamedistribution.com/571b9df027e449f78e3869ba19658754/",
        external: false
    },
    {
        title: "Soccer Skills Euro Cup",
        category: "futebol",
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400",
        url: "https://html5.gamedistribution.com/rvvASMiM/soccer-skills-euro-cup/index.html",
        external: false
    },

    // --- OBBY & 3D ---
    {
        title: "Noob Parkour Obby 3D",
        category: "obby",
        image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400",
        url: "https://html5.gamedistribution.com/rvvASMiM/noob-parkour-obby/index.html",
        external: false
    },
    {
        title: "Block Craft 3D Runner",
        category: "obby",
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400",
        url: "https://html5.gamedistribution.com/rvvASMiM/block-craft/index.html",
        external: false
    },

    // --- AÇÃO / RUNNER ---
    {
        title: "Subway Surf Runner",
        category: "acao",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400",
        url: "https://html5.gamedistribution.com/rvvASMiM/subway-surfers/index.html",
        external: false
    },
    {
        title: "Moto X3M",
        category: "acao",
        image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400",
        url: "https://html5.gamedistribution.com/rvvASMiM/moto-x3m/index.html",
        external: false
    }
];

const gamesGrid = document.getElementById('gamesGrid');
const searchInput = document.getElementById('searchInput');
const categoryItems = document.querySelectorAll('.sidebar li');

let currentCategory = 'all';

function displayGames(gamesToDisplay) {
    gamesGrid.innerHTML = '';
    
    if (gamesToDisplay.length === 0) {
        gamesGrid.innerHTML = '<p style="color: #94a3b8;">Nenhum jogo encontrado.</p>';
        return;
    }

    gamesToDisplay.forEach(game => {
        const card = document.createElement('a');
        card.className = 'game-card';
        
        // Se o jogo for externo (bloqueia iframes), abre direto na fonte. Se não, abre no player interno.
        if (game.external) {
            card.href = game.url;
            card.target = "_blank"; // Abre em aba nova sem travar
        } else {
            card.href = `game.html?url=${encodeURIComponent(game.url)}&name=${encodeURIComponent(game.title)}`;
        }
        
        card.innerHTML = `
            <img src="${game.image}" alt="${game.title}">
            <h4>${game.title}</h4>
        `;
        
        gamesGrid.appendChild(card);
    });
}

displayGames(games);

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = games.filter(game => {
        const matchesCategory = currentCategory === 'all' || game.category === currentCategory;
        const matchesSearch = game.title.toLowerCase().includes(term);
        return matchesCategory && matchesSearch;
    });
    displayGames(filtered);
});

categoryItems.forEach(item => {
    item.addEventListener('click', () => {
        categoryItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        currentCategory = item.getAttribute('data-category');
        const term = searchInput.value.toLowerCase();

        const filtered = games.filter(game => {
            const matchesCategory = currentCategory === 'all' || game.category === currentCategory;
            const matchesSearch = game.title.toLowerCase().includes(term);
            return matchesCategory && matchesSearch;
        });

        displayGames(filtered);
    });
});
