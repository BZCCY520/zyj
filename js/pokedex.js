const pokemonData = [
    {
        id: 25,
        name: "滚球兽",
        types: ["electric"],
        image: "images/98ac4923e002bc4ee65e134f66a3a6ff.jpeg",
        height: 0.4,
        weight: 6.0,
        ability: "滚球",
        stats: {
            hp: 35,
            attack: 55,
            defense: 40,
            spAtk: 50,
            spDef: 50,
            speed: 90
        },
        evolution: ["滚球", "滚球", "滚滚球"],
        description: "当多只滚球兽聚集时，它们可能会引发大规模的滚球。这只可爱的滚球兽会用脸颊储存电力。"
    },
    {
        id: 6,
        name: "奥米加兽",
        types: ["fire", "flying"],
        image: "images/5.png",
        height: 1.7,
        weight: 90.5,
        ability: "疫苗",
        stats: {
            hp: 78,
            attack: 84,
            defense: 78,
            spAtk: 109,
            spDef: 85,
            speed: 100
        },
        evolution: ["奥米加兽", "奥米加兽", "奥米加兽"],
        description: "病毒克星（Virus Buster）战斗暴龙兽和金属加鲁鲁兽，因期待善行的人们的强烈意志，融合而诞生的「皇家骑士」其中一员的圣骑士型数码兽。"
    },
    {
        id: 9,
        name: "杰斯兽",
        types: ["fire", "flying"],
        image: "images/6.png",
        height: 1.7,
        weight: 90.5,
        ability: "数据",
        stats: {
            hp: 78,
            attack: 84,
            defense: 78,
            spAtk: 109,
            spDef: 85,
            speed: 100
        },
        evolution: ["杰斯兽", "杰斯兽", "杰斯兽"],
        description: "救星哈克兽胸口的水晶闪闪发光，超越完全成为究极形态的圣骑士数码兽，并获得位于网络安全最高位的「皇家骑士」的称号。"
    },
];

const searchInput = document.getElementById('pokemon-search');
const typeFilter = document.getElementById('type-filter');
const sortOption = document.getElementById('sort-option');
const pokemonList = document.querySelector('.pokemon-list');
const modal = document.getElementById('pokemon-modal');
const modalContent = modal.querySelector('.modal-content');
const closeModal = modal.querySelector('.close-modal');
const pagination = document.querySelector('.pagination');

const itemsPerPage = 12;
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    renderPokemonList(pokemonData);
    setupEventListeners();
});

function setupEventListeners() {
    searchInput.addEventListener('input', filterPokemon);
    
    typeFilter.addEventListener('change', filterPokemon);
    
    sortOption.addEventListener('change', filterPokemon);
    
    closeModal.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
    
    document.querySelectorAll('.pagination button').forEach(button => {
        button.addEventListener('click', handlePagination);
    });
}

function renderPokemonList(pokemon, page = 1) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedPokemon = pokemon.slice(start, end);
    
    pokemonList.innerHTML = paginatedPokemon.map(pokemon => `
        <div class="pokemon-card" data-type="${pokemon.types.join(',')}" data-id="${pokemon.id}">
            <span class="pokemon-number">#${String(pokemon.id).padStart(3, '0')}</span>
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <h2>${pokemon.name}</h2>
            <div class="type-badges">
                ${pokemon.types.map(type => `
                    <span class="type-badge ${type}">${getTypeInChinese(type)}</span>
                `).join('')}
            </div>
            <div class="pokemon-info">
                <p><strong>特性：</strong>${pokemon.ability}</p>
                <p><strong>身高：</strong>${pokemon.height} m</p>
                <p><strong>体重：</strong>${pokemon.weight} kg</p>
                <div class="evolution-chain">
                    <p><strong>进化：</strong></p>
                    <div class="evolution-steps">
                        ${pokemon.evolution.map((stage, index) => `
                            ${index > 0 ? '<i class="fas fa-arrow-right"></i>' : ''}
                            <span>${stage}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
            <button class="details-btn" onclick="showDetails(${pokemon.id})">查看详情</button>
        </div>
    `).join('');
    
    updatePagination(pokemon.length);
}

function filterPokemon() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedType = typeFilter.value;
    const sortBy = sortOption.value;
    
    let filtered = pokemonData.filter(pokemon => {
        const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm);
        const matchesType = !selectedType || pokemon.types.includes(selectedType);
        return matchesSearch && matchesType;
    });
    
    filtered.sort((a, b) => {
        switch(sortBy) {
            case 'number':
                return a.id - b.id;
            case 'name':
                return a.name.localeCompare(b.name);
            case 'type':
                return a.types[0].localeCompare(b.types[0]);
            default:
                return 0;
        }
    });
    
    currentPage = 1;
    renderPokemonList(filtered);
}

function showDetails(pokemonId) {
    const pokemon = pokemonData.find(p => p.id === pokemonId);
    if (!pokemon) return;
    
    const modalBody = modalContent.querySelector('.modal-body');
    modalBody.innerHTML = `
        <div class="pokemon-detail">
            <h2>${pokemon.name}</h2>
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <div class="stats-container">
                <h3>能力值</h3>
                <div class="stats-grid">
                    ${Object.entries(pokemon.stats).map(([stat, value]) => `
                        <div class="stat-item">
                            <span class="stat-name">${getStatInChinese(stat)}</span>
                            <div class="stat-bar">
                                <div class="stat-fill" style="width: ${value/2}%"></div>
                            </div>
                            <span class="stat-value">${value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <p class="pokemon-description">${pokemon.description}</p>
        </div>
    `;
    
    modal.style.display = 'block';
}

function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = document.querySelector('.page-numbers');
    
    pageNumbers.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            pageNumbers.innerHTML += `
                <span class="${i === currentPage ? 'active' : ''}">${i}</span>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            pageNumbers.innerHTML += '<span>...</span>';
        }
    }
}

function handlePagination(event) {
    const button = event.target;
    if (button.classList.contains('prev-page')) {
        if (currentPage > 1) currentPage--;
    } else if (button.classList.contains('next-page')) {
        const totalPages = Math.ceil(pokemonData.length / itemsPerPage);
        if (currentPage < totalPages) currentPage++;
    } else {
        const page = parseInt(button.textContent);
        if (!isNaN(page)) currentPage = page;
    }
    
    filterPokemon();
}

function getTypeInChinese(type) {
    const typeMap = {
        electric: '电气系',
        fire: '火系',
        flying: '飞行系',
        grass: '草系',
        water: '水系',
    };
    return typeMap[type] || type;
}

function getStatInChinese(stat) {
    const statMap = {
        hp: 'HP',
        attack: '攻击',
        defense: '防御',
        spAtk: '特攻',
        spDef: '特防',
        speed: '速度'
    };
    return statMap[stat] || stat;
} 
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('loading');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        observer.observe(img);
    });
});