export class Kort {
  sprakEttOrd: String;
  sprakTvaOrd: String;
  harSpelats: Boolean;

  constructor(sprakEttOrd: String, sprakTvaOrd: String) {
    this.sprakEttOrd = sprakEttOrd;
    this.sprakTvaOrd = sprakTvaOrd;
    this.harSpelats = false;
  }
}
