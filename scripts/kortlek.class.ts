import { Kort } from "./kort.class.js";
import { printKortlekar, resetKortHTML, saveKortlekar } from "./scripts.js";
export {};

let poang: number = 0;
let aktuelltKort: any;
let tempKortlek: Kortlek;
let sprakEttText = document.getElementById("sprakEttText");
let sprakTvaText = document.getElementById("sprakTvaText");
const NASTA_KNAPP = document.getElementById("nastaKortBtn");
const RATT_FEL_KNAPPAR = document.getElementById("spelBtns");
const RATT_KNAPP = document.getElementById("rattKortBtn");
const FEL_KNAPP = document.getElementById("felKortBtn");
const VISA_KORT_KNAPP = document.getElementById("visaKortBtn");

export class Kortlek {
  namn: String;
  sprak: String;
  kortArray?: Kort[];

  constructor(namn: String, sprak: String, kort?: any[]) {
    this.namn = namn;
    this.sprak = sprak;
    this.kortArray = kort;
  }

  //Returnerar ett slumpmässigt ospelat object av typen "Kort"
  //När det inte längre finns kort kvar i lista returneras "false"
  slumpaKort(): any {
    let spelbaraKort: any = [];
    for (let i = 0; i < this.kortArray!.length; i++) {
      if (this.kortArray![i].harSpelats == false) {
        spelbaraKort.push(this.kortArray![i]);
      }
    }

    if (spelbaraKort.length > 0) {
      let slumpTal = Math.floor(Math.random() * spelbaraKort!.length);

      return spelbaraKort[slumpTal];
    } else {
      spelbaraKort = [];
      return false;
    }
  }
  aterStallKort() {
    this.kortArray!.forEach((element) => {
      element.harSpelats = false;
    });
  }

  taBortKortlek(kortlekar: any = []) {
    for (let i = 0; i < kortlekar.length; i++) {
      if (kortlekar[i] === this) {
        kortlekar.splice(i, 1);
      }
    }
    saveKortlekar();
    printKortlekar!(kortlekar);
  }
}

export function spelaKortleken(kortlek: Kortlek) {
  resetKortHTML();
  tempKortlek = kortlek;
  tempKortlek.aterStallKort();
  poang = 0;
  aktuelltKort = kortlek.slumpaKort();
  NASTA_KNAPP!.style.display = "none";
  RATT_FEL_KNAPPAR!.style.display = "none";
  VISA_KORT_KNAPP!.style.display = "block";

  sprakEttText!.innerHTML = `Språk ett: <br/> ${aktuelltKort.sprakEttOrd}`;
}

VISA_KORT_KNAPP?.addEventListener("click", () => {
  sprakTvaText!.innerHTML = `Språk två: <br/> ${aktuelltKort.sprakTvaOrd}`;
  VISA_KORT_KNAPP!.style.display = "none";
  RATT_FEL_KNAPPAR!.style.display = "block";

  aktuelltKort.harSpelats = true;
});
RATT_KNAPP?.addEventListener("click", () => {
  if (tempKortlek.slumpaKort() != false) {
    aktuelltKort = tempKortlek.slumpaKort();
    poang++;
    RATT_FEL_KNAPPAR!.style.display = "none";
    VISA_KORT_KNAPP!.style.display = "block";
    resetKortHTML();
    sprakEttText!.innerHTML = `Språk ett: <br/> ${aktuelltKort.sprakEttOrd}`;
  } else {
    poang++;
    RATT_FEL_KNAPPAR!.style.display = "none";
    VISA_KORT_KNAPP!.style.display = "none";
    resetKortHTML();
    sprakEttText!.innerHTML = `Kortleken slut <br> Du hade: ${poang} av ${
      tempKortlek.kortArray!.length
    } rätt`;

    tempKortlek.aterStallKort();
  }
});
FEL_KNAPP?.addEventListener("click", () => {
  if (tempKortlek.slumpaKort() != false) {
    aktuelltKort = tempKortlek.slumpaKort();
    RATT_FEL_KNAPPAR!.style.display = "none";
    VISA_KORT_KNAPP!.style.display = "block";

    resetKortHTML();
    sprakEttText!.innerHTML = `Språk ett: <br/> ${aktuelltKort.sprakEttOrd}`;
  } else {
    RATT_FEL_KNAPPAR!.style.display = "none";
    VISA_KORT_KNAPP!.style.display = "none";
    resetKortHTML();
    sprakEttText!.innerHTML = `Kortleken slut <br> Du hade: ${poang} av ${
      tempKortlek.kortArray!.length
    } rätt`;

    tempKortlek.aterStallKort();
  }
});
