export default function(annonce =[],action){
    if(action.type == "seeAnnonce"){
        var newAnnonce = action.annonce;
        return newAnnonce;
    }else{
        return annonce;
    }
}