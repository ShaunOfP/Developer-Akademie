let currentPokemon;


async function loadPokemon(id) {
    let idFix = id + 1;
    let url = `https://pokeapi.co/api/v2/pokemon/${idFix}`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    renderPokemonHeaderInfo();
}


function renderPokemonHeaderInfo() {
    let pokemonName = fixFirstLetter(currentPokemon['name']);
    let pokemonTypeLength = currentPokemon['types'];

    let currentBackgroundColor = colorFinder();
    document.getElementById('pokedex').style.backgroundColor = currentBackgroundColor;

    document.getElementById('pokemonType').innerHTML = "";

    document.getElementById('pokemonInfoImage').src = currentPokemon['sprites']['front_default'];
    document.getElementById('pokemonName').innerHTML = pokemonName;
    document.getElementById('pokemonId').innerHTML = currentPokemon['id'];

    for (let i = 0; i < pokemonTypeLength.length; i++) {
        let pokeType = fixFirstLetter(currentPokemon['types'][i]['type']['name']);
        const typeDiv = document.createElement("div");
        typeDiv.innerHTML = pokeType;
        document.getElementById('pokemonType').appendChild(typeDiv).classList.add("pokemon-info-type-styling");
    }
    renderAboutInfo();
}


function colorFinder() {
    for (let i = 0; i < allPokemon.length; i++) {
        if (allPokemonData[i]['name'] == currentPokemon['name']) {
            return allPokemonData[i]['color'];
        }
    }
}


function fixFirstLetter(unfixedString) {
    let firstLetterUppderCase = unfixedString.charAt(0).toUpperCase();
    let completeString = firstLetterUppderCase + unfixedString.slice(1);
    return completeString;
}


function showPokedex() {
    document.getElementById('pokemonContainer').classList.remove('dp-none');
    document.getElementById('main-headline').classList.remove('dp-none');
    document.getElementById('pokedexContainer').classList.add('dp-none');
}


function renderAboutInfo() {
    let content = document.getElementById('pokeinfo-details');

    content.innerHTML = '';

    if(currentPokemon['abilities'].length == 1){
        content.innerHTML = `
        <div class="render-info">
            <div class="render-info-overall">
                <div class="render-info-measures">
                    <div class="render-info-title">Species</div>                    
                    <div class="render-info-title">Height</div>                    
                    <div class="render-info-title">Weight</div>
                    <div class="render-info-title">Abilities</div>
                </div>
                <div>
                    <div class="render-info-data">n/a</div>
                    <div class="render-info-data">n/a</div>
                    <div class="render-info-data">${currentPokemon['weight'] + "00 grams"}</div>
                    <div class="render-info-data">${fixFirstLetter(currentPokemon['abilities'][0]['ability']['name'])}</div>
                </div>
            </div>

            <span class="render-info-second-headline">Breeding</span>

            <div class="render-info-second-container">
                <div class="render-info-measures">
                    <div class="render-info-title">Gender</div>
                    <div class="render-info-title">Egg Groups</div>
                    <div class="render-info-title">Egg Cycle</div>                
                </div>
                <div>
                    <div class="render-info-data">ghfghfgh</div>
                    <div class="render-info-data">X</div>
                    <div class="render-info-data">X</div>                
                </div>
            </div>
            
        </div>
    `;
    } else {
    content.innerHTML = `
        <div class="render-info">
            <div class="render-info-overall">
                <div class="render-info-measures">
                    <div class="render-info-title">Species</div>                    
                    <div class="render-info-title">Height</div>                    
                    <div class="render-info-title">Weight</div>
                    <div class="render-info-title">Abilities</div>
                </div>
                <div>
                    <div class="render-info-data">n/a</div>
                    <div class="render-info-data">n/a</div>
                    <div class="render-info-data">${currentPokemon['weight'] + "00 grams"}</div>
                    <div class="render-info-data">${fixFirstLetter(currentPokemon['abilities'][0]['ability']['name']) + ", " + fixFirstLetter(currentPokemon['abilities'][1]['ability']['name'])}</div>
                </div>
            </div>

            <span class="render-info-second-headline">Breeding</span>

            <div class="render-info-second-container">
                <div class="render-info-measures">
                    <div class="render-info-title">Gender</div>
                    <div class="render-info-title">Egg Groups</div>
                    <div class="render-info-title">Egg Cycle</div>                
                </div>
                <div>
                    <div class="render-info-data">ghfghfgh</div>
                    <div class="render-info-data">X</div>
                    <div class="render-info-data">X</div>                
                </div>
            </div>
            
        </div>
    `;
    }
}


function renderBaseStatsInfo() {
    let content = document.getElementById('pokeinfo-details');

    content.innerHTML = `
        <div class="render-info">
            <div class="render-info-overall">
                <div class="render-info-measures">
                    <div class="render-info-title">HP</div>                    
                    <div class="render-info-title">Attack</div>                    
                    <div class="render-info-title">Defense</div>
                    <div class="render-info-title">Sp. Atk</div>
                    <div class="render-info-title">Sp. Def</div>
                    <div class="render-info-title">Speed</div>
                </div>
                <div>
                    <div class="render-info-data">${currentPokemon['stats']['0']['base_stat']}</div>
                    <div class="render-info-data">${currentPokemon['stats']['1']['base_stat']}</div>
                    <div class="render-info-data">${currentPokemon['stats']['2']['base_stat']}</div>
                    <div class="render-info-data">${currentPokemon['stats']['3']['base_stat']}</div>
                    <div class="render-info-data">${currentPokemon['stats']['4']['base_stat']}</div>
                    <div class="render-info-data">${currentPokemon['stats']['5']['base_stat']}</div>
                </div>
            </div>

            <span class="render-info-second-headline">Type defenses</span>

            <div class="render-info-second-container">
                <div class="render-info-measures">
                    <div class="render-info-title">n/a</div>              
                </div>
                <div>
                    <div class="render-info-data">n/a</div>              
                </div>
            </div>
            
        </div>
    `;
}


function renderEvolutionInfo() {
    let content = document.getElementById('pokeinfo-details');

    content.innerHTML = `
        <div class="render-info">
            <span>evolves to:</span>
            <div>
                img
            </div>
        

            <span class="render-info-second-headline">Type defenses</span>

            <div class="render-info-second-container">
                <div class="render-info-measures">
                    <div class="render-info-title">n/a</div>              
                </div>
                <div>
                    <div class="render-info-data">n/a</div>              
                </div>
            </div>
            
        </div>
    `;
}


function renderMovesInfo() {
    let content = document.getElementById('pokeinfo-details');
}