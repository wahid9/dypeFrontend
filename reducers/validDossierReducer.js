export default function(validDossier=false, action){
    if(action.type==='submitDossier'){
        validDossier=true;
        return validDossier
    } else {
        return validDossier
    }
}