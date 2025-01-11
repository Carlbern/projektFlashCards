//Klass för att skapa enskilda kort
export class Kort {
    constructor(sprakEttOrd, sprakTvaOrd) {
        this.sprakEttOrd = sprakEttOrd;
        this.sprakTvaOrd = sprakTvaOrd;
        //Kollar om korten redan använts i spel, för att undvika att kort spelas två gånger
        this.harSpelats = false;
    }
}
