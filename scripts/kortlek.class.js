import { Kort } from "./kort.class.js";
export class Kortlek {
    constructor(namn, sprak, kort) {
        this.namn = namn;
        this.sprak = sprak;
        this.kortArray = kort;
    }
    printList() {
        var _a;
        (_a = this.kortArray) === null || _a === void 0 ? void 0 : _a.forEach((element) => {
            console.log(element.sprakEttOrd);
        });
    }
    addCard(sprakEttOrd, sprakTvaOrd) {
        var _a;
        let tempKort = new Kort(sprakEttOrd, sprakTvaOrd);
        (_a = this.kortArray) === null || _a === void 0 ? void 0 : _a.push(tempKort);
    }
}
