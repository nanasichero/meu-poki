const games = [
    // --- JOGOS SANDBOX & MULTIPLAYER ---
    {
        title: "Vectaria.io",
        category: "obby",
        image: "https://images.unsplash.com/photo-1627856013091-fed6e4e30492?w=400",
        url: "https://vectaria.io/",
        external: true
    },
    {
        title: "MineFun.io",
        category: "obby",
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400",
        url: "https://minefun.io/",
        external: true
    },

    // --- PUZZLE & LÓGICA ---
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

    // --- CLÁSSICOS RETrô E ARCADE (Sem distribuidoras) ---
    {
        title: "Pac-Man (Retro)",
        category: "acao",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400",
        url: "https://masonicboom.github.io/pacman/", // Versão open-source clássica
        external: false
    },
    {
        title: "Flappy Bird JS",
        category: "acao",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400",
        url: "https://surgeme.github.io/flappybird/", // Versão limpa independente
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
        
        // Se o jogo exigir tela cheia externa (como Vectaria e MineFun), abre direto.
        if (game.external) {
            card.href = game.url;
            card.target = "_blank";
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
