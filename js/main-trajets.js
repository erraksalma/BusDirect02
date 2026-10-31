import {initialiser} from "./store.js";
import {creerCarte}  from "./render.Js";
async function afficherTrajets() {
    const trajets = await initialiser();
    const liste = document.querySelector("#listeTrajets");
    liste.innerHTML = "";
    for( let i=0; i < trajets.length; i++){
        liste.innerHTML += creerCarte(trajets[i]);
    }
} afficherTrajets();


