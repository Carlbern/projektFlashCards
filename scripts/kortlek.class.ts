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
}
