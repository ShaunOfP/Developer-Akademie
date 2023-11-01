let bundeslaender = [];
let filterLetters = [];

async function init() {
    let resp = await fetch('./bundesland.json');
    bundeslaender = await resp.json();

    renderCountryCards();
}


function renderCountryCards(filter) {
    let content = document.getElementById('content');
    content.innerHTML = ``;

    for (let i = 0; i < bundeslaender.length; i++) {
        const land = bundeslaender[i];
        const population = (bundeslaender[i]['population'] + '').replace('.', ',');
        const letters = land['name'].charAt(0);

        if (!filter || filter == letters){
            content.innerHTML += generateContent(land, population);
        }

        if(!filterLetters.includes(letters)){
            filterLetters.push(letters);
        }
    }
    renderLetters();
}


function setFilter(letter){
    renderCountryCards(letter);
}


function renderLetters(){
    let filterContent = document.getElementById('letters');
    filterContent.innerHTML = '';

    for (let i = 0; i < filterLetters.length; i++) {
        const letter = filterLetters[i];
        filterContent.innerHTML += `
            <div class="letter-box" onclick="setFilter('${letter}')">${letter}</div>
        `;
    }
}


function generateContent(land, population){
    return `
        <a class="card" href="${land['url']}" title="${land['url']}" target="_blank">
            <div>${land['name']}</div>
            <div class="country-population">${population} Millionen</div>
        </a>
    `;
}