import { initialiser } from "./store.js";
import { creerCarte, afficherStatistiques , afficherPassagerst } from "./render.Js";
const recherche = document.querySelector("#recherche");
const status = document.querySelector("#status");
const pagination =document.querySelector("#pagination");
let pageActuel =1;
let trajetparP=6;

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
    

    let debut=(pageActuel-1)* trajetparP;
    let fin = debut+trajetparP;
    const liste = document.querySelector("#listeTrajets");
    liste.innerHTML = "";
    for (let i = debut; i <fin && i<resultatS.length; i++) {
        liste.innerHTML += creerCarte(resultatS[i]);
    }

afficherPag(resultatS.length);
} afficherTrajets();

    function afficherPag(totalT)
{
    pagination.innerHTML="";
    let totalP= Math.ceil(totalT/trajetparP);
    for(let i=1;i<= totalP;i++){
        pagination.innerHTML+= `
        <button data-page="${i}" class="bg-blue-950 text-white p-4  rounded">${i}</button>`;
    }
}

pagination.addEventListener("click", function(e){
    let num=e.target.dataset.page;
    if(num){
        pageActuel= Number(num);
        afficherTrajets();
    }
});

recherche.addEventListener("input", function(){
    pageActuel=1;
    afficherTrajets();
});
status.addEventListener("change", function(){
    pageActuel= 1;
    afficherTrajets();
});


