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
