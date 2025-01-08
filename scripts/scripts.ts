import { Kort } from "./kort.class.js";
import { Kortlek } from "./kortlek.class.js";

let kortlekar: any = [];
let startSidaBtn = document.getElementById("startSidaBtn");
let laggTillSidaBtn = document.getElementById("laggTillSidaBtn");
let inputs: any = document.querySelectorAll("input[type='text']");
let laggTillBtn: any = document.querySelectorAll("input[class='laggTillBtn'");
let avslutaBtn = document.getElementById("avslutaBtn");
let footStartSidaBtn = document.querySelectorAll("a")[0];
let footLaggTillSidaBtn = document.querySelectorAll("a")[1];

//ARRAY FÖR TESTING
let kortLista = [
  new Kort("hej", "bonjour"),
  new Kort("tack", "merci"),
  new Kort("välkommen", "bienvenue"),
  new Kort("tv", "télé"),
  new Kort("glas", "verre"),
  new Kort("grön", "vert"),
];
//Initierar en kortlek att starta med
kortlekar!.push(new Kortlek("Franska Ord1", "Franska", kortLista));
kortlekar!.push(new Kortlek("Franska Ord1", "Franska", kortLista));
kortlekar!.push(new Kortlek("Franska Ord1", "Franska", kortLista));
kortlekar!.push(new Kortlek("Franska Ord1", "Franska", kortLista));
kortlekar!.push(new Kortlek("Franska Ord1", "Franska", kortLista));
kortlekar!.push(new Kortlek("Franska Ord1", "Franska", kortLista));
kortlekar!.push(new Kortlek("Franska Ord1", "Franska", kortLista));
kortlekar!.push(new Kortlek("Franska Ord1", "Franska", kortLista));
kortlekar!.push(new Kortlek("Franska Ord1", "Franska", kortLista));
printKortlekar(kortlekar);

//EVENT LISTENERS
startSidaBtn?.addEventListener("click", () => {
  bytTillStartSida();
});
laggTillSidaBtn!.addEventListener("click", () => {
  bytTillLaggTillSida();
});
footStartSidaBtn?.addEventListener("click", () => {
  bytTillStartSida();
});
footLaggTillSidaBtn!.addEventListener("click", () => {
  bytTillLaggTillSida();
});

