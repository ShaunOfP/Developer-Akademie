let currentPokemon;
let evolutions = [];
let evolutionFormsCurrentPokemon = [];
let everySinglePokeInfo = [];


async function loadPokemon(id) {
    let idFix = id + 1;
    let url = `https://pokeapi.co/api/v2/pokemon/${idFix}`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    await getGender();
    await gatherAllInformation();
    renderPokemonHeaderInfo();
}


function renderPokemonHeaderInfo() {
    let pokemonName = fixFirstLetter(currentPokemon['name']);
    let pokemonTypeLength = currentPokemon['types'];
    let currentBackgroundColor = colorFinder();

    document.getElementById('pokedex').style.backgroundColor = currentBackgroundColor;
    document.getElementById('pokemonType').innerHTML = "";
    document.getElementById('pokemonInfoImage').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('pokemonName').innerHTML = pokemonName;
    document.getElementById('pokemonId').innerHTML = currentPokemon['id'];

    for (let i = 0; i < pokemonTypeLength.length; i++) {
        let pokeType = fixFirstLetter(currentPokemon['types'][i]['type']['name']);
        const typeDiv = document.createElement("div");
        typeDiv.innerHTML = pokeType;
        document.getElementById('pokemonType').appendChild(typeDiv).classList.add("pokemon-info-type-styling");
    }
    renderAboutInfo();
    pushEvolutionsToArray();
}


function colorFinder() {
    for (let i = 0; i < allPokemon.length; i++) {
        if (allPokemonData[i]['name'] == currentPokemon['name']) {
            let PokeInfoBgColor = allPokemonData[i]['color'];
            switch (PokeInfoBgColor) {
                case 'red':
                    return '#a51212';
                case 'white':
                    return '#dddddd';
                case 'blue':
                    return '#0000bd';
                case 'yellow':
                    return '#caca00';
                case 'brown':
                    return '#381613';
                case 'green':
                    return '#008000';
                case 'black':
                    return '#000000';
                case 'gray':
                    return '#808080';
                case 'pink':
                    return '#FFC0CB';
                case 'purple':
                    return '#800080';
                default:
                    alert("BGC not found!");
            }
        }
    }
}


async function getGender() {
    let femaleUrl = `https://pokeapi.co/api/v2/gender/1/`;
    let femaleAnswer = await fetch(femaleUrl);
    let femaleGender = await femaleAnswer.json();

    let maleUrl = `https://pokeapi.co/api/v2/gender/2/`;
    let maleAnswer = await fetch(maleUrl);
    let maleGender = await maleAnswer.json();

    let femaleResponse = femaleNumber(femaleGender);
    let maleResponse = maleNumber(maleGender);

    if (femaleResponse + maleResponse == 2) {
        return 'Male, Female';
    } else if (femaleResponse + maleResponse == 1) {
        if (femaleResponse == 1) {
            return 'Female';
        } else if (maleResponse == 1) {
            return 'Male';
        }
    } else {
        return 'Genderless';
    }
}


async function gatherAllInformation() {
    for (let i = 0; i < allPokemon.length; i++) {
        let singlePokemon = allPokemon[i];

        let url = `https://pokeapi.co/api/v2/pokemon/${singlePokemon}`;
        let response = await fetch(url);
        let responseJson = await response.json();

        everySinglePokeInfo.push(responseJson);
    }
}


function femaleNumber(data) {
    for (let j = 0; j < data['pokemon_species_details'].length; j++) {
        if (data['pokemon_species_details'][j]['pokemon_species']['name'] == currentPokemon['name']) {
            return 1;
        } else {
            return 0;
        }
    }
}


function maleNumber(data) {
    for (let k = 0; k < data['pokemon_species_details'].length; k++) {
        if (data['pokemon_species_details'][k]['pokemon_species']['name'] == currentPokemon['name']) {
            return 1;
        } else {
            return 0;
        }
    }
}


