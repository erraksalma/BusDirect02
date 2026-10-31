
export function creerCarte(trajet){
    return ` 
    <article class="rounded-lg bg-white p-4">
    <h2 class="text-xl font-bold">${trajet.departure} - ${trajet.destination}</h2>
    <p>Depart : ${trajet.departureTime}</p>
    <p>Arrivee : ${trajet.arrivalTime}</p>
    <p>Prix : ${trajet.price}DH</p>
    <p>Capacity : ${trajet.capacity} Places</p>
    <button  class="rounded-lg bg-blue-950 text-yellow-100 p-2 data-id="${trajet.id}">Reserver</button>
 </article>
 `
}