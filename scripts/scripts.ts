import { Kort } from "./kort.class.js";
import { Kortlek } from "./kortlek.class.js";

let kortlekar: any = [];
let startSidaBtn = document.getElementById("startSidaBtn");
let laggTillSidaBtn = document.getElementById("laggTillSidaBtn");
let inputs: any = document.querySelectorAll("input[type='text']");
let laggTillBtn: any = document.querySelectorAll("input[class='laggTillBtn'");
let avslutaBtn = document.getElementById("avslutaBtn");

//ARRAY FÖR TESTING
let kortLista = [
  new Kort("hej", "bonjour"),
  new Kort("tack", "merci"),
  new Kort("välkommen", "bienvenue"),
  new Kort("tv", "télé"),
  new Kort("glas", "verre"),
  new Kort("grön", "vert"),
];
kortlekar!.push(new Kortlek("Franska Ord", "Franska", kortLista));

//ON LOAD FUNKTIONER

startSidaBtn?.addEventListener("click", () => {
  bytTillStartSida();
});
laggTillSidaBtn!.addEventListener("click", () => {
  bytTillLaggTillSida();
});

let tempNamn: String;
let tempSprak: String;
let tempKortLista: any = [];

console.log(laggTillBtn);

laggTillBtn[0].addEventListener("click", () => {
  tempNamn = inputs[0].value;
  tempSprak = inputs[1].value;

  document.getElementById("kortlekVal")!.style.display = "none";
  document.getElementById("kortVal")!.style.display = "flex";
});
laggTillBtn[1].addEventListener("click", () => {
  tempKortLista.push(new Kort(inputs[2].value, inputs[3].value));
});
avslutaBtn?.addEventListener("click", () => {
  kortlekar.push(new Kortlek(tempNamn, tempSprak, tempKortLista));
  console.log("avsluta knappen");
  console.log(kortlekar);
});

//Tar in en array som innerhåller element av typen "Kortlekar"
//Skapar sedan div-element av varje "kortlek" som syns på hemsidan
function printKortlekar(kortlekar: any[]) {
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
    const BUTTON = document.createElement("button");
    BUTTON.className = "kortleksbtn";
    BUTTON.textContent = "Klicka för att spela med denna kortlek";
    BUTTON.addEventListener("click", () => spelaKortleken(element));

    //Lägger till "barnen" i huvudcontainern
    CONTAINER.appendChild(SPRAK);
    CONTAINER.appendChild(NAMN);
    CONTAINER.appendChild(BUTTON);

    //Lägger till allt inom "kortlekar" div på DOM
    document.getElementById("kortlekar")!.appendChild(CONTAINER);
    console.log("Laddar kortlekar");
    console.log(kortlekar);
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
      console.log(aktuelltKort);
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

function bytTillLaggTillSida() {
  document.getElementById("main")!.style.display = "none";
  document.querySelector("aside")!.style.display = "none";
  document.getElementById("laggTillKortlek")!.style.display = "flex";
}
function bytTillStartSida() {
  printKortlekar(kortlekar);
  document.getElementById("main")!.style.display = "block";
  document.querySelector("aside")!.style.display = "block";
  document.getElementById("laggTillKortlek")!.style.display = "none";
}
