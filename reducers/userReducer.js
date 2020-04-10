
export default function(token = '',action){
    if(action.type == 'tokenExist'){
        let newToken = action.token
        return newToken;
    }else{
        return token;
    }
}