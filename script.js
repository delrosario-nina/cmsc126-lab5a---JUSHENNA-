let allHeroes = [];

/* For the sake of displaying the hero name only */
function toTitleCase(str) {
    return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

/* Function for retrieving all the heroes */
async function fetchAllHeroes() {
    try {
        //fetch DOTA 2 API with error catching
        const response = await fetch('https://api.opendota.com/api/heroes');
        if (!response.ok) throw new Error('Could not fetch resource');

        //fetch the heroes with error catching
        allHeroes = await response.json();
        displayHeroes(allHeroes);
    } catch (error) {
        console.error(error);
    }
}

/* Displaying all the heroes retrieved */
function displayHeroes(heroes) {
    const heroesContainer = document.getElementById("heroesContainer");
    heroesContainer.innerHTML = '';

    heroes.forEach(hero => {
        const displayName = hero.localized_name;
        
        //formatting the name by using the internal naming provided by the API
        const formattedName = hero.name.replace('npc_dota_hero_', '');
        
        const spriteURL = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${formattedName}.png`;

        const card = document.createElement('div');
        card.className = 'hero-card';

        //creating the inner container for flipping
        const innerCard = document.createElement('div');
        innerCard.className = 'hero-card-inner';

        const cardFront = document.createElement('div');
        cardFront.className = 'hero-card-front';
        
        const img = document.createElement('img');
        img.src = spriteURL;
        img.alt = displayName;

        const nameDiv = document.createElement('div');
        nameDiv.className = 'hero-name';
        nameDiv.textContent = displayName;

        const rolesDiv = document.createElement('div');
        rolesDiv.className = 'hero-roles';
        rolesDiv.textContent = hero.roles.join(', ');

        cardFront.appendChild(img);
        cardFront.appendChild(nameDiv);
        cardFront.appendChild(rolesDiv);

        const backCard = document.createElement('div');
        backCard.className = 'hero-card-back';

        const infoDiv = document.createElement('div');
        infoDiv.className = 'hero-info';
        infoDiv.innerHTML = `
            <strong>Localized Name:</strong><br> ${hero.localized_name}<br>
            <strong>Primary Attribute:</strong> ${hero.primary_attr.toUpperCase()}<br>
            <strong>Attack Type:</strong> ${hero.attack_type}<br>
            <strong>Roles:</strong> ${hero.roles.join(', ')}
        `;

        backCard.appendChild(infoDiv);

        //assemble the card
        innerCard.appendChild(cardFront);
        innerCard.appendChild(backCard);
        card.appendChild(innerCard);

        //flip card on click
        card.addEventListener('click', () => {
            innerCard.classList.toggle('flipped');
        });

        heroesContainer.appendChild(card);
    });
}

// for the search function
function filterHeroes() {
    const name = document.getElementById("searchBar").value.toLowerCase();
    const filteredHeroes = allHeroes.filter(hero =>
        hero.localized_name.toLowerCase().includes(name)
    );

    if (!filterHeroes){
        document.getElementById("heroesContainer").innerHTML = `<h1>Hero not found</h1>`
    }
    displayHeroes(filteredHeroes);
}

// Fetch heroes when page loads
window.onload = fetchAllHeroes;
