import { initialiser } from "./store.js";
import { vip, prixSiege }    from "./reservations.js"; 
import { validerRES } from "./validators.js";

 const parametres=new URLSearchParams(location.search);
 const id = Number(parametres.get("id"));

 const seats= document.querySelector("#seats");
 const departure=document.querySelector("#departure");
 const destination=document.querySelector("#destination");
 const price=document.querySelector("#price");
 const departureTime=document.querySelector("#departureTime");
const arrivalTime=document.querySelector("#arrivalTime");
const entrernom = document.querySelector("#reserve-name");
const entrertelephone = document.querySelector("#reserve-phone");
const selectionSiege = document.querySelector("#reserve-seat");

const formres = document.querySelector("#reservation-form");

const erreurNom = document.querySelector("#error-name");
const erreurTel = document.querySelector("#error-phone");
const msg = document.createElement("p");
msg.className="text-green-700 font-bold mt-2";
formres.after(msg);
let trajets=[];
let trajet= null;

const total=document.querySelector("#total");
const libres=document.querySelector("#libres");
const recette=document.querySelector("#recette");

const selectModifier= document.querySelector("#edit-passagerexict");
const editName= document.querySelector("#edit-name");
const editSeat= document.querySelector("#edit-seat");
const editPhone = document.querySelector("#edit-phone");
const formModifier= document.querySelector("#modification-form");
const msgModifier = document.createElement("p");
msgModifier.className = "text-green-700 font-bold mt-2";
formModifier.after(msgModifier);
const selectSupprimer= document.querySelector("#select-passagerexist");
const formSupprimer= document.querySelector("#supresion-form");
const msgSupprimer=document.createElement("p");
msgSupprimer.className="text-green-700 font-bold mt-2";
formSupprimer.after(msgSupprimer);




async function afficherCabine() {
    try{
         trajets = await initialiser();
         trajet= trajets.find(function(t){
            return t.id==id;
        });
   if(!trajet){
    document.querySelector("main").innerHTML="<p class='text-red-500 font-bold text-xl'>Trajet introuvable</p>"
   return;
}

trajet.reservations = trajet.reservations || [];
trajet.waitingList=trajet.waitingList || [];
const reservations = trajet.reservations;
// console.log("Réservations affichées :", reservations);
remplirrselect();
remplirPassagers();
departure.textContent=trajet.departure;
destination.textContent=trajet.destination;
price.textContent=trajet.price+  "DH";
departureTime.textContent=trajet.departureTime;
arrivalTime.textContent=trajet.arrivalTime;


const placesLibres = trajet.capacity-reservations.length;
total.textContent=trajet.capacity;
libres.textContent=placesLibres;

const recetteTotale=reservations.reduce(function(somme,reservation){
    return somme+ prixSiege(trajet.price,reservation.seat)
},0);
recette.textContent=recetteTotale;

seats.innerHTML="";
for(let i= 1;i<=trajet.capacity;i++){
    const occupe=reservations.some(function(r){
        return r.seat==i;
    });
    if (i == 5) {
    // console.log("Siège 5 occupé ?", occupe);
}
    const reservation = reservations.find(function(r){
        return r.seat==i;
    });

 const carte=document.createElement("div");
 carte.dataset.seat=i;
 carte.className="rounded-lg flex h-16 flex-col items-center justify-between p-2";

 const numero = document.createElement("span");
 numero.textContent=i;
 numero.className="text-lg font-extrabold text-blue-950";
 const text=document.createElement("span");
 text.className="text-xs";


 if(occupe){
    carte.classList.add("bg-red-200");
    if(vip(i)){
        text.textContent="VIP-"+reservation.name;
    }else{
        text.textContent=reservation.name;
    }
    text.classList.add("text-red-800");
 }else if(vip(i)){
    carte.classList.add("bg-yellow-300");
    text.textContent="VIP - Libre";
    text.classList.add("text-blue-950");
 }else{
     carte.classList.add("bg-yellow-50");
    text.textContent="Libre";
    text.classList.add("text-slate-500");
 }
carte.appendChild(numero);
carte.appendChild(text);

seats.appendChild(carte);

} 

    } catch(erreur){
        console.error("erreur :" , erreur);
    }
}
function remplirrselect(){
selectionSiege.innerHTML = '<option value="">choix automatique</option>';

for(let i=1;i<=trajet.capacity;i++){
    const occupe = trajet.reservations.some(function(r){
        return r.seat==i;
    });

    if(!occupe){
        const option=document.createElement("option");
        option.value=i;
        option.textContent="siege" + i+(vip(i)? "-VIP" : "_");
        selectionSiege.appendChild(option);
    }
}


}
function remplirPassagers() {
    selectModifier.innerHTML = '<option value="">Choisir passager</option>';
    selectSupprimer.innerHTML = '<option value="">Choisir passager</option>';

    trajet.reservations.forEach(function(r) {
        const optionModifier = document.createElement("option");
        optionModifier.value = r.seat;
        optionModifier.textContent = r.name + " - siège " + r.seat;
        selectModifier.appendChild(optionModifier);

        const optionSupprimer = document.createElement("option");
        optionSupprimer.value = r.seat;
        optionSupprimer.textContent = r.name + " - siège " + r.seat;
        selectSupprimer.appendChild(optionSupprimer);
    });
}

