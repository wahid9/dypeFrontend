export default function(type='', action){
    if(action.type==='saveDocType'){
        type=action.docType;
        console.log(type);
        return type;
    } else {
        return type;
    }
}