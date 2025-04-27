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
        //formatting the name so that - for more than one word name is not needed
        let formattedName = displayName.toLowerCase().replace(/[ ]/g, '_').replace(/[\s-]/g, '');

        const spriteURL = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${formattedName}.png`;

        const card = document.createElement('div');
        card.className = 'hero-card';
        
        const img = document.createElement('img');
        img.src = spriteURL;
        img.alt = displayName;

        const nameDiv = document.createElement('div');
        nameDiv.className = 'hero-name';
        nameDiv.textContent = displayName;

        const rolesDiv = document.createElement('div');
        rolesDiv.className = 'hero-roles';
        rolesDiv.textContent = hero.roles.join(', ');

        card.appendChild(img);
        card.appendChild(nameDiv);
        card.appendChild(rolesDiv);

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
