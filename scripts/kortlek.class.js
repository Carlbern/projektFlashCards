export class Kortlek {
    constructor(namn, sprak, kort) {
        this.namn = namn;
        this.sprak = sprak;
        this.kortArray = kort;
    }
    printList() { }
    //Lägger till ett objekt av typen "Kort" i kortleken
    addCard(kort) {
        this.kortArray.push(kort);
    }
    //Returnerar ett slumpmässigt ospelat object av typen "Kort"
    //När det inte längre finns kort kvar i lista returneras "false"
    slumpaKort() {
        let spelbaraKort = [];
        for (let i = 0; i < this.kortArray.length; i++) {
            if (this.kortArray[i].harSpelats == false) {
                spelbaraKort.push(this.kortArray[i]);
            }
        }
        if (spelbaraKort.length > 0) {
            let slumpTal = Math.floor(Math.random() * spelbaraKort.length);
            return spelbaraKort[slumpTal];
        }
        else {
            return false;
        }
    }
    aterStallKort() {
        this.kortArray.forEach((element) => {
            element.harSpelats = false;
        });
    }
}
