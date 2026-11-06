import { initialiser } from "./store.js";
import { vip, prixSiege }    from "./reservations.js"; 
 const parametres=new URLSearchParams(location.search);
 const id = Number(parametres.get("id"));

 const seats= document.querySelector("#seats");
 const departure=document.querySelector("#departure");
 const destination=document.querySelector("#destination");
 const price=document.querySelector("#price");
 const departureTime=document.querySelector("#departureTime");
const arrivalTime=document.querySelector("#arrivalTime");


const total=document.querySelector("#total");
const libres=document.querySelector("#libres");
const recette=document.querySelector("#recette");

async function afficherCabine() {
    try{
        const trajets = await initialiser();
        const trajet= trajets.find(function(t){
            return t.id==id;
        });
   if(!trajet){
    document.querySelector("main").innerHTML="<p class='text-red-500 font-bold text-xl'>Trajet introuvable</p>"
   return;
}
const reservations = trajet.reservations || [];
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
} afficherCabine();