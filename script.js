fetchHero();

/* For the sake of displaying the hero anme only */
function toTitleCase(str) {
    return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  }  

/* Function for retrieving the hero in the search bar */
async function fetchHero(){
    try {
        // get name from search
        const name = document.getElementById("name").value.toLowerCase();  
        // fetch DOTA 2 API with error catching
        const response = await fetch('https://api.opendota.com/api/heroes');                            
        if(!response.ok) throw new Error("Could not fetch resource");                                                           

        // fetch hero with error catching
        const data = await response.json();
        const hero = data.find(h => h.localized_name.toLowerCase() === name);

        if (!hero) {
            throw new Error("Hero not found");
            //insert siguro hero not found within sa html itself nga document innerHTML
        }

        // Get Hero Name
        displayName = toTitleCase(name);
        document.getElementById("heroName").innerHTML = `<h1>${displayName}</h1>`;

        // Get Hero Roles
        document.getElementById("heroRole").innerHTML = `<em>${hero.roles}</em>`;

        // Get Hero Sprites
        displayName = name.replace(/[ ]/g, '_');            // for 2 word names
        displayName = displayName.replace(/[\s-]/g, '');    // for hyphenated names
        const sprite = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${displayName}.png`;     // get sprites
        // Display sprites in HTML
        const imgElement = document.getElementById("sprite");
        imgElement.src = sprite;
        imgElement.style.display = "block";
    }
    catch(error){
        console.error(error);
    }
}