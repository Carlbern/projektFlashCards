import { Kort } from "./kort.class.js";
import { Kortlek, spelaKortleken } from "./kortlek.class.js";

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
kortlekar!.push(new Kortlek("Franska Ord", "Franska", kortLista));
kortlekar!.push(new Kortlek("Spanska Ord", "Spanska", kortLista));
kortlekar!.push(new Kortlek("Italienska Ord", "Italienska", kortLista));
//EVENT LISTENERS
window.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.endsWith("index.html")) {
    localStorage.clear();
    loadKortlekar();
    printKortlekar(kortlekar);
  }
});
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
  let errorText = document.getElementById("errorText");
  errorText!.innerHTML = "";
  let tempNamn: String;
  let tempSprak: String;
  let tempKortLista: any = [];
  //knapp "lägg till kortlek"
  laggTillBtn[0].addEventListener("click", () => {
    if (kortlekar.length < 9) {
      tempNamn = inputs[0].value;
      tempSprak = inputs[1].value;
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
    document.getElementById("kortlekVal")!.style.display = "flex";
    document.getElementById("kortVal")!.style.display = "none";
    bytTillStartSida();
    saveKortlekar();
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

export function resetKortHTML() {
  document.getElementById("sprakEttText")!.innerHTML = "";
  document.getElementById("sprakTvaText")!.innerHTML = "";
}
function bytTillStartSida() {
  loadKortlekar();
  printKortlekar(kortlekar);
  resetKortHTML();
  document.getElementById("spel")!.style.display = "block";
  document.querySelector("aside")!.style.display = "block";
  document.getElementById("laggTillKortlek")!.style.display = "none";
}
function bytTillLaggTillSida() {
  if (window.location.pathname.endsWith("info.html")) {
    window.location.href = "index.html";
  }
  aktiveraKnapparLaggTill();
  document.getElementById("spel")!.style.display = "none";
  document.querySelector("aside")!.style.display = "none";
  document.getElementById("laggTillKortlek")!.style.display = "flex";
}

//Källa: https://webbkurs.ei.hv.se/~pb/exempel/GJP/localstorage/
export function saveKortlekar() {
  localStorage.setItem("sparadeKortlekar", JSON.stringify(kortlekar));
}
function loadKortlekar() {
  if (localStorage.getItem("sparadeKortlekar")) {
    kortlekar = JSON.parse(
      localStorage.getItem("sparadeKortlekar")!,
      konverteraJsonTillKortlek
    );
  }
}
//Källa: https://stackoverflow.com/questions/67287257/converting-a-json-object-into-specific-type
function konverteraJsonTillKortlek(key: any, value: any) {
  if (value?.namn && value?.sprak && value?.kortArray) {
    return new Kortlek(
      value.namn,
      value.sprak,
      value.kortArray.map((kort: any) => new Kort(kort.svenska, kort.franska))
    );
  } else {
    return value;
  }
}