selectModifier.addEventListener("change", function() {
    const siege = Number(selectModifier.value);

    const reservation = trajet.reservations.find(function(r) {
        return r.seat == siege;
    });

    if (reservation) {
        editName.value = reservation.name;
        editPhone.value = reservation.phone;
        editSeat.value = "";
         remplirSiegesModification(reservation.seat);
    } else {
        editName.value = "";
        editPhone.value = "";
    }
});
function remplirSiegesModification(siegeActuel) {
    editSeat.innerHTML='<option value="">garder meme siege</option>';
    for(let i=1; i<=trajet.capacity;i++){
        const occupe= trajet.reservations.some(function(r){
return r.seat==i && r.seat !=siegeActuel;
    });
    if(!occupe && i!=siegeActuel){
         const option = document.createElement("option");
            option.value = i;
            option.textContent = "Siège " + i + (vip(i) ? " - VIP" : "");
            editSeat.appendChild(option);
    }
}}





async function reserver() {
    const nom = entrernom.value.trim();
    const telephone=entrertelephone.value.trim();

    const erreurs= validerRES(nom,telephone,trajet);
    erreurNom.textContent=erreurs.erreurNom;
    erreurTel.textContent=erreurs.erreurTele;
    
    if(erreurs.erreurNom!=""|| erreurs.erreurTele!=""){
        return;
    }
    let siege= Number(selectionSiege.value);
    if(siege==0){
        for(let i=5;i<=trajet.capacity;i++){
            const occupe = trajet.reservations.some(function(r){
                return r.seat==i;
            });
            if(!occupe){
                siege=i;
                break;
            }

        }
    } if(siege==0){
        msg.textContent="aucun sierge n'est dispo";
        return;
    }
    const nouvelleRES={
        seat:siege,
        name:nom,
        phone:telephone
    };
    console.log("Siège réservé :", nouvelleRES.seat);
    trajet.reservations=[...trajet.reservations,nouvelleRES];
    // console.log("Réservations après ajout :", trajet.reservations);

    localStorage.setItem("trips",JSON.stringify(trajets));
    console.log("Données sauvegardées :", JSON.parse(localStorage.getItem("trips")));
    entrernom.value = "";
    entrertelephone.value = "";
    selectionSiege.value = "";

    erreurNom.textContent = "";
    erreurTel.textContent = "";

    await afficherCabine();


    console.log("Cabine actualisée !");

    msg.textContent = "Réservation confirmée !";

    setTimeout(function() {
        msg.textContent = "";
    }, 3000);
    }
    
    
    formres.addEventListener("submit", function(e){
    e.preventDefault();
    reserver();
})
formModifier.addEventListener("submit", async function(e) {
    e.preventDefault();

    const ancienSiege = Number(selectModifier.value);

    if (ancienSiege == 0) {
msgModifier.textContent = "Choisis un passager.";        return;
    }

    const nom = editName.value.trim();
    const telephone = editPhone.value.trim();

    let nouveauSiege = Number(editSeat.value);

    if (nouveauSiege == 0) {
        nouveauSiege = ancienSiege;
    }

    const erreurs = validerRES(nom, telephone, trajet, ancienSiege);

    if (erreurs.erreurNom != "" || erreurs.erreurTele != "") {
msgModifier.textContent = erreurs.erreurNom || erreurs.erreurTele;        return;
    }

    const siegeOccupe = trajet.reservations.some(function(r) {
        return r.seat == nouveauSiege && r.seat != ancienSiege;
    });

   if (siegeOccupe) {
    msgModifier.textContent = "Ce siège est déjà occupé.";
    return;
}

    trajet.reservations = trajet.reservations.map(function(r) {
        if (r.seat == ancienSiege) {
            return { ...r, name: nom, phone: telephone, seat: nouveauSiege };
        }
        return r;
    });

    localStorage.setItem("trips", JSON.stringify(trajets));

   await afficherCabine();

selectModifier.value = "";
editName.value = "";
editPhone.value = "";
editSeat.value = "";

msgModifier.textContent = "Réservation modifiée avec succès !";
setTimeout(function() {
    msgModifier.textContent = "";
}, 3000);
});
formSupprimer.addEventListener("submit",async function(e) {
    e.preventDefault();
    const siege=Number(selectSupprimer.value);
    if(siege==0){
        msgSupprimer.textContent="choisi un passaer";
        return;
    }
    trajet.reservations= trajet.reservations.filter(function(reservation){
        return reservation.seat!=siege;
    });
    localStorage.setItem("trips",JSON.stringify(trajets));

    await afficherCabine();
     msgSupprimer.textContent = "Réservation supprimée avec succès !";
     setTimeout(function() {
        msgSupprimer.textContent = "";
    }, 3000);
    
     selectSupprimer.value = "";
});
afficherCabine();
