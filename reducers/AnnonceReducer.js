export default function(annonce =[],action){
    console.log(action);
    if(action.type == "seeAnnonce"){
        var newAnnonce = action.annonce;
        console.log('annonce',newAnnonce)
        return newAnnonce;
    }else if (action.type == "AnnonceFav"){
        var newAnnonce = action.fav
        console.log('annonce fav',newAnnonce)
        return newAnnonce;
    }else{
        return annonce;
    }
}