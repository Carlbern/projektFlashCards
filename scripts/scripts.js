import { Kort } from "./kort.class.js";
import { Kortlek } from "./kortlek.class.js";
let div = document.querySelector("div");
let kortlekar = [];
let kortLista = [
    new Kort("hej", "bonjour"),
    new Kort("tack", "merci"),
    new Kort("välkommen", "bienvenue"),
    new Kort("tv", "télé"),
    new Kort("glas", "verre"),
    new Kort("grön", "vert"),
];
let kortLista2 = [
    new Kort("Hola", "bonjour"),
    new Kort("Gracias", "merci"),
    new Kort("Buenvenido", "bienvenue"),
    new Kort("tv", "télé"),
    new Kort("glas", "verre"),
    new Kort("grön", "vert"),
];
kortlekar.push(new Kortlek("Franska Ord", "Franska", kortLista));
kortlekar.push(new Kortlek("Spanska Ord", "Spanska", kortLista2));
kortlekar.forEach((element) => {
    document.getElementById("kortlekar").innerHTML += `<div class="kortlek">
        <div class="kortleksprak"><p>${element.sprak}</p></div>
        <div class="kortleknamn"><p>${element.namn}</p></div>
        <button class="kortleksbtn" onclick="spelaKortleken(${element.namn})">Klicka för att spela med denna kortlek</button>
      </div>`;
});
function spelaKortleken(kortlekNamn) {
    kortlekar.forEach((element) => {
        if (kortlekNamn === element.namn) {
            element.spelaKortlek();
        }
    });
}
kortlekar[0].spelaKortlek();
