//Klass för att skapa enskilda kort
export class Kort {
  sprakEttOrd: String;
  sprakTvaOrd: String;
  harSpelats: Boolean;

  constructor(sprakEttOrd: String, sprakTvaOrd: String) {
    this.sprakEttOrd = sprakEttOrd;
    this.sprakTvaOrd = sprakTvaOrd;
    //Kollar om korten redan använts i spel, för att undvika att kort spelas två gånger
    this.harSpelats = false;
  }
}
