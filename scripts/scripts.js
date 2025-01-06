import { Kort } from "./kort.class.js";
import { Kortlek, printKortlekar } from "./kortlek.class.js";
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
printKortlekar(kortlekar);
