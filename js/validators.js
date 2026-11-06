export function validerRES(nom,telephone,trajet){
    let erreurNom="";
    let erreurTele="";

if(nom.trim()==""){
    erreurNom="le nom du passager est obligatoire";
}
else  if(trajet.reservations.some(function(reservation){
    return reservation.name.toLowerCase()== nom.trim().toLowerCase();})){
        erreurNom= "ce passager a deja une reservation";
    }
const teleValide= /^0[67]\d{8}$/;
if(!teleValide.test(telephone)){
    erreurTele="numero telephone invalide";
} else if(trajet.reservations.some(function(reservation){
    return reservation.phone==telephone;
})|| trajet.waitingList.some(function(passager){
    return passager.phone== telephone;
})


){
    erreurTele="ce numero est deja utiliser "
}return{ erreurNom:erreurNom,
    erreurTele:erreurTele
};

}
