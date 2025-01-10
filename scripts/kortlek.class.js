import { printKortlekar, resetKortHTML, saveKortlekar } from "./scripts.js";
let poang = 0;
let aktuelltKort;
let tempKortlek;
let sprakEttText = document.getElementById("sprakEttText");
let sprakTvaText = document.getElementById("sprakTvaText");
const NASTA_KNAPP = document.getElementById("nastaKortBtn");
const RATT_FEL_KNAPPAR = document.getElementById("spelBtns");
const RATT_KNAPP = document.getElementById("rattKortBtn");
const FEL_KNAPP = document.getElementById("felKortBtn");
const VISA_KORT_KNAPP = document.getElementById("visaKortBtn");
export class Kortlek {
    constructor(namn, sprak, kort) {
        this.namn = namn;
        this.sprak = sprak;
        this.kortArray = kort;
    }
    //Returnerar ett slumpmässigt ospelat object av typen "Kort"
    //När det inte längre finns kort kvar i lista returneras "false"
    slumpaKort() {
        let spelbaraKort = [];
        for (let i = 0; i < this.kortArray.length; i++) {
            if (this.kortArray[i].harSpelats == false) {
                spelbaraKort.push(this.kortArray[i]);
            }
        }
        if (spelbaraKort.length > 0) {
            let slumpTal = Math.floor(Math.random() * spelbaraKort.length);
            return spelbaraKort[slumpTal];
        }
        else {
            spelbaraKort = [];
            return false;
        }
    }
    aterStallKort() {
        this.kortArray.forEach((element) => {
            element.harSpelats = false;
        });
    }
    taBortKortlek(kortlekar = []) {
        for (let i = 0; i < kortlekar.length; i++) {
            if (kortlekar[i] === this) {
                kortlekar.splice(i, 1);
            }
        }
        saveKortlekar();
        printKortlekar(kortlekar);
    }
}
export function spelaKortleken(kortlek) {
    resetKortHTML();
    tempKortlek = kortlek;
    tempKortlek.aterStallKort();
    poang = 0;
    aktuelltKort = kortlek.slumpaKort();
    NASTA_KNAPP.style.display = "none";
    RATT_FEL_KNAPPAR.style.display = "none";
    VISA_KORT_KNAPP.style.display = "block";
    sprakEttText.innerHTML = `Språk ett: <br/> ${aktuelltKort.sprakEttOrd}`;
}
VISA_KORT_KNAPP === null || VISA_KORT_KNAPP === void 0 ? void 0 : VISA_KORT_KNAPP.addEventListener("click", () => {
    console.log(poang);
    sprakTvaText.innerHTML = `Språk två: <br/> ${aktuelltKort.sprakTvaOrd}`;
    VISA_KORT_KNAPP.style.display = "none";
    RATT_FEL_KNAPPAR.style.display = "block";
    aktuelltKort.harSpelats = true;
});
RATT_KNAPP === null || RATT_KNAPP === void 0 ? void 0 : RATT_KNAPP.addEventListener("click", () => {
    if (tempKortlek.slumpaKort() != false) {
        aktuelltKort = tempKortlek.slumpaKort();
        poang++;
        RATT_FEL_KNAPPAR.style.display = "none";
        VISA_KORT_KNAPP.style.display = "block";
        resetKortHTML();
        sprakEttText.innerHTML = `Språk ett: <br/> ${aktuelltKort.sprakEttOrd}`;
    }
    else {
        poang++;
        RATT_FEL_KNAPPAR.style.display = "none";
        VISA_KORT_KNAPP.style.display = "none";
        resetKortHTML();
        sprakEttText.innerHTML = `Kortleken slut <br> Du hade: ${poang} av ${tempKortlek.kortArray.length} rätt`;
        tempKortlek.aterStallKort();
    }
});
FEL_KNAPP === null || FEL_KNAPP === void 0 ? void 0 : FEL_KNAPP.addEventListener("click", () => {
    if (tempKortlek.slumpaKort() != false) {
        aktuelltKort = tempKortlek.slumpaKort();
        RATT_FEL_KNAPPAR.style.display = "none";
        VISA_KORT_KNAPP.style.display = "block";
        resetKortHTML();
        sprakEttText.innerHTML = `Språk ett: <br/> ${aktuelltKort.sprakEttOrd}`;
    }
    else {
        RATT_FEL_KNAPPAR.style.display = "none";
        VISA_KORT_KNAPP.style.display = "none";
        resetKortHTML();
        sprakEttText.innerHTML = `Kortleken slut <br> Du hade: ${poang} av ${tempKortlek.kortArray.length} rätt`;
        tempKortlek.aterStallKort();
    }
});
