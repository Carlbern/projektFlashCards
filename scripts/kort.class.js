export class Kort {
    constructor(sprakEttOrd, sprakTvaOrd) {
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
