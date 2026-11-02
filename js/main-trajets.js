
import { initialiser } from "./store.js";
import { creerCarte, afficherStatistiques , afficherPassagerst } from "./render.Js";
const recherche = document.querySelector("#recherche");
const status = document.querySelector("#status");
const pagination =document.querySelector("#pagination");

async function afficherTrajets() {
    const trajets = await initialiser();
    const texte = recherche.value.toLowerCase();
    const resultatR = trajets.filter(function (trajet) {
        return trajet.departure.toLowerCase().includes(texte) || trajet.destination.toLowerCase().includes(texte);
    });
    const resultatS = resultatR.filter(function (trajet) {
        const placesLibre = trajet.capacity - trajet.reservations.length;
        if (status.value == "complet") {
            return placesLibre == 0;
        } else if (status.value == "dispo") {
            return placesLibre > 0;
        } else {
            return true;
        }
    });
    afficherStatistiques(trajets);
    afficherPassagerst(trajets);
    const liste = document.querySelector("#listeTrajets");
    liste.innerHTML = "";
    for (let i = 0; i < resultatS.length; i++) {
        liste.innerHTML += creerCarte(resultatS[i]);
    }
} afficherTrajets();


