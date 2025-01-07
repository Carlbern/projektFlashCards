import { Kort } from "./kort.class.js";
import { Kortlek, printKortlekar } from "./kortlek.class.js";

let kortlekar = [];
let inputs: any = document.querySelectorAll("input[type='text']");
let laggTillBtn: any = document.querySelectorAll("input[class='laggTillBtn'");
let avslutaBtn = document.getElementById("avslutaBtn");

let kortLista = [
  new Kort("hej", "bonjour"),
  new Kort("tack", "merci"),
  new Kort("välkommen", "bienvenue"),
  new Kort("tv", "télé"),
  new Kort("glas", "verre"),
  new Kort("grön", "vert"),
];
kortlekar.push(new Kortlek("Franska Ord", "Franska", kortLista));

window.addEventListener("load", function () {
  //Kallas när index.html laddas
  if (window.location.pathname.endsWith("index.html")) {
    printKortlekar(kortlekar);
  }

  //Kallas när lagg_till_kortlek.html laddas
  if (window.location.pathname.endsWith("lagg_till_kortlek.html")) {
    onLoadLaggTill(kortlekar);
  }
});

function onLoadLaggTill(kortlekar: any) {
  let tempNamn: String;
  let tempSprak: String;
  let tempKortLista: any = [];

  laggTillBtn[0].addEventListener("click", () => {
    tempNamn = inputs[0].value;
    tempSprak = inputs[1].value;

    document.getElementById("kortlekVal")!.style.display = "none";
    document.getElementById("kortVal")!.style.display = "flex";
  });
  laggTillBtn[1].addEventListener("click", () => {
    tempKortLista.push(new Kort(inputs[2].value, inputs[3].value));
    console.log(tempKortLista);
  });
  avslutaBtn?.addEventListener("click", () => {
    kortlekar.push(new Kortlek(tempNamn, tempSprak, tempKortLista));
    console.log(kortlekar);
  });
}

//Kanske kan tas bort
function printKortlekForm() {
  const CONTAINER = document.createElement("form");
  CONTAINER.id = "kortlekVal";

  const HEADER = document.createElement("h3");
  HEADER.textContent = "Lägg till en ny kortlek";

  const INPUT_NAMN = document.createElement("input");
  INPUT_NAMN.type = "text";
  INPUT_NAMN.placeholder = "Namn på kortlek";

  const INPUT_SPRAK = document.createElement("input");
  INPUT_SPRAK.type = "text";
  INPUT_SPRAK.placeholder = "Sprak du vill öva på";

  const BUTTON = document.createElement("input");
  BUTTON.type = "button";
  BUTTON.id = "laggTillBtn";
  BUTTON.value = "Lägg till";

  CONTAINER.appendChild(HEADER);
  CONTAINER.appendChild(INPUT_NAMN);
  CONTAINER.appendChild(INPUT_SPRAK);
  CONTAINER.appendChild(BUTTON);

  document.getElementById("laggTillKortlek")!.appendChild(CONTAINER);
}

function printKortForm() {
  const CONTAINER = document.createElement("form");
  CONTAINER.id = "kortVal";

  const HEADER = document.createElement("h3");
  HEADER.textContent = "Lägg till dina kort & avsluta när du är färdig";

  const INPUT_ORD1 = document.createElement("input");
  INPUT_ORD1.type = "text";
  INPUT_ORD1.placeholder = "Ord på modersmål";

  const INPUT_ORD2 = document.createElement("input");
  INPUT_ORD2.type = "text";
  INPUT_ORD2.placeholder = "Ord du vill öva på";

  const BUTTON_LAGGTILL = document.createElement("input");
  BUTTON_LAGGTILL.type = "button";
  BUTTON_LAGGTILL.id = "laggTillBtn";
  BUTTON_LAGGTILL.value = "Lägg till";

  const LAGTS_TILL_TEXT = document.querySelector("form p");

  const BUTTON_AVSLUTA = document.createElement("input");
  BUTTON_AVSLUTA.type = "button";
  BUTTON_AVSLUTA.id = "avslutaBtn";
  BUTTON_AVSLUTA.value = "Avsluta";

  CONTAINER.appendChild(HEADER);
  CONTAINER.appendChild(INPUT_ORD1);
  CONTAINER.appendChild(INPUT_ORD2);
  CONTAINER.appendChild(BUTTON_LAGGTILL);

  document.getElementById("laggTillKortlek")!.appendChild(CONTAINER);
}
