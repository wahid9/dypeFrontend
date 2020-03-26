export default function(validDossier=false, action){
    if(action.type==='submitDossier'){
        validDossier=true;
        return validDossier
    } else if(action.type==='onSignIn') {
        console.log('action :', action);
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