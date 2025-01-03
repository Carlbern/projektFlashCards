import { Kort } from "./kort.class";

export {};

export class Kortlek {
  namn: String;
  sprak: String;
  kort?: any[];

  constructor(namn: string, sprak: string, kort?: any[]) {
    this.namn = namn;
    this.sprak = sprak;
    this.kort = kort;
  }

  printList() {
    this.kort?.forEach((element) => {
      console.log(element.sprakEttOrd);
    });
  }
}
