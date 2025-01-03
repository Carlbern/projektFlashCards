export class Kortlek {
    constructor(namn, sprak, kort) {
        this.namn = namn;
        this.sprak = sprak;
        this.kort = kort;
    }
    printList() {
        var _a;
        (_a = this.kort) === null || _a === void 0 ? void 0 : _a.forEach((element) => {
            console.log(element.sprakEttOrd);
        });
    }
}
