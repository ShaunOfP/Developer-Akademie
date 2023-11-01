// 1. Möglichkeit
function init() { //fetch().then()  then kann zwei funktionen beinhalten, eine für true, eine für false
    fetch('bundesland.json').then(() => { //then ist wie if else, das erste () => steht für erfolg, das zweite () => steht für fehler
        console.log('Fertig');
    }, () => { // () => ist kurze schreibweise für eine Funktion, welche aufgerufen wird
        console.log('Fehler aufgetreten');
    });
}


// 2. Möglichkeit
async function init() { //async function weil sonst await nicht funktioniert
    try { //try versucht den Block innerhalb auszuführen
        await fetch('bundesland.json');
        console.log('Fertig');
    } catch (e) { //catch greift, wenn ein Fehler (e) auftritt
        console.log('Fehler aufgetreten');
    }
}


// 3. Möglichkeit
async function init() {
    await fetch('bundesland.json').catch(errorFunction); //fetch().catch() greift, wenn Fehler auftritt und nimmt namen für Funktion, welche im Fehlerfall ausgeführt wird
    console.log('Fertig');
}

function errorFunction() {
    console.log('Fehler aufgetreten');
}


// 4. Möglichkeit
async function init() {
    let [resp, err] = await resolve(fetch('bundesland.json')); //promise wird in resolve Funktion übergeben
    if (resp) {
        console.log('Fertig');
    } 
    
    if(err){
        console.error('Fehler');
    }
}

async function resovle(p) { //p ist promise, welches in die Funktion gegeben wird
    try {
        let response = await p;
        return [response, null]; //werte für die beiden if-Schleifen in init()
    } catch (e) {
        return [null, e];
    }
}