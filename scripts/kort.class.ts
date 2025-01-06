export class Kort {
  sprakEttOrd: String;
  sprakTvaOrd: String;
  harSpelats: Boolean;
  stegISpel: number;

  constructor(sprakEttOrd: String, sprakTvaOrd: String) {
    this.sprakEttOrd = sprakEttOrd;
    this.sprakTvaOrd = sprakTvaOrd;
    this.harSpelats = false;
    this.stegISpel = 1;
  }

  nastaSteg() {
    this.stegISpel++;
  }
  nollaSteg() {
    this.stegISpel = 1;
  }
}
