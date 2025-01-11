//Importerar funktioner från filen /scripts.js
import { printKortlekar, resetKortHTML, saveKortlekar } from "./scripts.js";
//Temporära variabler. Får ändras för att hålla temporära värden där det behövs
let aktuelltKort;
let tempKortlek;
//Poängen som visas i slutet av ett spel
let poang = 0;
//DOM ELEMENT
let sprakEttText = document.getElementById("sprakEttText");
let sprakTvaText = document.getElementById("sprakTvaText");
const NASTA_KNAPP = document.getElementById("nastaKortBtn");
const RATT_FEL_KNAPPAR = document.getElementById("spelBtns");
const RATT_KNAPP = document.getElementById("rattKortBtn");
const FEL_KNAPP = document.getElementById("felKortBtn");
const VISA_KORT_KNAPP = document.getElementById("visaKortBtn");
//Klass för att skapa kortlekar
export class Kortlek {
    constructor(namn, sprak, kort) {
        this.namn = namn;
        this.sprak = sprak;
        //array som innehåller element av typen Kort
        this.kortArray = kort;
    }
    //Returnerar ett slumpmässigt ospelat object av typen "Kort"
    //När det inte längre finns kort kvar i lista returneras "false"
    slumpaKort() {
        //skapar tillfällig array som ska hålla alla ospelade kort
        let spelbaraKort = [];
        for (let i = 0; i < this.kortArray.length; i++) {
            //Om nuvarande kort i loopen inte tidigare har spelats så lägg till detta kort i array
            if (this.kortArray[i].harSpelats == false) {
                spelbaraKort.push(this.kortArray[i]);
            }
        }
        if (spelbaraKort.length > 0) {
            //slumpar fram ett tal mellan 0 och längden på alla spelbara kort
            let slumpTal = Math.floor(Math.random() * spelbaraKort.length);
            //väljer ut ett slumpmässigt kort och returnerar detta
            return spelbaraKort[slumpTal];
        }
        //Ifall det inte längre finns spelbara kort
        else {
            //Återställer temporära arrayen
            spelbaraKort = [];
            //false returneras och spelet är färdigt
            return false;
        }
    }
    //Återställer alla korten i kortleken till "ospelade" igen.
    aterStallKort() {
        this.kortArray.forEach((element) => {
            element.harSpelats = false;
        });
    }
    //Tar bort hela kortleken
    taBortKortlek(kortlekar = []) {
        //Går igenom varje kortlek i arrayen "kortlekar"
        for (let i = 0; i < kortlekar.length; i++) {
            //ifall kortleken i for-loopen matchar den kortlek som har kallat denna funktion, så tas denna bort.
            if (kortlekar[i] === this) {
                //Ber användaren konfirmera att hen verkligen vill ta bort kortlek
                if (confirm("Är du säker på att du vill ta bort denna kortleken?")) {
                    kortlekar.splice(i, 1);
                }
            }
        }
        //Sparar om localStorage
        saveKortlekar();
        //Skriver ut kortlekar på nytt
        printKortlekar(kortlekar);
    }
}
//Startar spelet med den kortlek som kallat denna funktion
export function spelaKortleken(kortlek) {
    //Förberedande kod
    resetKortHTML();
    //Temporär kortlek som kommer användas i spelet.
    tempKortlek = kortlek;
    tempKortlek.aterStallKort();
    //I säkerställande syfte återställs poäng till noll
    poang = 0;
    //Slumpar ett kort att använda sig initialt
    aktuelltKort = kortlek.slumpaKort();
    //Dom-element
    NASTA_KNAPP.style.display = "none";
    RATT_FEL_KNAPPAR.style.display = "none";
    VISA_KORT_KNAPP.style.display = "block";
    //Övre texten på första kortet visas
    sprakEttText.innerHTML = `Språk ett: <br/> ${aktuelltKort.sprakEttOrd}`;
}
//Knappen för att visa det rätta svaret på kortet
VISA_KORT_KNAPP === null || VISA_KORT_KNAPP === void 0 ? void 0 : VISA_KORT_KNAPP.addEventListener("click", () => {
    //Visar svaret på nedre delen av kortet
    sprakTvaText.innerHTML = `Språk två: <br/> ${aktuelltKort.sprakTvaOrd}`;
    //Tar bort denna knappen och visar knappar för nästa steg i spelet
    VISA_KORT_KNAPP.style.display = "none";
    RATT_FEL_KNAPPAR.style.display = "block";
    //Noterar att det nuvarande kortet har blivit använt i spelet
    aktuelltKort.harSpelats = true;
});
//Knappen ifall man hade rätt
RATT_KNAPP === null || RATT_KNAPP === void 0 ? void 0 : RATT_KNAPP.addEventListener("click", () => {
    poang++;
    //Går vidare till nästa kort och startar om från förra steget
    gaTillNastaKort();
});
FEL_KNAPP === null || FEL_KNAPP === void 0 ? void 0 : FEL_KNAPP.addEventListener("click", () => {
    //Går vidare till nästa kort och startar om från förra steget
    gaTillNastaKort();
});
//Byter ut knapparna och återgår till steget där ett kort precis har dykt upp
function gaTillNastaKort() {
    //Om det fortfarande finns spelbara kort i leken
    if (tempKortlek.slumpaKort() != false) {
        //Slumpar fram ett kort
        aktuelltKort = tempKortlek.slumpaKort();
        //Byter ut knappar för att återgå till förgående steg i spelet
        RATT_FEL_KNAPPAR.style.display = "none";
        VISA_KORT_KNAPP.style.display = "block";
        //Rensar kortet på tidigare text
        resetKortHTML();
        //skriver ut nytt ord för nytt kort
        sprakEttText.innerHTML = `Språk ett: <br/> ${aktuelltKort.sprakEttOrd}`;
    }
    //Om kortleken är slut och därmed spelet
    else {
        //Ta bort båda knapparna
        RATT_FEL_KNAPPAR.style.display = "none";
        VISA_KORT_KNAPP.style.display = "none";
        resetKortHTML();
        //Skriver ut meddelande som visar på hur många rätt man hade i spelet
        sprakEttText.innerHTML = `Kortleken slut <br> Du hade: ${poang} av ${tempKortlek.kortArray.length} rätt`;
    }
}
