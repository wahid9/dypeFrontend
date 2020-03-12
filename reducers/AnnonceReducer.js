export default function(annonce =[],action){
    if(action.type == "seeAnnonce"){
        var newAnnonce = action.annonce;
        return newAnnonce;
    }else if(action.type == "confirmerRdv"){
        var newImage = [{image : action.image, jour : action.jour, mois : action.month}];
        console.log("mon Tableau du riducers", newImage);
        return newImage
    }else{
        return annonce;
    }
}