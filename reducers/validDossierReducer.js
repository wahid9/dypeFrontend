export default function(validDossier=false, action){
    if(action.type==='submitDossier'){
        validDossier=true;
        return validDossier
    } else if(action.type==='onSignIn') {
        if(action.value){
            validDossier=true
        } else {
            validDossier=false;
        }
        return validDossier
    } else {
        return validDossier
    }
}