//FUNKTIONER
function aktiveraKnapparLaggTill() {
  let tempNamn: String;
  let tempSprak: String;
  let tempKortLista: any = [];
  //knapp "lägg till kortlek"
  laggTillBtn[0].addEventListener("click", () => {
    if (kortlekar.length < 9) {
      tempNamn = inputs[0].value;
      tempSprak = inputs[1].value;

      document.getElementById("kortlekVal")!.style.display = "none";
      document.getElementById("kortVal")!.style.display = "flex";
    } else {
      document.getElementById("errorText")!.innerHTML =
        "Du har för många kortlekar <br> ta bort en innan du skapar fler";
    }
  });
  //knapp "lägg till kort"
  laggTillBtn[1].addEventListener("click", () => {
    tempKortLista.push(new Kort(inputs[2].value, inputs[3].value));
    document.getElementById(
      "lagtTillText"
    )!.textContent = `${inputs[2].value} kortet har lagts till`;
  });
  //knapp "avsluta"
  avslutaBtn?.addEventListener("click", () => {
    kortlekar.push(new Kortlek(tempNamn, tempSprak, tempKortLista));
    document.getElementById("kortlekVal")!.style.display = "flex";
    document.getElementById("kortVal")!.style.display = "none";
  });
}
//Tar in en array som innerhåller element av typen "Kortlekar"
//Skapar sedan div-element av varje "kortlek" som syns på hemsidan
export function printKortlekar(kortlekar: any[]) {
  document.getElementById("kortlekar")!.innerHTML = "";
  kortlekar.forEach((element: Kortlek) => {
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
    const BUTTON_SPELA = document.createElement("button");
    BUTTON_SPELA.className = "kortleksbtn";
    BUTTON_SPELA.textContent = "Klicka för att spela med denna kortlek";
    BUTTON_SPELA.addEventListener("click", () => spelaKortleken(element));

    const BUTTON_TABORT = document.createElement("button");
    BUTTON_TABORT.className = "kortleksbtnTaBort";
    BUTTON_TABORT.textContent = "Ta bort denna kortlek";
    BUTTON_TABORT.addEventListener("click", () =>
      element.taBortKortlek(kortlekar)
    );

    //Lägger till "barnen" i huvudcontainern
    CONTAINER.appendChild(SPRAK);
    CONTAINER.appendChild(NAMN);
    CONTAINER.appendChild(BUTTON_SPELA);
    CONTAINER.appendChild(BUTTON_TABORT);

    //Lägger till allt inom "kortlekar" div på DOM
    document.getElementById("kortlekar")!.appendChild(CONTAINER);
  });
}
function spelaKortleken(kortlek: Kortlek) {
  resetKortHTML();
  let poang = 0;
  let aktuelltKort = kortlek.slumpaKort();
  let sprakEttText = document.getElementById("sprakEttText");
  let sprakTvaText = document.getElementById("sprakTvaText");
  const NASTA_KNAPP = document.getElementById("nastaKortBtn");
  const RATT_FEL_KNAPPAR = document.getElementById("spelBtns");
  const RATT_KNAPP = document.getElementById("rattKortBtn");
  const FEL_KNAPP = document.getElementById("felKortBtn");
  const VISA_KORT_KNAPP = document.getElementById("visaKortBtn");

  NASTA_KNAPP!.style.display = "none";
  RATT_FEL_KNAPPAR!.style.display = "none";
  VISA_KORT_KNAPP!.style.display = "block";

  sprakEttText!.innerHTML = `Språk ett: <br/> ${aktuelltKort.sprakEttOrd}`;

  //Steg 1 - Man klickar för att se rätt svar
  VISA_KORT_KNAPP!.addEventListener("click", () => {
    sprakTvaText!.innerHTML = `Språk två: <br/> ${aktuelltKort.sprakTvaOrd}`;

    VISA_KORT_KNAPP!.style.display = "none";
    RATT_FEL_KNAPPAR!.style.display = "block";

    aktuelltKort.harSpelats = true;
  });
  //Knappar byts ut mot två nya
  //Steg 2 - Man väljer om svaret man hade var rätt eller fel
  RATT_KNAPP?.addEventListener("click", () => {
    if (kortlek.slumpaKort() != false) {
      poang++;
      console.log(poang);
      RATT_FEL_KNAPPAR!.style.display = "none";
      VISA_KORT_KNAPP!.style.display = "block";
      aktuelltKort = kortlek.slumpaKort();
      resetKortHTML();
      sprakEttText!.innerHTML = `Språk ett: <br/> ${aktuelltKort.sprakEttOrd}`;
    } else {
      poang++;
      RATT_FEL_KNAPPAR!.style.display = "none";
      VISA_KORT_KNAPP!.style.display = "none";
      resetKortHTML();
      sprakEttText!.innerHTML = `Kortleken slut <br> Du hade: ${poang} av ${
        kortlek.kortArray!.length
      } rätt`;
      kortlek.aterStallKort();
    }
  });
  FEL_KNAPP?.addEventListener("click", () => {
    if (kortlek.slumpaKort() != false) {
      RATT_FEL_KNAPPAR!.style.display = "none";
      VISA_KORT_KNAPP!.style.display = "block";
      aktuelltKort = kortlek.slumpaKort();
      resetKortHTML();
      sprakEttText!.innerHTML = `Språk ett: <br/> ${aktuelltKort.sprakEttOrd}`;
    } else {
      RATT_FEL_KNAPPAR!.style.display = "none";
      VISA_KORT_KNAPP!.style.display = "none";
      resetKortHTML();
      sprakEttText!.innerHTML = `Kortleken slut <br> Du hade: ${poang} av ${
        kortlek.kortArray!.length
      } rätt`;
      kortlek.aterStallKort();
    }
  });
}
function resetKortHTML() {
  document.getElementById("sprakEttText")!.innerHTML = "";
  document.getElementById("sprakTvaText")!.innerHTML = "";
}
function bytTillStartSida() {
  printKortlekar(kortlekar);
  resetKortHTML();
  document.getElementById("spel")!.style.display = "block";
  document.querySelector("aside")!.style.display = "block";
  document.getElementById("laggTillKortlek")!.style.display = "none";
}
function bytTillLaggTillSida() {
  aktiveraKnapparLaggTill();
  document.getElementById("spel")!.style.display = "none";
  document.querySelector("aside")!.style.display = "none";
  document.getElementById("laggTillKortlek")!.style.display = "flex";
}
