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

  printList() {}

  addCard(sprakEttOrd: String, sprakTvaOrd: String) {
    let tempKort = new Kort(sprakEttOrd, sprakTvaOrd);
    this.kortArray?.push(tempKort);
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
      return false;
    }
  }
  aterStallKort() {
    this.kortArray!.forEach((element) => {
      element.harSpelats = false;
    });
  }
}

//Tar in en array som innerhåller element av typen "Kortlekar"
//Skapar sedan div-element av varje "kortlek" som syns på hemsidan
export function printKortlekar(kortlekar: any[]) {
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
