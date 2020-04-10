export default function(docType='', action){
    if(action.type==='saveDocType'){
        let newDocType=action.docType;
        return newDocType;
    } else {
        return docType;
    }
}