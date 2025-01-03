export {};

class Kortlek {
  namn: String;
  sprak: String;
  kort?: any[];

  constructor(namn: string, sprak: string, kort?: any[]) {
    this.namn = namn;
    this.sprak = sprak;
    this.kort = kort;
  }
}
