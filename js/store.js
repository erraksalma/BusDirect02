
export async function initialiser(){
    const donnees=localStorage.getItem("trips");
    if(donnees){
        const trajets =JSON.parse(donnees);
        return trajets;
    }
    const reponse =await fetch("../data/trips.json");
    const trajets =await reponse.json();
    localStorage.setItem("trips",JSON.stringify(trajets));
    console.log("trajets charges :", trajets);
    return trajets;
}   

