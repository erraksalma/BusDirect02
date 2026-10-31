// export const test = () => console.log("store OK");
export async function initialiser(){
    const reponse =await fetch("../data/trips.json");
    const trajets =await reponse.json();
    localStorage.setItem("trips",JSON.stringify(trajets));
    console.log("trajets charges :", trajets);
    return trajets;
}       