async function renderAboutInfo() {
    let content = document.getElementById('pokeinfo-details');

    content.innerHTML = '';

    if (currentPokemon['abilities'].length == 1) {
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
                    <div class="render-info-data">${currentPokemon['height']}</div>
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
                    <div class="render-info-data">${await getGender()}</div>
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
                    <div class="render-info-data">${currentPokemon['height'] + "0 cm"}</div>
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
                    <div class="render-info-data">${await getGender()}</div>
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


async function pushEvolutionsToArray() {
    //543
    for (let i = 1; i <= 27; i++) {
        if (i == 210 || i == 222 || i == 225 || i == 226 || i == 227 || i == 231 || i == 238 || i == 251) {
            continue;
        }

        let evolutionUrl = `https://pokeapi.co/api/v2/evolution-chain/${i}/`;
        let evolutionResponse = await fetch(evolutionUrl);
        let evolutionInfo = await evolutionResponse.json();

        if (evolutionInfo['chain']['evolves_to'] == 0) {
            let dataFeed = {
                'baseForm': evolutionInfo['chain']['species']['name'],
                'firstEvolution': '',
                'secondEvolution': '',
                'baseSprite': updateSpritesInArray(evolutionInfo['chain']['species']['name']),
                'firstEvoSprite': '',
                'secondEvoSprite': ''
            };
            evolutionFormsCurrentPokemon.push(dataFeed);
        } else if (evolutionInfo['chain']['evolves_to'][0]['evolves_to'].length != 0) {
            let dataFeed = {
                'baseForm': evolutionInfo['chain']['species']['name'],
                'firstEvolution': evolutionInfo['chain']['evolves_to'][0]['species']['name'],
                'secondEvolution': evolutionInfo['chain']['evolves_to'][0]['evolves_to'][0]['species']['name'],
                'baseSprite': updateSpritesInArray(evolutionInfo['chain']['species']['name']),
                'firstEvoSprite': updateSpritesInArray(evolutionInfo['chain']['evolves_to'][0]['species']['name']),
                'secondEvoSprite': updateSpritesInArray(evolutionInfo['chain']['evolves_to'][0]['evolves_to'][0]['species']['name'])
            };
            evolutionFormsCurrentPokemon.push(dataFeed);
        } else {
            let dataFeed = {
                'baseForm': evolutionInfo['chain']['species']['name'],
                'firstEvolution': evolutionInfo['chain']['evolves_to'][0]['species']['name'],
                'secondEvolution': '',
                'baseSprite': updateSpritesInArray(evolutionInfo['chain']['species']['name']),
                'firstEvoSprite': updateSpritesInArray(evolutionInfo['chain']['evolves_to'][0]['species']['name']),
                'secondEvoSprite': ''
            }
            evolutionFormsCurrentPokemon.push(dataFeed);
        }
    }
}


function updateSpritesInArray(nameForImage){
    for(let i = 0; i < everySinglePokeInfo.length; i++){
        if (nameForImage == everySinglePokeInfo[i]['name']){
            return everySinglePokeInfo[i]['sprites']['front_default'];
        }
    }
}


async function renderEvolutionInfo() {
    let content = document.getElementById('pokeinfo-details');

    for (let i = 0; i < evolutionFormsCurrentPokemon.length; i++) {
        for (let j = 0; j < everySinglePokeInfo.length; j++) {
            //hier aufgehört

            if (currentPokemon['name'] == evolutionFormsCurrentPokemon[i]['baseForm']) {
                content.innerHTML = `
                <div class="render-info">
                    <span>evolves to:</span>
                    <div class="render-evolution-info">
                        <div class="evolve-frame">
                            <div>
                                <img src=${evolutionFormsCurrentPokemon[j]['firstEvoSprite']}>
                            </div>
                            <div class="evolution-box-text">
                                ${fixFirstLetter(evolutionFormsCurrentPokemon[j]['firstEvolution'])}
                            </div>
                        </div>
                        <div class="evolve-frame">
                            <div>
                                <img src=${evolutionFormsCurrentPokemon[j]['secondEvoSprite']}>
                            </div>
                            <div class="evolution-box-text">
                                ${fixFirstLetter(evolutionFormsCurrentPokemon[j]['secondEvolution'])}
                            </div>
                        </div>
                    </div>
                </div>
                `;
                break;
            } else if (currentPokemon['name'] == evolutionFormsCurrentPokemon[i]['firstEvolution']) {

            } else if (currentPokemon['name'] == evolutionFormsCurrentPokemon[i]['secondEvolution']) {

            }
        }
    }
}

    // let firstEvolution = evolutions['chain']['evolves_to'][0]['species']['name'];
    // let firstUrl = `https://pokeapi.co/api/v2/pokemon/${firstEvolution}`;
    // let firstResponse = await fetch(firstUrl);
    // let firstEvolutionInfo = await firstResponse.json();

    // let secondEvolution = evolutions['chain']['evolves_to'][0]['evolves_to'][0]['species']['name'];
    // let secondUrl = `https://pokeapi.co/api/v2/pokemon/${secondEvolution}`;
    // let secondResponse = await fetch(secondUrl);
    // let secondEvolutionInfo = await secondResponse.json();

    // if (evolutions['chain']['species']['name'] == currentPokemon['name']) {
    //     if (evolutions['chain']['evolves_to'][0]['evolves_to'].length == 0) {
    //         content.innerHTML = `
    //             <div class="render-info">
    //                 <span>evolves to:</span>
    //                 <div class="render-evolution-info">
    //                     <div class="evolve-frame">
    //                         <div>
    //                             <img src=${firstEvolutionInfo['sprites']['front_default']}>
    //                         </div>
    //                         <div class="evolution-box-text">
    //                             ${fixFirstLetter(firstEvolution)}
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //             `;
    //     } else {
    //         content.innerHTML = `
    //             <div class="render-info">
    //                 <span>evolves to:</span>
    //                 <div class="render-evolution-info">
    //                     <div class="evolve-frame">
    //                         <div>
    //                             <img src=${firstEvolutionInfo['sprites']['front_default']}>
    //                         </div>
    //                         <div class="evolution-box-text">
    //                             ${fixFirstLetter(firstEvolution)}
    //                         </div>
    //                     </div>
    //                     <div class="evolve-frame">
    //                         <div>
    //                             <img src=${secondEvolutionInfo['sprites']['front_default']}>
    //                         </div>
    //                         <div class="evolution-box-text">
    //                             ${fixFirstLetter(secondEvolution)}
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //             `;
    //     }
    // } else if (currentPokemon['name'] == evolutions['chain']['evolves_to'][0]['species']['name']) {
    //     //erste entwicklung
    //     let baseUrl = `https://pokeapi.co/api/v2/pokemon/${currentPokemon['id'] - 1}`;
    //     let baseResponse = await fetch(baseUrl);
    //     let baseForm = await baseResponse.json();

    //     content.innerHTML = `
    //         <div class="render-info">
    //             <span>evolves to:</span>
    //             <div class="render-evolution-info">
    //                 <div class="evolve-frame">
    //                     <div>
    //                         <img src=${baseForm['sprites']['front_default']}>
    //                     </div>
    //                     <div class="evolution-box-text">
    //                         ${fixFirstLetter(baseForm['name'])}
    //                     </div>
    //                 </div>
    //                 <div class="evolve-frame">
    //                     <div>
    //                         <img src=${secondEvolutionInfo['sprites']['front_default']}>
    //                     </div>
    //                     <div class="evolution-box-text">
    //                         ${fixFirstLetter(secondEvolution)}
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //         `;
    // } else if (currentPokemon['name'] == evolutions['chain']['evolves_to'][0]['evolves_to'][0]['species']['name']) {
    //     //zweite Entwicklung
    //     let baseUrl = `https://pokeapi.co/api/v2/pokemon/${currentPokemon['id'] - 2}`;
    //     let baseResponse = await fetch(baseUrl);
    //     let baseForm = await baseResponse.json();

    //     content.innerHTML = `
    //         <div class="render-info">
    //             <span>evolves to:</span>
    //             <div class="render-evolution-info">
    //                 <div class="evolve-frame">
    //                     <div>
    //                         <img src=${baseForm['sprites']['front_default']}>
    //                     </div>
    //                     <div class="evolution-box-text">
    //                         ${fixFirstLetter(baseForm['name'])}
    //                     </div>
    //                 </div>
    //                 <div class="evolve-frame">
    //                     <div>
    //                         <img src=${firstEvolutionInfo['sprites']['front_default']}>
    //                     </div>
    //                     <div class="evolution-box-text">
    //                         ${fixFirstLetter(firstEvolution)}
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>            
    //         `;
    // } else {
    //     content.innerHTML = `
    //             <div class="render-info">
    //                 <div>
    //                     <b>There are no evolutions for ${fixFirstLetter(currentPokemon['name'])}</b>
    //                 </div>

    //                 <span class="render-info-second-headline">Type defenses</span>

    //                 <div class="render-info-second-container">
    //                     <div class="render-info-measures">
    //                         <div class="render-info-title">n/a</div>              
    //                     </div>
    //                     <div>
    //                         <div class="render-info-data">n/a</div>              
    //                     </div>
    //                 </div> 
    //             </div>
    //         `;
    // }



async function renderMovesInfo() {
    let content = document.getElementById('pokeinfo-details');

    content.innerHTML = ``;

    for (let i = 0; i < currentPokemon['moves'].length; i++) {
        content.innerHTML += `
            <div class="render-info-title m-left">      
                ${fixFirstLetter(currentPokemon['moves'][i]['move']['name'])}
            </div>
        `;
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
    document.getElementById('body').classList.remove('bg-white');
}