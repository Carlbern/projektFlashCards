import { Kort } from "./kort.class.js";
export class Kortlek {
    constructor(namn, sprak, kort) {
        this.namn = namn;
        this.sprak = sprak;
        this.kortArray = kort;
    }
    printList() {
        var _a;
        (_a = this.kortArray) === null || _a === void 0 ? void 0 : _a.forEach((element) => {
            console.log(element.sprakEttOrd);
        });
    }
    addCard(sprakEttOrd, sprakTvaOrd) {
        var _a;
        let tempKort = new Kort(sprakEttOrd, sprakTvaOrd);
        (_a = this.kortArray) === null || _a === void 0 ? void 0 : _a.push(tempKort);
    }
    slumpaKort() { }
    spelaKortlek() {
        console.log("Knappen använd");
        document.getElementById("kort").innerHTML += `
    <p id="sprakEttText">${this.kortArray[0].sprakEttOrd}</p>
    <hr />
    <p id="sprakTvaText">${this.kortArray[0].sprakTvaOrd}</p>
          
    
      <button id="nastaKortBtn">Nästa kort</button>
    <div id="spelBtns">
      <button id="rattKortBtn">Rätt</button
      ><button id="felKortBtn">Fel</button>`;
        document.querySelector("hr").style.display = "block";
    }
}
//Tar in en array som innerhåller element av typen "Kortlekar"
//Skapar sedan div-element av varje "kortlek" som syns på hemsidan
export function printKortlekar(kortlekar) {
    kortlekar.forEach((element) => {
        //Skapar huvudcontainer av kortlek
        const CONTAINER = document.createElement("div");
        CONTAINER.className = "kortlek";
        //Skapar text för språk på kortlek
        const SPRAK = document.createElement("div");
        SPRAK.className = "kortleksprak";
        SPRAK.innerHTML = `<p>${element.sprak}</p>`;
        //Skapar text för namnet på kortleken
        const NAMN = document.createElement("div");
        NAMN.className = "kortleknamn";
        NAMN.innerHTML = `<p>${element.namn}</p>`;
        //Skapar knapp och en eventListener som används som är kopplat till detta specifika element
        const BUTTON = document.createElement("button");
        BUTTON.className = "kortleksbtn";
        BUTTON.textContent = "Klicka för att spela med denna kortlek";
        BUTTON.addEventListener("click", () => spelaKortleken(element));
        //Lägger till "barnen" i huvudcontainern
        CONTAINER.appendChild(SPRAK);
        CONTAINER.appendChild(NAMN);
        CONTAINER.appendChild(BUTTON);
        //Lägger till allt inom "kortlekar" div på DOM
        document.getElementById("kortlekar").appendChild(CONTAINER);
    });
}
function spelaKortleken(kortlek) {
    const NASTA_KNAPP = document.getElementById("nastaKortBtn");
    const RATT_FEL_KNAPPAR = document.getElementById("spelBtns");
    const VISA_KORT_KNAPP = document.getElementById("visaKortBtn");
    NASTA_KNAPP.style.display = "none";
    RATT_FEL_KNAPPAR.style.display = "none";
    VISA_KORT_KNAPP.style.display = "block";
    //Steg 1 Man klicka för att se rätt svar
    VISA_KORT_KNAPP.addEventListener("click", () => { });
    //Steg 2
    //Steg 3
}
