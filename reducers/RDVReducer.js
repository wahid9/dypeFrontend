export default function(RDV = [],action){
   if(action.type == "confirmerRdv"){
    var newRDV = [...RDV];
    newRDV.push({image : action.image, date : action.date});
    console.log("mon Tableau du riducers", newRDV);
    return newRDV
    }else{
        return RDV;
    }
}