export default function(user = [], action){
    if(action.type == "SendUser"){
        var newUser = action.user;
        // newUser.push(action.user);
        console.log("mon utilisateur du reduceur ==>", newUser);
        return newUser;
    }else{
        return user;
    }
}