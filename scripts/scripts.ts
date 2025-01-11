//Importerar klassen "kort" från filen /kort.class.js
import { Kort } from "./kort.class.js";
//Importerar klassen "kortlek" samt funktionen "spelaKortleken" från filen /kortlek.class.js
import { Kortlek, spelaKortleken } from "./kortlek.class.js";

//Array som håller kortlekar av typen "Kortlek"
let kortlekar: any = [];

//DOM ELEMENT
let spelSidaBtn = document.getElementById("spelSidaBtn");
let laggTillSidaBtn = document.getElementById("laggTillSidaBtn");
let inputs: any = document.querySelectorAll("input[type='text']");
let avslutaBtn = document.getElementById("avslutaBtn");
let footStartSidaBtn = document.querySelectorAll("a")[0];
let footLaggTillSidaBtn = document.querySelectorAll("a")[1];
let errorText = document.getElementById("errorText");
let laggTillBtn: any = document.querySelectorAll("input[class='laggTillBtn'");

//Temporära variabler. Får ändras för att hålla temporära värden där det behövs
let tempNamn: String;
let tempSprak: String;
let tempKortLista: any = [];

//ARRAY FÖR TESTING
let kortLista = [
  new Kort("hej", "bonjour"),
  new Kort("tack", "merci"),
  new Kort("välkommen", "bienvenue"),
  new Kort("tv", "télé"),
  new Kort("glas", "verre"),
  new Kort("grön", "vert"),
];

//EVENT LISTENERS

//När index-sidan laddas körs denna kord
window.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.endsWith("index.html")) {
    loadKortlekar();
    printKortlekar(kortlekar);
  }
});
//Navigationsknapp som tar en till start/spel-sidan
spelSidaBtn?.addEventListener("click", () => {
  bytTillStartSida();
});
//Knapp som byter DOM-element till de för att lägga till kortlekar
laggTillSidaBtn!.addEventListener("click", () => {
  bytTillLaggTillSida();
});
//Footer Navigationsknapp som tar en till start/spel-sidan
footStartSidaBtn?.addEventListener("click", () => {
  bytTillStartSida();
});
//Footer knapp som byter DOM-element till de för att lägga till kortlekar
footLaggTillSidaBtn!.addEventListener("click", () => {
  bytTillLaggTillSida();
});

//KNAPPAR FÖR ATT LÄGGA TILL KORTLEK

//knapp "lägg till kortlek"
laggTillBtn[0].addEventListener("click", () => {
  if (kortlekar.length < 9) {
    tempNamn = inputs[0].value;
    tempSprak = inputs[1].value;
    inputs[0].value = "";
    inputs[1].value = "";
    if (
      tempNamn === undefined ||
      tempNamn === null ||
      tempNamn === "" ||
      tempSprak === undefined ||
      tempSprak === null ||
      tempSprak === ""
    ) {
      errorText!.innerHTML = "Du måste fylla i båda fälten";
    } else {
      document.getElementById("kortlekVal")!.style.display = "none";
      document.getElementById("kortVal")!.style.display = "flex";
    }
  } else {
    errorText!.innerHTML =
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
  console.log(tempNamn, tempSprak, tempKortLista);
  document.getElementById("kortlekVal")!.style.display = "flex";
  document.getElementById("kortVal")!.style.display = "none";
  inputs[0].value = "";
  inputs[1].value = "";
  errorText!.innerHTML = "";
  saveKortlekar();
  bytTillStartSida();
});

//FUNKTIONER

//Tar in en array som innerhåller element av typen "Kortlekar"
//Skapar sedan div-element av varje "kortlek" som sedan syns på hemsidan
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
//Återställer texten på korten i spelet
export function resetKortHTML() {
  document.getElementById("sprakEttText")!.innerHTML = "";
  document.getElementById("sprakTvaText")!.innerHTML = "";
}
//Byter ut DOM-Element för att visa "startsidan"
function bytTillStartSida() {
  loadKortlekar();
  printKortlekar(kortlekar);
  resetKortHTML();
  document.getElementById("spel")!.style.display = "block";
  document.querySelector("aside")!.style.display = "block";
  document.getElementById("laggTillKortlek")!.style.display = "none";
}
//Byter ut DOM-Element för att visa "Lägga till" Sidan
function bytTillLaggTillSida() {
  if (window.location.pathname.endsWith("info.html")) {
    window.location.href = "index.html";
  }
  document.getElementById("spel")!.style.display = "none";
  document.querySelector("aside")!.style.display = "none";
  document.getElementById("laggTillKortlek")!.style.display = "flex";
}
//Sparar array "kortlekar" till localStorage
//Källa: https://webbkurs.ei.hv.se/~pb/exempel/GJP/localstorage/
export function saveKortlekar() {
  localStorage.setItem("sparadeKortlekar", JSON.stringify(kortlekar));
}
//Fyller array "kortlekar" med det som är sparat i localStorage
function loadKortlekar() {
  if (localStorage.getItem("sparadeKortlekar")) {
    kortlekar = JSON.parse(
      localStorage.getItem("sparadeKortlekar")!,
      konverteraJsonTillKortlek
    );
  }
}

//Ser till att JSON objekten översätts till objekt av typen "Kortlek"
//Källa: https://stackoverflow.com/questions/67287257/converting-a-json-object-into-specific-type
//       https://www.w3schools.com/jsref/jsref_map.asp
function konverteraJsonTillKortlek(key: any, value: any) {
  //Kollar att objektet har samma värden som klassen "Kortlek"
  if (value.namn && value.sprak && value.kortArray) {
    //Skapar ny kortlek med värdena
    return new Kortlek(
      value.namn,
      value.sprak,
      //Går genom JSON objektets array och ser till att elementen innuti blir av typen "Kort"
      value.kortArray.map(
        (kort: Kort) => new Kort(kort.sprakEttOrd, kort.sprakTvaOrd)
      )
    );
  } else {
    return value;
  }
}
