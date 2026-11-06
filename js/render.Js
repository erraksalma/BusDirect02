export function creerCarte(trajet){
    const placesLibre = trajet.capacity - trajet.reservations.length;
    let statut="";
    let couleur="";
    let bg="";
    if(placesLibre==0){
        statut="Complet";
        couleur="bg-red-200 text-red-800";
        bg="bg-red-200";
    }else{
        statut="Disponible";
        couleur="bg-green-100 text-green-800";
        bg="bg-green-100";
    }
    return ` 
    <article class="rounded-lg ${bg} p-4 mt-8 text-sm font-semibold flex flex-col space-y-3">
    <h2 class="text-xl font-bold">${trajet.departure} => ${trajet.destination}</h2>
    <p>  🚌➡️ Depart : ${trajet.departureTime}</p>
    <p>  ➡️🚌 Arrivee : ${trajet.arrivalTime}</p>
    <p>  💵 Prix : ${trajet.price} MAD</p>
    <p>👥 Capacity : ${trajet.capacity} Places</p>
    <p>🟢 Places libres : ${placesLibre}</p>
    <span class="${couleur}">${statut} </span><br>
    <a href="cabine.html?id=${trajet.id}"  class="rounded-lg border border-yellow-300 bg-blue-950 text-yellow-100 p-3 m-8 ">Reserver</a>
 </article>
 `
} 
export function afficherStatistiques(trajets){
    let recetteTotale=0;
    for(let i =0; i< trajets.length; i++){
        recetteTotale  += trajets[i].reservations.length * trajets[i].price;
    }
    document.querySelector("#recetteTotale").textContent= recetteTotale+"DH";
}
export function afficherPassagerst(trajets){
    let PassTotale=0;
    for(let i =0; i< trajets.length; i++){
        PassTotale  += trajets[i].reservations.length;
    }
    document.querySelector("#PassTotale").textContent= PassTotale;
}