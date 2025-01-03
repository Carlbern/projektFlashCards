export class Kort {
  sprakEttOrd: String;
  sprakTvaOrd: String;
  hasBeenPlayed: Boolean;

  constructor(sprakEttOrd: String, sprakTvaOrd: String) {
    this.sprakEttOrd = sprakEttOrd;
    this.sprakTvaOrd = sprakTvaOrd;
    this.hasBeenPlayed = false;
  }
}
