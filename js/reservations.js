export function vip(num){
    return num>=1 && num<=4;
}
export function prixSiege(prix,num){
    if(vip(num)){
        return Math.round(prix*1.1);

    }return prix;
}