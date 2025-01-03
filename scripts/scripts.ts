import { Kort } from "./kort.class.js";
import { Kortlek } from "./kortlek.class.js";

let kortLista: any = [
  new Kort("hej", "bonjour", false),
  new Kort("tack", "merci", false),
  new Kort("välkommen", "bienvenue", false),
  new Kort("tv", "télé", false),
  new Kort("glas", "verre", false),
  new Kort("grön", "vert", false),
];

console.log(kortLista);

let kortlek = new Kortlek("Franska Ord", "Franska", kortLista);

kortlek.printList();
