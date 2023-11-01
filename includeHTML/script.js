async function init() {
    await includeHTML(); //await, damit element 'headline' erst geladen wird und dann dass innerHTML in der nächsten Zeile geändert wird
    document.getElementById('headline').innerHTML = 'Herzlich willkommen!';
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]'); //sucht im Dokument alle dateien mit w3-include-html
    for (let i = 0; i < includeElements.length; i++) { //iteriert durch die Dateien
        const element = includeElements[i]; //jedes einzelne gefundene Element wird in element gespeichert
        file = element.getAttribute("w3-include-html"); // holt den Dateinamen aus dem Attribut w3-inlude-html -> "includes/header.html"
        let resp = await fetch(file); //holt den Wert aus file und speichert ihn in der resp Variablen
        if (resp.ok) { //prüft, ob wert von resp true oder false ist
            element.innerHTML = await resp.text(); //zeigt den gespeicherten wert 
        } else { 
            element.innerHTML = 'Page not found'; //zeigt Page not found
        }
    }
}