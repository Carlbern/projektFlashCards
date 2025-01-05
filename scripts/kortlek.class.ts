import { Kort } from "./kort.class.js";

export {};

export class Kortlek {
  namn: String;
  sprak: String;
  kortArray?: Kort[];

  constructor(namn: string, sprak: string, kort?: any[]) {
    this.namn = namn;
    this.sprak = sprak;
    this.kortArray = kort;
  }

  printList() {
    this.kortArray?.forEach((element) => {
      console.log(element.sprakEttOrd);
    });
  }

  addCard(sprakEttOrd: String, sprakTvaOrd: String) {
    let tempKort = new Kort(sprakEttOrd, sprakTvaOrd);
    this.kortArray?.push(tempKort);
  }
  slumpaKort() {}

  spelaKortlek() {
    console.log("Knappen använd");
    document.getElementById("kort")!.innerHTML += `
    <p id="sprakEttText">${this.kortArray![0].sprakEttOrd}</p>
    <hr />
    <p id="sprakTvaText">${this.kortArray![0].sprakTvaOrd}</p>
          
    
      <button id="nastaKortBtn">Nästa kort</button>
    <div id="spelBtns">
      <button id="rattKortBtn">Rätt</button
      ><button id="felKortBtn">Fel</button>`;

    document.querySelector("hr")!.style.display = "block";
  }
}
