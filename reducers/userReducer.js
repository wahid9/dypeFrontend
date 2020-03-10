
export default function(token = '',action){
    if(action.type == 'tokenExist'){
        let newToken = action.token
        console.log("jeelo",newToken);
        return newToken;
    }else{
        return token;
    }
}