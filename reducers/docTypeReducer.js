export default function(docType='', action){
    if(action.type==='saveDocType'){
        let newDocType=action.docType;
        console.log(newDocType);
        return newDocType;
    } else {
        return docType;
    }
}